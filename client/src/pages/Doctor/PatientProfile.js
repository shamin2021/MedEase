import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import PrescriptionInput from "../../components/Prescription";

import logo from "../../assets/patient.jpg";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
} from "@chakra-ui/react";
import { FaSearch, FaPlus } from "react-icons/fa";

const PatientProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { get, post } = useAxiosMethods();
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [prescriptionAdded, setPrescriptionAdded] = useState(false);
    const [prescription, setPrescription] = useState(null);


    const handlePrescriptionChange = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setPrescriptionAdded(false);
        setPrescription(null);
    };

    const addPrescription = () => {

    }



    return (
        <GridItem colSpan={6}>
            <div className="py-1 bg-primary">
                <div className="mx-auto flex rounded-md py-1 p-5">
                    <div className="parent flex md:w-5/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
                        <div className="md:w-1/2 mt-4 mb-4">
                            <div className=" mx-auto">
                                <img
                                    htmlFor="select-image"
                                    src={logo}
                                    className="mx-auto p-1 h-[100px] w-[100px] rounded-[100px] "
                                />
                            </div>
                            <div className="container horizontal justify-center py-1">
                                <div className="flex justify-center text-[18px] font-semibold mb-0">
                                    Shamin Fernando
                                </div>
                                <div className="flex justify-center font-light text-stone-800- text-[13px] text-[#797878]">
                                    #P890725
                                </div>
                                <div className="flex mt-3 justify-center text-stone-800- text-[14px] font-semibold">
                                    Engagement
                                </div>
                                <div className="parent flex m-3">
                                    <div className="md:w-1/2 ">
                                        <div className=" mx-auto text-center">5</div>
                                        <div className=" mx-auto text-center text-[11px] text-[#797878]">
                                            Appointments
                                        </div>
                                    </div>
                                    <div className="child md:w-[1px] bg-[#bebebe]"></div>
                                    <div className="md:w-1/2 ">
                                        <div className="mx-auto text-center">6</div>
                                        <div className="mx-auto text-center text-[11px] text-[#797878]">
                                            Assessments
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3 text-stone-800- text-[14px] font-semibold bg-primary">
                                    Message
                                </div>
                            </div>
                        </div>
                        <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
                        <div className="md:w-1/2 mt-4 ml-4">
                            <div className="container horizontal justify-center py-1">
                                <div className="parent m-3 mt-1">
                                    <div className="">
                                        <div className="text-[14px] text-[#797878]">Name</div>
                                        <div className="text-[14px]">Shamin Fernando</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Age</div>
                                        <div className="text-[14px]">23</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Gender</div>
                                        <div className="text-[14px]">Female</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Allergies</div>
                                        <div className="text-[14px]">Peanuts, Prawns</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-3">
                                        <div className="text-[14px] text-[#797878]">
                                            History of Prescriptions
                                        </div>
                                        <div className="text-[14px]">ZiproFloc</div>
                                        <div className="text-[14px]">Panadol</div>
                                        <hr className=""></hr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="parent flex md:w-7/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
                        <div className=" md:w-full m-3">
                            <div className="text-[18px] font-semibold mb-0">
                                Recent Information
                            </div>
                            <Tabs
                                position="relative"
                                fontSize={15}
                            >
                                <TabList>
                                    <Tab fontSize={15} borderBottom={0} paddingLeft={0}>
                                        General
                                    </Tab>
                                    <Tab fontSize={15} borderBottom={0}>
                                        Family History
                                    </Tab>
                                    <Tab fontSize={15} borderBottom={0}>
                                        Prescriptions
                                    </Tab>
                                    <Tab fontSize={15} borderBottom={0}>
                                        Examination
                                    </Tab>
                                    <Tab fontSize={15} borderBottom={0}>
                                        Habits
                                    </Tab>
                                </TabList>
                                <TabIndicator
                                    mt="-1.5px"
                                    height="2px"
                                    bg="blue.500"
                                    borderRadius="1px"
                                    w={14}
                                />
                                <TabPanels>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">Weight</div>
                                                    <div className="text-[14px]">45 Kg</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">Height</div>
                                                    <div className="text-[14px]">153 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">BMI</div>
                                                    <div className="text-[14px]">25</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Waist Circumference
                                                    </div>
                                                    <div className="text-[14px]">23 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Waist Height Ratio
                                                    </div>
                                                    <div className="text-[14px]">1/3 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Hearing
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/2">
                                                            <div className="text-[14px]">R | 100</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                        <div className="w-1/2 ml-4">
                                                            <div className="text-[14px]">L | 100</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">Vision</div>
                                                    <div className="flex">
                                                        <div className="w-1/2">
                                                            <div className="text-[14px]">R | 100</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                        <div className="w-1/2 ml-4">
                                                            <div className="text-[14px]">L | 100</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Oral Examination
                                                    </div>
                                                    <div className="text-[14px]">Good</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Heart Disease
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            High Blood Pressure
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] "> Stroke</div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] "> Diabetes</div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] "> Cancer</div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/2 parent m-3 mt-0">
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] "> COPD</div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] "> Asthma</div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Kidney Disease
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Sudden Death
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-full parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="text-[14px]  mb-3">Prescriptions</div>

                                                    <div className="text-[#797878]">
                                                        <div className="mt-2 ">
                                                            <div className="flex mb-1">
                                                                <div className="w-3/4 text-[14px] ">
                                                                    Prescription 1
                                                                </div>
                                                                <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                                    <div className="mr-1">Dr.Saman</div>
                                                                    <div className="ml-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                        Active
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className=""></hr>
                                                        </div>
                                                        <div className="mt-2 ">
                                                            <div className="flex mb-1">
                                                                <div className="w-3/4 text-[14px] ">
                                                                    Prescription 2
                                                                </div>
                                                                <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                                    <div className="mr-1">Dr.Saman</div>
                                                                    <div className="ml-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                        Active
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className=""></hr>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Blood Sugar
                                                    </div>
                                                    <div className="text-[14px]">45 </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Serum Creatinin
                                                    </div>
                                                    <div className="text-[14px]">153 </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TG
                                                    </div>
                                                    <div className="text-[14px]">23 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TCHL
                                                    </div>
                                                    <div className="text-[14px]">1/3 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TC
                                                    </div>
                                                    <div className="text-[14px]">1/3 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile LDL
                                                    </div>
                                                    <div className="text-[14px]">1/3 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile HDL
                                                    </div>
                                                    <div className="text-[14px]">1/3 cm</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Beetle Chewing
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Physical Activity &lt; 30 mins
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Tobacco Smoking
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Other tobocco smoking
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/2 parent m-3 mt-0">
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Other Substances Consumption
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Alcohol Consumption
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex mb-1">
                                                        <div className="w-3/4 text-[14px] ">
                                                            {" "}
                                                            Unhealthy Snack Intake
                                                        </div>
                                                        <div className="w-1/4 flex float-right text-[14px] text-[#797878]">
                                                            <div className="mr-1 bg-primary pl-1 pr-1 rounded-lg">
                                                                Yes
                                                            </div>
                                                            <div className="ml-1">No</div>
                                                        </div>
                                                    </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex rounded-md pb-2 py-1 p-5 mb-9">
                    <div className="md:w-full shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-1 p-5">
                        <div className="flex">
                            <h2 className="text-left ml-5 mt-5 w-3/4">Risk Assessments </h2>
                            <div className="w-1/4">
                                <button className="h-[50px] float-right bg-secondary text-[17px] rounded-md p-2 m-2 text-[#ffffff] font-semibold " onClick={handlePrescriptionChange}>
                                    <div className="flex">
                                        <div>Add Prescription</div>
                                    </div>
                                </button>
                                <Modal isOpen={modalOpen} onClose={closeModal}>
                                    <ModalOverlay />
                                    <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]} >
                                        <ModalBody>
                                            <Box>
                                                <Box mb={2}>
                                                    <PrescriptionInput name="Add Prescription" setImage={setPrescription} image={prescription} />

                                                </Box>
                                            </Box>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                                Close
                                            </Button>
                                            <Button colorScheme="teal" onClick={addPrescription}>
                                                Add Prescription
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                        <hr className="m-3 mt-2"></hr>
                        <div className="flex">
                            <br></br>
                            <div className="md:w-3/4 shadow-xl rounded-md m-3 mb-1">
                                <div className="text-left text-sm pb-2  ml-5">
                                    Previous Assessments
                                </div>
                                <div className="w-full h-24">
                                    <div className=" flex text-[16px] text-[#797878] font-medium sticky p-1 ml-5 text-left">
                                        <div className="w-1/3 m-1 ">Assessment ID</div>
                                        <div className="w-1/3 m-1 ">Assessment Created</div>
                                        <div className="w-1/3 m-1 ">Actions</div>
                                    </div>
                                    <hr className=" md:w-4/5  ml-5" />

                                    <table className="table-auto">
                                        <tbody>
                                            <>
                                                <tr className="flex text-[15px] font-medium sticky p-1 text-left ml-5">
                                                    <div className="w-1/3 m-1">
                                                        <td> X </td>
                                                    </div>
                                                    <div className="w-1/3 m-1">
                                                        <td> X </td>
                                                    </div>
                                                    <div className="w-1/3 m-1">
                                                        <td>
                                                            <button
                                                                style={{ marginLeft: "10px" }}
                                                                // onClick={() => navigate(`/view-SelfAssessment/X`)}
                                                                className="btn w-1/3 bg-primary pl-1 pr-1 rounded-lg"
                                                            >
                                                                View{" "}
                                                            </button>
                                                        </td>
                                                    </div>
                                                </tr>
                                                <hr className=" md:w-4/5 ml-5" />
                                            </>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="md:w-1/4 shadow-xl h-60 m-3 mb-1 rounded-md">
                                <div className="mt-3">
                                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-[#fdc9c9] p-2 font-semibold">
                                        <p>Not Submitted</p>
                                        <div className=" text-[#797878] text-[13px] font-medium">
                                            Recent Risk
                                        </div>
                                    </div>
                                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-primary p-2 font-semibold">
                                        2
                                        <div className=" text-[#797878] text-[13px] font-medium">
                                            Assessments
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GridItem>
    );
}

export default PatientProfile