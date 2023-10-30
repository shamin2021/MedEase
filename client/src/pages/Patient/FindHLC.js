import React, { useState } from "react";
import { Docs } from '../Docs'
import Table from "../TableHLC";
import { FaSearch } from "react-icons/fa";
import { GridItem } from '@chakra-ui/react';

const SearchDoc = () => {
  const [query, setQuery] = useState("");
  const keys = ["first_name", "last_name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <GridItem >


      <div class="p-4 sm:ml-64">
        <div class="p-4 rounded-lg ">
          <div className="h-screen py-1 bg-primary">
            <div className="md:w-3/4 h-7/60  mx-auto shadow-xl rounded-md pb-2 py-1 bg-white mt-10 p-5 mb-10">
              <div className="h-5/6 w-full ">

                <div class="flex w-2/4 m-1 mt-4 mb-5 font-poppins mx-auto text-2xl" style={{ width: '20rem' }}>
                  Find the nearest HLC
                </div>

                <div class="grid mb-8 rounded-lg md:mb-12 md:grid-cols-2">
                  <figure class="flex flex-col items-center justify-center text-center bg-white rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r ">
                    <blockquote class="md:w-4/5 mb-4  lg:mb-8 ">

                      <div className="flex">
                        <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                          <FaSearch className="h-[40px] mx-auto" />
                        </div>
                        <input
                          className="w-full h-[40px] text-[17px] rounded-md bg-[#f5f5f5] p-3 border-none"
                          placeholder="Search..."
                          onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                      </div>
                      <div>{<Table data={search(Docs)} />}</div>

                    </blockquote>

                  </figure>
                  <blockquote class="max-w-full text-gray-500 dark:text-gray-400">
                    <div className="md:w-full h-full ">
                      <iframe
                        title="hlcMap"
                        className="w-full h-full rounded-md"
                        src="https://www.google.com/maps/embed/v1/search?q=Healthy+Life+Clinic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                      ></iframe>
                    </div>
                  </blockquote>

                </div>

                {/* <div className="h-full flex mt-2 p-2 pl-0 ">
                  <div className="md:w-1/2 ">
                    <div className="">
                      <div className="flex">
                        <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                          <FaSearch className="h-[40px] mx-auto" />
                        </div>
                        <input
                          className="w-3/4 h-[40px] text-[17px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                          placeholder="Search..."
                          onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                      </div>
                      <div>{<Table data={search(Docs)} />}</div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-1 pl-0 pr-3">
                    <iframe
                      title="hlcMap"
                      className="md:w-full h-full rounded-md"
                      src="https://www.google.com/maps/embed/v1/search?q=Healthy+Life+Clinic&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                    ></iframe>
                  </div>
                </div> */}

              </div>
            </div>
          </div>


          {/* </div> */}
        </div>
      </div>



    </GridItem >
  );
}

export default SearchDoc