import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';
import useAxiosMethods from '../../hooks/useAxiosMethods';
import PrescriptionInput from "../../components/Prescription";
import { Link } from "react-router-dom";

import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
    Avatar
} from "@chakra-ui/react";
import useAuth from '../../hooks/useAuth';

const PatientProfile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const { get, post } = useAxiosMethods();
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [prescription, setPrescription] = useState(null);
    const [selfassessments, setSelfAssessments] = useState([]);
    const [selfassessment, setSelfAssessment] = useState([]);
    const [medicalTest, setMedicalTest] = useState([]);
    const [personalDetails, setPersonalDetails] = useState([]);

    function InputGeneral(props) {
        return (
            <div className="mt-2 text-[18px] ">
                <div
                    className={` ${props.variant === "3" ? "hidden" : ""
                        } text-[#797878]`}
                >
                    {props.name}
                </div>
                {props.variant === "1" ? (
                    <div className="text-center bg-primary rounded-md p-1">
                        {props.data}
                    </div>
                ) : props.variant === "2" ? (
                    <div className="flex">
                        <div className="w-1/2">
                            <div>R | {props.dataR} </div>
                            <hr></hr>
                        </div>
                        <div className="w-1/2 ml-4">
                            <div>L | {props.dataL} </div>
                            <hr></hr>
                        </div>
                    </div>
                ) : props.variant === "3" ? (
                    <>
                        <div className="flex">
                            <div className="w-3/4 text-[14px] "> {props.name}</div>
                            <div className="w-1/4 flex float-right text-[#797878] text-[14px]">
                                <div
                                    className={`mr-1 ${props.data === "true" ? "bg-primary " : ""
                                        } pl-1 pr-1 rounded-lg`}
                                >
                                    {props.dataP ? props.dataR : "Yes"}
                                </div>
                                <div
                                    className={`mr-1 ${props.data === "false"
                                        ? "bg-primary "
                                        : props.dataP === "true"
                                            ? "bg-primary "
                                            : ""
                                        } pl-1 pr-1 rounded-lg`}
                                >
                                    {props.dataP ? props.dataL : "No"}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </>
                ) : (
                    <>
                        <div>{props.data}</div>
                        <hr></hr>
                    </>
                )}
            </div>
        );
    }

    useEffect(() => {
        try {
            get(`/SelfAssessments`, setSelfAssessments);
            get(`/patient/personalDetails/${parseInt(id)}`, setPersonalDetails);

        } catch (err) {
            console.error(err);
            navigate("/login", { state: { from: location }, replace: true });
        }
    }, []);

    const filteredSelfAssessments = selfassessments.filter(selfassessment => selfassessment.patient === parseInt(id)).sort((a, b) => b.id - a.id);

    useEffect(() => {
        if (filteredSelfAssessments.length > 0) {
            try {
                get(`/SelfAssessments/${filteredSelfAssessments[0].id}`, setSelfAssessment);
                get(`/MedicalAssessments/${filteredSelfAssessments[0].id}`, setMedicalTest);
            } catch (err) {
                console.error(err);
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    }, [filteredSelfAssessments]);



    const handlePrescriptionChange = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setPrescription(null);
    };

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const assessmentDate = new Date();

        const ageInMilliseconds = assessmentDate - dob;
        const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));

        return ageInYears;
    }

    const addPrescription = () => {
        if (prescription != null) {
            const formData = new FormData();
            formData.append("prescription", prescription);
            formData.append("doctor", auth.user_id);

            try {
                post(`/patient/addPrescription/${parseInt(id)}`, formData, setSelfAssessment, true);
                setPrescription(null);
                setModalOpen(false);
            } catch (err) {
                console.error(err);
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    }

    useEffect(() => {
        console.log(personalDetails);
    }, [personalDetails]);


    return (
        <GridItem colSpan={6}>
            <div className="py-1 bg-primary">
                <div className="mx-auto flex rounded-md py-1 p-5">
                    <div className="parent flex md:w-5/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
                        <div className="md:w-1/2 mt-12 mb-4">
                            <div className=" mx-auto text-center">
                                <Avatar size="xl" name={personalDetails.firstname} src={personalDetails.profile_image ? `data:image/png;base64, ${personalDetails.profile_image}` : null} bg='teal.400' />
                            </div>
                            <div className="container horizontal justify-center py-1">
                                <div className="flex justify-center text-[18px] font-semibold mb-0">
                                    {personalDetails.firstname + " " + personalDetails.lastname}
                                </div>
                            </div>
                        </div>
                        <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
                        <div className="md:w-1/2 mt-10 ml-4">
                            <div className="container vaertical justify-center py-1">
                                <div className="parent m-3 mt-1">
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Age</div>
                                        <div className="text-[14px]">{calculateAge(personalDetails.dob)}</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Date of Birth</div>
                                        <div className="text-[14px]">{personalDetails.dob}</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[14px] text-[#797878]">Gender</div>
                                        <div className="text-[14px]">{personalDetails.gender}</div>
                                        <hr className=""></hr>
                                    </div>
                                    <div className="md:w-1/2 flex mx-auto justify-center p-1 rounded-md mt-3 text-stone-800- text-[14px] font-semibold bg-primary">
                                        Message
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
                                                    <div className="text-[14px]">{medicalTest.weight ? medicalTest.weight + " Kg" : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">Height</div>
                                                    <div className="text-[14px]">{medicalTest.height ? medicalTest.height + " cm" : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">BMI</div>
                                                    <div className="text-[14px]">{medicalTest.bmi ? medicalTest.bmi : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Waist Circumference
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.waistCircumference ? medicalTest.waistCircumference : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Waist Height Ratio
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.waistHeightRatio ? medicalTest.waistHeightRatio : "No Medical Data"}</div>
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
                                                            <div className="text-[14px]">R | {medicalTest.hearingRight ? medicalTest.hearingRight : "No Medical Data"}</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                        <div className="w-1/2 ml-4">
                                                            <div className="text-[14px]">L | {medicalTest.hearingLeft ? medicalTest.hearingLeft : "No Medical Data"}</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">Vision</div>
                                                    <div className="flex">
                                                        <div className="w-1/2">
                                                            <div className="text-[14px]">R | {medicalTest.visionRight ? medicalTest.visionRight : "No Medical Data"}</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                        <div className="w-1/2 ml-4">
                                                            <div className="text-[14px]">L | {medicalTest.visionLeft ? medicalTest.visionLeft : "No Medical Data"}</div>
                                                            <hr className=""></hr>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Oral Examination
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.oralExamination ? medicalTest.oralExamination : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                                                <InputGeneral
                                                    variant="3"
                                                    name="Heart Disease"
                                                    data={selfassessment.heartDisease ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="High Blood Pressure"
                                                    data={selfassessment.highBloodPressure ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Stroke"
                                                    data={selfassessment.stroke ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Diabetes"
                                                    data={selfassessment.diabetes ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Cancer"
                                                    data={selfassessment.cancer ? "true" : "false"}
                                                />
                                            </div>
                                            <div className="md:w-1/2 parent m-3 mt-0">
                                                <InputGeneral
                                                    variant="3"
                                                    name="COPD"
                                                    data={selfassessment.copd ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Asthma"
                                                    data={selfassessment.asthma ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Kidney Disease"
                                                    data={selfassessment.kidneyDiseases ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Sudden Death"
                                                    data={selfassessment.suddenDeath ? "true" : "false"}
                                                />
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Random Blood Sugar
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.randombloodSugar ? medicalTest.randombloodSugar : "No Medical Data"} </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Fasting Blood Sugar
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.fastingbloodSugar ? medicalTest.fastingbloodSugar : "No Medical Data"} </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Serum Creatinin
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.serumCreatinin ? medicalTest.serumCreatinin : "No Medical Data"} </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TG
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.lipidTg ? medicalTest.lipidTg : "No Medical Data"} </div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TCHL
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.lipidTCHL ? medicalTest.lipidTCHL : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile TC
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.lipidTC ? medicalTest.lipidTC : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                            <div className="md:w-1/3 parent m-3 mt-1">
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile LDL
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.lipidLDL ? medicalTest.lipidLDL : "No Medical Data"}</div>
                                                    <hr className=""></hr>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="text-[14px] text-[#797878]">
                                                        Lipid Profile HDL
                                                    </div>
                                                    <div className="text-[14px]">{medicalTest.lipidHDL ? medicalTest.lipidHDL : "No Medical Data"} </div>
                                                    <hr className=""></hr>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel padding={2}>
                                        <div className="flex container horizontal justify-center py-1">
                                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                                                <InputGeneral
                                                    variant="3"
                                                    name=" Beetle Chewing"
                                                    data={selfassessment.beetleChewing ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Physical Activity &lt; 30 mins"
                                                    data={selfassessment.physicalActivity ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Tobacco Smoking"
                                                    data={selfassessment.tobaccoSmoking ? "true" : "false"}
                                                />
                                            </div>
                                            <div className="md:w-1/2 parent m-3 mt-0">
                                                <InputGeneral
                                                    variant="3"
                                                    name="Other Substances Consumption"
                                                    data={selfassessment.otherSubstance ? "true" : "false"}
                                                />
                                                <InputGeneral
                                                    variant="3"
                                                    name="Alcohol Consumption"
                                                    data={selfassessment.alcoholConsumption ? "true" : "false"}
                                                />
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
                            <div className="">
                                <Link to={`/PatientPrescriptions/${parseInt(id)}`}>
                                    <button className="h-[50px] float-right bg-secondary text-[17px] rounded-md p-2 m-2 text-[#ffffff] font-semibold ">
                                        <div className="flex">
                                            <div>Prescriptions</div>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            <div className="w-[200px]">
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
                                            {filteredSelfAssessments.map(selfassessment => (
                                                <>
                                                    <tr key={selfassessment.id} className="flex text-[15px] font-medium sticky p-1 text-left ml-5">
                                                        <div className="w-1/3 m-1">
                                                            <td>  {selfassessment.id} </td>
                                                        </div>
                                                        <div className="w-1/3 m-1">
                                                            <td> {selfassessment.date} </td>
                                                        </div>
                                                        <div className="w-1/3 m-1">
                                                            <td>
                                                                <button
                                                                    style={{ marginLeft: "10px" }}
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/view-SelfAssessment/${selfassessment.id}`
                                                                        )
                                                                    }
                                                                    className="btn w-1/3 bg-primary pl-1 pr-1 rounded-lg"
                                                                >
                                                                    View{" "}
                                                                </button>
                                                            </td>
                                                        </div>
                                                    </tr>
                                                    <hr className=" md:w-4/5 ml-5" />
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="md:w-1/4 shadow-xl h-60 m-3 mb-1 rounded-md">
                                <div className="mt-3">
                                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-[#fdc9c9] p-2 font-semibold">
                                        {filteredSelfAssessments.length > 0 ? (
                                            filteredSelfAssessments[0].risk
                                        ) : (
                                            <p>Not Submitted</p>
                                        )}
                                        <div className=" text-[#797878] text-[13px] font-medium">
                                            Recent Cardiovascular Risk
                                        </div>
                                    </div>
                                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-[#fdc9c9] p-2 font-semibold">
                                        {filteredSelfAssessments.length > 0 ? (
                                            filteredSelfAssessments[0].diabetes_risk
                                        ) : (
                                            <p>Not Submitted</p>
                                        )}
                                        <div className=" text-[#797878] text-[13px] font-medium">
                                            Recent Diabetes Risk
                                        </div>
                                    </div>
                                    <div className="w-3/4 mx-auto mt-3 rounded-md text-[15px] bg-primary p-2 font-semibold">
                                        {filteredSelfAssessments.length > 0 ? filteredSelfAssessments.length : 0}
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