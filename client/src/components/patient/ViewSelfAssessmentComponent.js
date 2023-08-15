import React, { useState, useEffect } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import logo from "../../assets/patient.jpg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  GridItem,
} from "@chakra-ui/react";

const ViewSelfAssessmentComponent = () => {

  const { id } = useParams();
  console.log(id);

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [selfassessments, setSelfAssessments] = useState([]);


  useEffect(() => {
    try {
      get(`/SelfAssessments/${id}`, setSelfAssessments);

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    console.log(selfassessments);
  }, [selfassessments]);

  function InputGeneral(props) {
    return (
      <div className="mt-2 text-[14px] ">
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
            <div className="flex mb-1">
              <div className="w-3/4 "> {props.name}</div>
              <div className="w-1/4 flex float-right text-[#797878]">
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

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - dob;
    const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));

    return ageInYears;
  }

  return (
    <GridItem colSpan={6}>
      <div>
        <div className="py-1 bg-primary">
          <div className="mx-auto flex rounded-md py-1 p-5">
            <div className="parent flex md:w-3/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
              <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
              <div className="md:w-full mt-4 ml-2">
                <div className="container horizontal justify-center py-1">
                  <div className="parent m-3 mt-1">
                    <InputGeneral name="Name" data={selfassessments.firstName + " " + selfassessments.lastName} />
                    <InputGeneral name="Date Attempted" data={selfassessments.date} />
                    <InputGeneral name="Age at Assessment" data={calculateAge(selfassessments.dob)} />
                    <InputGeneral name="Gender" data={selfassessments.gender} />
                    <InputGeneral name="Risk" data={selfassessments.risk ? selfassessments.risk : "Not Submitted"} variant="1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="parent flex md:w-7/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
              <div className=" md:w-full m-3">
                <div className="flex justify-between">
                  <div className="text-[18px] font-semibold mb-0">
                    Assessment Information
                  </div>
                  <div className="w-1/4">
                    <button
                      className="btn btn-primary text-[15px] bg-primary p-2 font-semibold"
                      onClick={() => navigate(`/AddExamination`)}
                    >
                      Add Medical Data
                    </button>
                  </div>
                </div>
                <Tabs
                  position="relative"
                  fontSize={15}
                  fontFamily={("Poppins", "sans-serif")}
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
                          <InputGeneral name="Weight" data="No Medical Data" />
                          <InputGeneral name="Height" data="No Medical Data" />
                          <InputGeneral name="BMI" data="No Medical Data" />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral
                            name="Waist Circumference"
                            data="No Medical Data"
                          />
                          <InputGeneral
                            name="Waist Height Ratio"
                            data="No Medical Data"
                          />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral
                            name="Hearing"
                            dataR="No Data"
                            dataL="No Data"
                            variant="2"
                          />
                          <InputGeneral
                            name="Vision"
                            dataR="No Data"
                            dataL="No Data"
                            variant="2"
                          />
                          <InputGeneral name="Oral Examination" data="No Medical Data" />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel padding={2}>
                      <div className="flex container horizontal justify-center py-1">
                        <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                          <InputGeneral
                            variant="3"
                            name="Heart Disease"
                            data={selfassessments.heartDisease ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="High Blood Pressure"
                            data={selfassessments.highBloodPressure ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Stroke"
                            data={selfassessments.stroke ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Diabetes"
                            data={selfassessments.diabetes ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Cancer"
                            data={selfassessments.cancer ? "true" : "false"}
                          />
                        </div>
                        <div className="md:w-1/2 parent m-3 mt-0">
                          <InputGeneral
                            variant="3"
                            name="COPD"
                            data={selfassessments.copd ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Asthma"
                            data={selfassessments.asthma ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Kidney Disease"
                            data={selfassessments.kidneyDiseases ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Sudden Death"
                            data={selfassessments.suddenDeath ? "true" : "false"}
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel padding={2}>
                      <div className="flex container horizontal justify-center py-1">
                        <div className="md:w-full parent m-3 mt-0 ml-0">
                          <div className="mt-2">
                            <div className="text-[14px]  mb-3">
                              Prescriptions
                            </div>

                            <div className="text-[#797878]">
                              <InputGeneral
                                variant="1"
                                name="Prescription by Dr.Saman"
                                data="View"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel padding={2}>
                      <div className="flex container horizontal justify-center py-1">
                        <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                          <InputGeneral name="Blood Sugar" data="No Medical Data" />
                          <InputGeneral name="Serum Creatinin" data="No Medical Data" />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral name="Lipid Profile TG" data="No Medical Data" />
                          <InputGeneral name="Lipid TCHL" data="No Medical Data" />
                          <InputGeneral name="Lipid Profile TC" data="No Medical Data" />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral name="Lipid Profile LDL" data="No Medical Data" />
                          <InputGeneral name="Lipid Profile HDL" data="No Medical Data" />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel padding={2}>
                      <div className="flex container horizontal justify-center py-1">
                        <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                          <InputGeneral
                            variant="3"
                            name=" Beetle Chewing"
                            data={selfassessments.beetleChewing ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Physical Activity &lt; 30 mins"
                            data={selfassessments.physicalActivity ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Tobacco Smoking"
                            data={selfassessments.tobaccoSmoking ? "true" : "false"}
                          />
                        </div>
                        <div className="md:w-1/2 parent m-3 mt-0">
                          <InputGeneral
                            variant="3"
                            name="Other Substances Consumption"
                            data={selfassessments.otherSubstance ? "true" : "false"}
                          />
                          <InputGeneral
                            variant="3"
                            name="Alcohol Consumption"
                            data={selfassessments.alcoholConsumption ? "true" : "false"}
                          />
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </GridItem>
  );
};

export default ViewSelfAssessmentComponent;