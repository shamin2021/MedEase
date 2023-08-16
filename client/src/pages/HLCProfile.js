import React from "react";
import logo from "../assets/HLC.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import { GridItem } from '@chakra-ui/react';

const DoctorProfile = () => {
  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className=" h-screen bg-primary py-1">
        <div className=" md:w-3/4 h-3/4 flex py-1 mx-auto bg-white m-5 mt-[7%] p-5">
          <div className="md:w-3/4 mx-auto flex rounded-2xl py-1 p-5">
            <div className="parent md:w-full h-3/4 flex shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-[10%] p-5">
              <div className="md:w-1/2 mt-4 mb-4">
                <div className=" mx-auto">
                  <img
                    htmlFor="select-image"
                    src={logo}
                    className="mx-auto p-1 h-[100px] w-[100px] rounded-[100px] "
                  />
                </div>
                <div className="container horizontal justify-center py-1">
                  <div className="flex justify-center text-[18px] font-semibold mb-0">
                    Lunawa HLC
                  </div>
                  <div className="flex justify-center font-light text-stone-800- text-[13px] text-[#797878]">
                    Lunawa Hospital
                  </div>
                  <div className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3 text-stone-800- text-[14px] font-semibold bg-primary">
                    Message
                  </div>
                </div>
              </div>
              <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
              <div className="md:w-1/2 mt-4 ml-4">
                <div className="container horizontal justify-center py-1">
                  <div className="parent mx-auto">
                    <div className="">
                      <div className="text-[14px] text-[#797878]">MOH Area</div>
                      <div className="text-[14px] font-semibold">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">PHM Area</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">PHI Area</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">GN Divison</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-9"></div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">Incharge</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">Incharge Email</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                    <div className="mt-2">
                      <div className="text-[14px] text-[#797878]">Incharge Contact Number</div>
                      <div className="text-[14px]">X</div>
                      <hr className=""></hr>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/5 mx-auto flex rounded-2xl py-1 p-5">
            <iframe
              className="md:w-full h-3/4 rounded-md mt-[17%] shadow-xl"
              src="https://www.google.com/maps/embed/v1/search?q=Healthy+Life+Clinic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default DoctorProfile;
