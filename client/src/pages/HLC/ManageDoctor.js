import React, { useState, useEffect } from "react";
import Table from "./Table";
import { FaSearch, FaPlus } from "react-icons/fa";
import { GridItem } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const ManageDoctor = () => {
  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [searchedDoctors, setSearchedDoctors] = useState([]);
  const [initializedSearch, setInitializedSearch] = useState(false);

  const search = () => {

    setSearchedDoctors(doctors.filter((item) => {
      return (
        item.firstname.toLowerCase().includes(query) ||
        item.lastname.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    }));
  };

  useEffect(() => {
    if (doctors.length > 0) {
      console.log(doctors);
      if (searchedDoctors.length === 0 && !initializedSearch) {
        setSearchedDoctors(doctors)
        setInitializedSearch(true)
      }
      console.log(searchedDoctors);
    }
  }, [doctors, searchedDoctors]);

  useEffect(() => {
    try {
      get("/doctors/getDoctors", setDoctors)

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    if (query !== "") {
      search();
      console.log(query);
    } else {
      setSearchedDoctors(doctors);
    }
  }, [query]);

  return (
    <GridItem colSpan={6}>
      <div className="h-screen py-1 bg-primary mt-[4%]">
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-2 p-5">
          <div className="ml-6 flex w-full">
            <div className="w-2/4 m-2 mt-5 ">Doctors</div>
            <div className=" w-2/4 m-2 mt-3">
              <div className="flex ">
                <div className="w-1/12 h-[50px] mr-1 rounded-md bg-[#f5f5f5]">
                  <FaSearch className="h-[40px] mx-auto" />
                </div>
                <input
                  className="w-2/4 h-[50px] text-[17px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                <Link to={"/AddDoctor"} className="w-1/4">
                  <button className=" h-[50px] bg-secondary text-[17px] rounded-md p-2 text-[#ffffff] font-semibold ">
                    <div className="flex mx-auto">
                      <FaPlus size={17} mt={1} />
                      <div className=" align-middle ml-1">
                        Add Doctor
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>{<Table data={searchedDoctors} />}</div>
        </div>
      </div>
    </GridItem>
  );
}

export default ManageDoctor