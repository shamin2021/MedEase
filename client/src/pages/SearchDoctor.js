import React, { useState } from "react";
import { Docs } from './Docs'
import Table from "./Table";
import { GridItem } from '@chakra-ui/react'

const SearchDoc = () => {
    const [query, setQuery] = useState("");
    const keys = ["first_name", "last_name", "email"];
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query))
      );
    };
  return (
    <GridItem colSpan={6} >
      <div className="h-screen py-1 bg-primary">
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5">
          <div className="ml-6 flex w-full">
            <div className="w-1/4 m-2 mt-4 font-bold">
              Search for Doctors
            </div>
            <div className=" w-3/4 m-2 mt-3">
              <input
                className="w-3/4 h-[40px] text-[15px] rounded-3xl bg-[#f5f5f5] p-3 text-right float-right mr-3"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div>{<Table data={search(Docs)} />}</div>
        </div>
      </div>
    </GridItem>

  );
}

export default SearchDoc