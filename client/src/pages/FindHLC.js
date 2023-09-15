import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ReactDOMServer from 'react-dom/server';
import axios from "../constants/axios";

import "../styles/Map.css";

const FindHLC = () => {

  const [query, setQuery] = useState("");
  const [mapInitialized, setMapInitialized] = useState(false);
  const [response, setResponse] = useState([]);
  const [map, setMap] = useState(null);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null)

  let infoWindowTimeout = null

  const navigate = useNavigate();
  const { auth } = useAuth();

  const search = async () => {
    try {
      // get geocordinates
      const geocodingResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=AIzaSyDDsKlSr8ztzjLoj0tYshjsvuUAlbGI_rI`
      );
      const geocodingData = await geocodingResponse.json();

      if (geocodingData.status === "OK" && geocodingData.results.length > 0) {
        const location = geocodingData.results[0].geometry.location;
        const userCoordinates = new window.google.maps.LatLng(
          location.lat,
          location.lng
        );

        // find the nearest point
        let nearestPoint = null;
        let nearestDistance = Number.MAX_VALUE;

        for (const placemark of response) {
          const placemarkCoordinates = new window.google.maps.LatLng(
            parseFloat(placemark.latitude),
            parseFloat(placemark.longitude)
          );

          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            userCoordinates,
            placemarkCoordinates
          );

          if (distance < nearestDistance) {
            nearestPoint = placemark;
            nearestDistance = distance;
          }
        }

        // show the nearest point
        if (nearestPoint) {
          console.log("Nearest Point:", nearestPoint);

          const newMarker = new window.google.maps.Marker({
            position: { lat: nearestPoint.latitude, lng: nearestPoint.longitude },
            map: map,
            title: nearestPoint.name,
          });

          const infoContent = renderInfoContentToString(nearestPoint.name);

          const infowindow = new window.google.maps.InfoWindow({
            content: infoContent,
          });

          if (currentInfoWindow) {
            currentInfoWindow.close();
          }

          // to redirect to signup
          infowindow.addListener('domready', () => {
            const signupButton = document.getElementById('signup-button');
            if (signupButton) {
              signupButton.addEventListener('click', () => {
                redirectToSignUp(nearestPoint.name);
              });
            }
          });

          infowindow.open(map, newMarker);
          setCurrentInfoWindow(infowindow)

        } else {
          console.log("No nearest point found.");
        }
      } else {
        console.error("Geocoding failed.");
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
    }
  };

  const redirectToSignUp = (name) => {
    localStorage.setItem('HLCName', name);
    navigate("/register");
  }

  // to add a btn to infowindow
  const renderInfoContentToString = (name) => {
    const shouldShowSignUpButton = auth.user_id == null;

    return ReactDOMServer.renderToString(
      <div id="info-window">
        <h3>{name}</h3>
        {shouldShowSignUpButton && (
          <button className="signup-button" id="signup-button">Sign Up</button>
        )}
      </div>
    );
  };

  const initMap = () => {

    if (!mapInitialized && response.length > 0) {
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 7.873054, lng: 80.771797 },
        zoom: 7
      });

      setMap(newMap);

      response.forEach(item => {
        const marker = new window.google.maps.Marker({
          position: { lat: item.latitude, lng: item.longitude },
          map: newMap,
          title: item.name,
        });

        // to change the object to a string
        const infoContent = renderInfoContentToString(item.name);

        const infowindow = new window.google.maps.InfoWindow({
          content: infoContent,
        });

        marker.addListener('click', () => {

          if (infoWindowTimeout) {
            clearTimeout(infoWindowTimeout);
          }

          // to redirect to signup
          infowindow.addListener('domready', () => {
            const signupButton = document.getElementById('signup-button');
            if (signupButton) {
              signupButton.addEventListener('click', () => {
                redirectToSignUp(item.name);
              });
            }
          });

          infowindow.open(newMap, marker);

          // auto close after 5 sec
          infoWindowTimeout = setTimeout(() => {
            infowindow.close();
          }, 5000);
        });
      });

      setMapInitialized(true);
    }
  }

  const fetchLocations = async () => {
    try {
      const result = await axios.get('/Home/get-map-locations');
      setResponse(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (response.length > 0) {
      initMap();
    }
  }, [response]);


  useEffect(() => {

    // to load google api script 
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDsKlSr8ztzjLoj0tYshjsvuUAlbGI_rI&libraries=geometry`;
    script.onload = () => {
      fetchLocations();
    }
    document.body.appendChild(script);

  }, [])

  return (
    <div className="h-screen py-10 bg-primary">
      <div className="md:w-3/4 h-3/4  mx-auto shadow-xl rounded-md pb-2 py-1 bg-white mt-9 p-5">
        <div className="ml-4 w-full">
          <div className="w-2/4 m-2 mt-4 font-medium">
            Find the nearest HLC
          </div>
          <div className="flex mt-2 p-2 pl-0 h-[100%]">
            <div className="w-[100%]">
              <div className="flex">
                <input
                  className="w-[100%] h-[40px] text-[15px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5] cursor-pointer" onClick={search}>
                  <FaSearch className="h-[40px] mx-auto" />
                </div>
              </div>
              <div className="mt-5 p-1 pl-0 md:h-[400px]" id="map" ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindHLC