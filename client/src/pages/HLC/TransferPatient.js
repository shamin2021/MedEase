import React, { useState, useEffect } from 'react';
import Table from "./RequestTable";
import { FaSearch } from "react-icons/fa";
import { GridItem } from '@chakra-ui/react';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from '../../hooks/useAuth';

const TransferPatient = () => {

    const { get } = useAxiosMethods();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [query, setQuery] = useState("");
    const [requests, setRequests] = useState([]);
    const [searchedRequests, setSearchedRequests] = useState([]);
    const [initializedSearch, setInitializedSearch] = useState(false);
    const [actionState, setActionState] = useState(false);

    const search = () => {
        setSearchedRequests(requests.filter((item) => {
            return (
                item.firstname.toLowerCase().includes(query) ||
                item.lastname.toLowerCase().includes(query)
            );
        }));
    };


    useEffect(() => {
        if (requests.length > 0) {
            console.log(requests);
            if (searchedRequests.length === 0 && !initializedSearch) {
                setSearchedRequests(requests)
                setInitializedSearch(true)
            }
            console.log(searchedRequests);
        }
    }, [requests, searchedRequests]);

    useEffect(() => {
        console.log(actionState);
        try {
            get(`/hlc/getRequests/${auth.user_id}`, setRequests)

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
            setSearchedRequests(requests);
        }
    }, [query]);

    return (
        <GridItem colSpan={6}>
            <div className="h-screen py-1 bg-primary mt-[4%]">
                <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5">
                    <div className="ml-6 flex w-full">
                        <div className="w-2/4 m-2 mt-4 ">Transfer Requests</div>
                        <div className=" w-2/4 m-2 mt-3">
                            <div className="flex ">
                                <div className="w-1/12 h-[40px] mr-1 rounded-md bg-[#f5f5f5]">
                                    <FaSearch className="h-[40px] mx-auto" />
                                </div>
                                <input
                                    className="w-full h-[40px] text-[18px] rounded-md bg-[#f5f5f5] p-3 mr-3 border-none"
                                    placeholder="Search..."
                                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                />
                            </div>
                        </div>
                    </div>
                    <div>{<Table data={searchedRequests} actionState={setActionState} filterRequest={setSearchedRequests} />}</div>
                </div>
            </div>
        </GridItem>
    )
}

export default TransferPatient
