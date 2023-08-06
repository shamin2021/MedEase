import React, { useState } from "react";
import { Docs } from './Docs'
import Table from "./Table";
import "../styles/Search.css";

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
      <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5">
        <div className="search-label">Search for Doctors</div>
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
         <div >
        {<Table data={search(Docs)} />}
        </div>
      </div>
    </div>
  );
}

export default SearchDoc