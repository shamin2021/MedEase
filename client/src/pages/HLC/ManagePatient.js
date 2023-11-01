import React, { useState, useEffect } from "react";
import Table from "./PatientTable";
import { FaSearch} from "react-icons/fa";
import { GridItem } from '@chakra-ui/react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";

const ManagePatient = () => {

    const { get } = useAxiosMethods();
    const navigate = useNavigate();
    const location = useLocation();

    const [patients, setPatients] = useState([]);
    const [searchedPatients, setSearchedPatients] = useState([]);
    const [initializedSearch, setInitializedSearch] = useState(false);
    const [query, setQuery] = useState("");

    const search = () => {

        setSearchedPatients(patients.filter((item) => {
            return (
                item.firstname.toLowerCase().includes(query) ||
                item.lastname.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query)
            );
        }));
    };


    useEffect(() => {
        if (patients.length > 0) {
            console.log(patients);
            if (searchedPatients.length === 0 && !initializedSearch) {
                setSearchedPatients(patients)
                setInitializedSearch(true)
            }
            console.log(searchedPatients);
        }
    }, [patients, searchedPatients]);

    useEffect(() => {
        try {
            get("/patient/getPatientList", setPatients)

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
            setSearchedPatients(patients);
        }
    }, [query]);

    
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
                    <div>{<Table data={searchedPatients} />}</div>
                </div>
            </div>
        </GridItem>
    );
}

export default ManagePatient