import React, { useState } from "react";
import { Docs } from '../Docs'
import Table from "./PatientTable";
import { FaSearch, FaPlus } from "react-icons/fa";
import { GridItem } from '@chakra-ui/react';

const ManagePatient = () => {
    const [query, setQuery] = useState("");
    const keys = ["first_name", "last_name", "email"];
    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    };
    return (
        <GridItem colSpan={6}>
            <div className="h-screen py-1 bg-primary ">
                <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-[5%] p-5">
                    <div className="ml-6 flex w-full">
                        <div className="w-2/4 m-2 mt-5 ">Patients </div>
                        <div className=" w-2/4 m-2 mt-3">
                            <div className="flex ">
                                <div className="w-1/12 h-[50px] mr-1 rounded-md bg-[#f5f5f5]">
                                    <FaSearch className="h-[40px] mx-auto" />
                                </div>
                                <input
                                    className="w-3/4 h-[50px] text-[17px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                                    placeholder="Search..."
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                />
                            </div>
                        </div>
                    </div>
                    <div>{<Table data={search(Docs)} />}</div>
                </div>
            </div>
        </GridItem>
    );
}

export default ManagePatient