import React, { useState, useEffect } from "react";
import Table from "./TableHLC";
import {
  GridItem
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const SearchHLC = () => {

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [hlc, setHlC] = useState([]);
  const [searchedHlc, setSearchedHlc] = useState([]);
  const [initializedSearch, setInitializedSearch] = useState(false);

  const search = () => {

    setSearchedHlc(hlc.filter((item) => {
      return (
        item.hlc_name.toLowerCase().includes(query) ||
        item.in_charge.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    }));
  };

  useEffect(() => {
    if (hlc.length > 0) {
      console.log(hlc);
      if (searchedHlc.length === 0 && !initializedSearch) {
        setSearchedHlc(hlc)
        setInitializedSearch(true)
      }
      console.log(searchedHlc);
    }
  }, [hlc, searchedHlc]);

  useEffect(() => {
    try {
      get("/hlc/getHLCList", setHlC)

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
      setSearchedHlc(hlc);
    }
  }, [query]);



  return (
    <GridItem colSpan={6} >
      <div className="h-screen py-1 bg-primary mt-[5%]">
        <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5">
          <div className="ml-6 flex w-full">
            <div className="w-2/4 m-2 mt-4 ">Search for HLC</div>
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
                <Link to={"/AddHLC"} className="w-1/4">
                  <button className=" h-[50px] bg-secondary text-[17px] rounded-md p-2 text-[#ffffff] font-semibold ">
                    <div className="flex mx-auto">
                      <FaPlus size={17} mt={1} />
                      <div className=" align-middle ml-1">
                        Add HLC
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div>{<Table data={searchedHlc} />}</div>
        </div>
      </div>
    </GridItem>
  );
}

export default SearchHLC