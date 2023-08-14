import React, { useState } from "react";
import { Docs } from './Docs'
import Table from "./TableHLC";
import { FaSearch } from "react-icons/fa";

const SearchDoc = () => {
    const [query, setQuery] = useState("");
    const keys = ["first_name", "last_name", "email"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query))
      );
    };
  return (
    <div className="h-screen py-1 bg-primary">
      <div className="md:w-3/4 mx-auto shadow-xl rounded-md pb-2 py-1 bg-white mt-9 p-5">
        <div className="ml-4 w-full">
          <div className="w-2/4 m-2 mt-4 font-medium font-poppins">
            Find the nearest HLC
          </div>
          <div className="flex mt-2 p-2 pl-0">
            <div className="md:w-1/2">
              <div className="">
                <div className="flex">
                  <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                    <FaSearch className="h-[40px] mx-auto" />
                  </div>
                  <input
                    className="w-3/4 h-[40px] text-[15px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                  />
                </div>
                <div>{<Table data={search(Docs)} />}</div>
              </div>
            </div>
            <div className="md:w-1/2 p-1 pl-0">
              <iframe
                title="hlcMap"
                className="md:w-full h-full rounded-md"
                src="https://www.google.com/maps/embed/v1/search?q=Healthy+Life+Clinic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDoc