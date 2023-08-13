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
} from "@chakra-ui/react";
// class ViewSelfAssessmentComponent extends Component {
const ViewSelfAssessmentComponent= () => {
    
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

    function InputGeneral(props) {
      return (
        <div className="mt-2 text-[14px] ">
          <div
            className={` ${
              props.variant == "3" ? "hidden" : ""
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
                    className={`mr-1 ${
                      props.data === "true" ? "bg-primary " : ""
                    } pl-1 pr-1 rounded-lg`}
                  >
                    {props.dataP ? props.dataR : "Yes"}
                  </div>
                  <div
                    className={`mr-1 ${
                      props.data === "false"
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
        return (
          <div>
            <div className="py-1 bg-primary">
              <div className="mx-auto flex rounded-md py-1 p-5">
                <div className="parent flex md:w-3/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
                  <div className="child mt-3 mb-3 md:w-[1px] bg-[#bebebe]"></div>
                  <div className="md:w-full mt-4 ml-2">
                    <div className="container horizontal justify-center py-1">
                      <div className="parent m-3 mt-1">
                        <InputGeneral name="Name" data={"X"} />
                        <InputGeneral name="Date Attempted" data={"X"} />
                        <InputGeneral name="Age at Assessment" data={"X"} />
                        <InputGeneral name="Gender" data={"X"} />
                        <InputGeneral name="Risk" data={"X"} variant="1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="parent flex md:w-7/12 shadow-xl rounded-md pb-2 py-1 bg-white m-3 mt-9 p-5">
                  <div className=" md:w-full m-3">
                    <div className="text-[18px] font-semibold mb-0">
                      Assessment Information
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
                              <InputGeneral name="Weight" data="X" />
                              <InputGeneral name="Height" data="X" />
                              <InputGeneral name="Weight" data="X" />
                              <InputGeneral name="BMI" data="X" />
                            </div>
                            <div className="md:w-1/3 parent m-3 mt-1">
                              <InputGeneral
                                name="Waist Circumference"
                                data="X"
                              />
                              <InputGeneral
                                name="Waist Height Ratio"
                                data="X"
                              />
                            </div>
                            <div className="md:w-1/3 parent m-3 mt-1">
                              <InputGeneral
                                name="Hearing"
                                dataR="X"
                                dataL="X"
                                variant="2"
                              />
                              <InputGeneral
                                name="Vision"
                                dataR="X"
                                dataL="X"
                                variant="2"
                              />
                              <InputGeneral name="Oral Examination" data="X" />
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel padding={2}>
                          <div className="flex container horizontal justify-center py-1">
                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                              <InputGeneral
                                variant="3"
                                name="Heart Disease"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="High Blood Pressure"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Stroke"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Diabetes"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Cancer"
                                data="true"
                              />
                            </div>
                            <div className="md:w-1/2 parent m-3 mt-0">
                              <InputGeneral
                                variant="3"
                                name="COPD"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Asthma"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Kidney Disease"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Sudden Death"
                                data="true"
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
                                    variant="3"
                                    name="Prescription 1"
                                    dataR="true"
                                    dataL="true"
                                    dataP="true"
                                  />
                                  <InputGeneral
                                    variant="3"
                                    name="Prescription 2"
                                    dataR="true"
                                    dataL="true"
                                    dataP="false"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel padding={2}>
                          <div className="flex container horizontal justify-center py-1">
                            <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                              <InputGeneral name="Blood Sugar" data="X" />
                              <InputGeneral name="Serum Creatinin" data="X" />
                            </div>
                            <div className="md:w-1/3 parent m-3 mt-1">
                              <InputGeneral name="Lipid Profile TG" data="X" />
                              <InputGeneral name="Lipid TCHL" data="X" />
                              <InputGeneral name="Lipid Profile TC" data="X" />
                            </div>
                            <div className="md:w-1/3 parent m-3 mt-1">
                              <InputGeneral name="Lipid Profile LDL" data="X" />
                              <InputGeneral name="Lipid Profile HDL" data="X" />
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel padding={2}>
                          <div className="flex container horizontal justify-center py-1">
                            <div className="md:w-1/2 parent m-3 mt-0 ml-0">
                              <InputGeneral
                                variant="3"
                                name=" Beetle Chewing"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Physical Activity &lt; 30 mins"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Tobacco Smoking"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Other tobocco smoking"
                                data="true"
                              />
                            </div>
                            <div className="md:w-1/2 parent m-3 mt-0">
                              <InputGeneral
                                variant="3"
                                name="Other Substances Consumption"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Alcohol Consumption"
                                data="true"
                              />
                              <InputGeneral
                                variant="3"
                                name="Unhealthy Snack Intake"
                                data="true"
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
              <div className="card col-md-8 offset-md-2">
                <h3 className="text-center"> View SelfAssessment Details</h3>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Date Created:</label>
                    </div>
                    <div className="col-md-6">{selfassessments.date}</div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>First Name:</label>
                    </div>
                    <div className="col-md-6">{selfassessments.firstName}</div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Last Name:</label>
                    </div>
                    <div className="col-md-6">{selfassessments.lastName}</div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Email ID:</label>
                    </div>
                    <div className="col-md-6">{selfassessments.emailId}</div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Physical Activity state:</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.physicalActivity ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Smoke Tobacco: </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.tobaccoSmoking ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Chew Beetle: </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.beetlechewing ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Alcohol Consumption: </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.alcoholConsumption ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Other Substance: </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.otherSubstance ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Snack_intake: </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.snackIntake}
                    </div>
                  </div>

                  {/* diseases */}
                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        {" "}
                        Has a history in the family for Heart Disease ?
                      </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.heartDisease ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        {" "}
                        Has a history in the family for High Blood Pressure ?
                      </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.HighBloodPressure ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has a history in the family for Stroke ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.Stroke ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has a history in the family for Diabetes ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.Diabetes ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has a history in the family for Cancer ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.Cancer ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has a history in the family for COPD ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.COPD ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has a history in the family for Asthma ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.Asthma ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        {" "}
                        Has a history in the family for Kidney Diseases ?
                      </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.kidneyDiseases ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label> Has any of the family had a Sudden Death ?</label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.suddenDeath ? "yes" : "no"}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>
                        {" "}
                        Is there any other diseases family has suffered from ?
                      </label>
                    </div>
                    <div className="col-md-6">
                      {selfassessments.otherDiseases}
                    </div>
                  </div>

                  {/* diseases */}
                </div>
              </div>
            </div>
          </div>
        );
};

export default ViewSelfAssessmentComponent;