// import "../../styles/Table.css";
import Doc from "../../assets/patient.jpg";
import { Link } from "react-router-dom";


import React, { useState } from 'react';
import { PhotoIcon, UserCircleIcon, PaperClipIcon } from '@heroicons/react/24/solid'
import {
    Box,
    Heading,
    Select,
    RadioGroup,
    Radio,
    Stack,
    Switch,
    Text,
    GridItem,
    Flex,
    Input,
    Button,
    Grid,
} from '@chakra-ui/react';

const Table = ({ data }) => {
    return (
        // <>

        <GridItem>

            <div class="p-4 ">
                <div class="p-4 rounded-lg mt-1 ">
                    <div class="flex items-center justify-center h-88 mb-4 rounded background-color: #DCECF8;">

                        <div className=" h-3/4 m-1 w-full">
                            <div className=" flex mt-4 text-[17px] font-medium sticky top-3 p-1 w-full">
                                <div className="w-1/5 m-1" style={{ width: '11.7rem' }}>Name</div>
                                <div className="w-1/5 m-1" style={{ width: '11.7rem' }}>Surname</div>
                                <div className="w-1/5 m-1" style={{ width: '11.7rem' }}>Email</div>
                                <div className="w-1/5 m-1" style={{ width: '8rem' }}>Gender</div>
                                <div className="w-2/5 m-1 text-center">Manage</div>
                            </div>
                            <hr className="w-7/8 mx-auto mt-1 mb-0" />
                            <div>
                                <div className=" h-96 overflow-y-scroll mb-2">
                                    {data.map((item) => (
                                        <>
                                            <Link to={`/PatientProfile/${item.id}`}>
                                                <div className=" flex mt-4 text-[15px] font-medium hover:bg-primary p-1 rounded-lg hover:"
                                                    // style={{ width: '58rem' }}
                                                >
                                                    <div className="w-1/5 m-1 flex " style={{ width: '11.7rem' }}>
                                                        <img
                                                            className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                                                            src={Doc}
                                                        />
                                                        <div className="w-3/4 ml-6">{item.first_name}</div>
                                                    </div>
                                                    <div className="w-1/5 m-1" style={{ width: '11.7rem' }}>{item.last_name}</div>
                                                    <div className="w-1/5 m-1" style={{ width: '11.7rem' }}>{item.email}</div>
                                                    <div className="w-1/5 m-1" style={{ width: '8rem' }}>{item.gender}</div>

                                                    <div className="w-2/5 m-1 text-center">
                                                        <Link to={"/AddLifestyle"}>
                                                            <button className="p-2 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white">
                                                                Lifestyle Tips
                                                            </button>
                                                        </Link>
                                                        <Link to={"/AddPrescription"}>
                                                            <button
                                                                href={"/patient"}
                                                                className="p-2 ml-3 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white"
                                                            >
                                                                Medical instruction
                                                            </button>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </Link>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>



            {/* </> */}
        </GridItem >
    );
};

export default Table;