import React, { useState, useEffect } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import medeaseLogo from "../../assets/Medeaselogo.png";
import useAuth from '../../hooks/useAuth';

const ViewSelfAssessmentComponent = () => {

  const { id } = useParams();
  const { auth } = useAuth();
  console.log(id);

  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();

  const [selfassessments, setSelfAssessments] = useState([]);
  const [medicalTest, setMedicalTest] = useState([])

  useEffect(() => {
    try {
      get(`/SelfAssessments/${id}`, setSelfAssessments);
      get(`/MedicalAssessments/${id}`, setMedicalTest);

    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, []);

  useEffect(() => {
    console.log(medicalTest);
  }, [medicalTest]);

  function InputGeneral(props) {
    return (
      <div className="mt-5 text-[18px] ">
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
    const assessmentDate = new Date(selfassessments.date);

    const ageInMilliseconds = assessmentDate - dob;
    const ageInYears = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));

    return ageInYears;
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define a function to add the header content
    const addHeader = (pageNumber) => {
      doc.addImage(medeaseLogo, 'PNG', 10, 10, 27, 10);

      const currentDate = new Date().toLocaleString();
      doc.setFontSize(10);
      doc.text(`Page ${pageNumber} - ${currentDate}`, 150, 15);
      doc.text(`Name: ${auth.first_name}`, 10, 25);
      doc.text(`Role: ${auth.role}`, 80, 25);
      doc.text(`User ID: ${auth.user_id}`, 150, 25);
    };

    const generalheaders = [['Weight', 'Height', 'BMI', 'Waist Circumference', 'Waist Height Ratio']];
    const generaldata = [[
      medicalTest.weight ?? "No Data",
      medicalTest.height ?? "No Data",
      medicalTest.bmi ?? "No Data",
      medicalTest.waist_circumference ?? "No Data",
      medicalTest.waistHeightRatio ?? "No Data",
    ],];

    const generalheaders2 = [['Hearing Left', 'Hearing Right', 'Vision Left', 'Vision Right', 'Oral Examination']];
    const generaldata2 = [[
      medicalTest.hearingLeft ?? "No Data",
      medicalTest.hearingRight ?? "No Data",
      medicalTest.visionRight ?? "No Data",
      medicalTest.visionLeft ?? "No Data",
      medicalTest.oralExamination ?? "No Data",
    ],];

    const familyheaders = [['Heart Disease', 'High Blood Pressure', 'Stroke', 'Diabetes', 'Cancer', 'COPD', 'Asthma', 'Kidney Disease']];
    const familysdata = [[
      selfassessments.heartDisease ? "Yes" : "No",
      selfassessments.HighBloodPressure ? "Yes" : "No",
      selfassessments.stroke ? "Yes" : "No",
      selfassessments.diabetes ? "Yes" : "No",
      selfassessments.cancer ? "Yes" : "No",
      selfassessments.copd ? "Yes" : "No",
      selfassessments.asthma ? "Yes" : "No",
      selfassessments.kidneyDiseases ? "Yes" : "No",
    ],];

    const habitsheaders = [['Beetle Chewing', 'Physical Activity', 'Tobacco Smoking', 'Other Substances Consumption', 'Alcohol Consumption']];
    const habitsdata = [[
      selfassessments.beetlechewing ? "Yes" : "No",
      selfassessments.physicalActivity ? "Sufficient" : "Insufficient",
      selfassessments.tobaccoSmoking ? "Yes" : "No",
      selfassessments.otherSubstance ? "Yes" : "No",
      selfassessments.alcoholConsumption ? "Yes" : "No",
    ],];

    const examinationsheaders = [['Cholestorol Level', 'SBP', 'FBS', 'RBS', 'Blood Sugar', 'Serum Creatinin', 'Lipid Profile TG', 'Lipid TCHL', 'Lipid Profile TC', 'Lipid Profile LDL', 'Lipid Profile HDL']];
    const examinationsdata = [[
      medicalTest.cholesterolLvl ?? "No Data",
      medicalTest.sbp ?? "No Data",
      medicalTest.fastingbloodSugar ?? "No Data",
      medicalTest.randombloodSugar ?? "No Data",
      medicalTest.serumCreatinin ?? "No Data",
      medicalTest.lipidTg ?? "No Data",
      medicalTest.lipidLDL ?? "No Data",
      medicalTest.lipidTCHL ?? "No Data",
      medicalTest.lipidHDL ?? "No Data",
      medicalTest.lipidTC ?? "No Data",

    ],];

    // Calculate the height of the first table (Self Assessment)
    const table1Height = habitsheaders.length * 10 + habitsdata.length * 10;

    // Check if there is enough space on page 1 for the first table
    if (table1Height <= doc.internal.pageSize.getHeight()) {
      // Add the header to page 1
      addHeader(1);

      doc.setFontSize(12);
      doc.text(`Assessment ID : ${id}`, 10, 45);

      doc.text(`Risk Level :  ${selfassessments.risk}`, 150, 45);

      doc.setFontSize(12);
      doc.text('General Details', 10, 55);
      doc.autoTable({
        head: generalheaders,
        body: generaldata,
        startY: 60,
        margin: { top: 10 },
      });
      doc.autoTable({
        head: generalheaders2,
        body: generaldata2,
        startY: 80,
        margin: { top: 10 },
      });

      doc.setFontSize(12);
      doc.text('Family History', 10, 110);
      doc.autoTable({
        head: familyheaders,
        body: familysdata,
        startY: 115,
        margin: { top: 10 },
      });

      doc.setFontSize(12);
      doc.text('Habits', 10, 145);
      doc.autoTable({
        head: habitsheaders,
        body: habitsdata,
        startY: 150,
        margin: { top: 10 },
      });

      doc.setFontSize(12);
      doc.text('Medical Examinations', 10, 180);
      doc.autoTable({
        head: examinationsheaders,
        body: examinationsdata,
        startY: 185,
        margin: { top: 10 },
      });

    }

    doc.save('PatientReport.pdf');
  };


  return (
    <GridItem colSpan={6}>
      <div>
        <div className="py-1  bg-primary h-screen">
          <div className="ml-[7%] mx-auto h-full flex rounded-md py-1 p-5 mt-[5%]">
            <div className="parent flex md:w-3/12 shadow-xl rounded-md pb-2 py-1 h-3/4 bg-white m-3 mt-9 p-5">
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
            <div className="parent flex md:w-7/12 shadow-xl rounded-md pb-2 py-1 h-3/4 bg-white m-3 mt-9 p-5">
              <div className=" md:w-full m-3">
                <div className="flex justify-between mb-5 mt-5">
                  <div className="text-[20px] font-semibold mb-0">
                    Assessment Information
                  </div>

                  <div className="w-1/4" hidden={selfassessments.risk === "PENDING" ? true : false}>

                    <button
                      className="btn btn-primary text-[17px] bg-primary p-2 font-semibold"
                      align="center"
                      onClick={() =>
                        generatePDF()
                      }
                    >
                      Download Report
                    </button>
                  </div>

                  <div className="w-1/4" hidden={selfassessments.risk === "PENDING" ? false : true}>
                    <button
                      className="btn btn-primary text-[17px] bg-primary p-2 font-semibold"
                      onClick={() => navigate(`/AddExamination/${id}`)}
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
                    <Tab fontSize={18} borderBottom={0} paddingLeft={0}>
                      General
                    </Tab>
                    <Tab fontSize={18} borderBottom={0}>
                      Family History
                    </Tab>
                    <Tab fontSize={18} borderBottom={0}>
                      Examination
                    </Tab>
                    <Tab fontSize={18} borderBottom={0}>
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
                          <InputGeneral name="Weight" data={medicalTest.weight ? medicalTest.weight : "No Medical Data"} />
                          <InputGeneral name="Height" data={medicalTest.height ? medicalTest.height : "No Medical Data"} />
                          <InputGeneral name="BMI" data={medicalTest.bmi ? medicalTest.bmi : "No Medical Data"} />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral
                            name="Waist Circumference"
                            data={medicalTest.waistCircumference ? medicalTest.waistCircumference : "No Medical Data"}
                          />
                          <InputGeneral
                            name="Waist Height Ratio"
                            data={medicalTest.waistHeightRatio ? medicalTest.waistHeightRatio : "No Medical Data"}
                          />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral
                            name="Hearing"
                            dataR={medicalTest.hearingRight ? medicalTest.hearingRight : "No Medical Data"}
                            dataL={medicalTest.hearingLeft ? medicalTest.hearingLeft : "No Medical Data"}
                            variant="2"
                          />
                          <InputGeneral
                            name="Vision"
                            dataR={medicalTest.visionRight ? medicalTest.visionRight : "No Medical Data"}
                            dataL={medicalTest.visionLeft ? medicalTest.visionLeft : "No Medical Data"}
                            variant="2"
                          />
                          <InputGeneral name="Oral Examination" data={medicalTest.oralExamination ? medicalTest.oralExamination : "No Medical Data"} />
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
                        <div className="md:w-1/3 parent m-3 mt-0 ml-0">
                          <InputGeneral name="Random Blood Sugar" data={medicalTest.randombloodSugar ? medicalTest.randombloodSugar : "No Medical Data"} />
                          <InputGeneral name="Fasting Blood Sugar" data={medicalTest.fastingbloodSugar ? medicalTest.fastingbloodSugar : "No Medical Data"} />
                          <InputGeneral name="Serum Creatinin" data={medicalTest.serumCreatinin ? medicalTest.serumCreatinin : "No Medical Data"} />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral name="Lipid Profile TG" data={medicalTest.lipidTg ? medicalTest.lipidTg : "No Medical Data"} />
                          <InputGeneral name="Lipid TCHL" data={medicalTest.lipidTCHL ? medicalTest.lipidTCHL : "No Medical Data"} />
                          <InputGeneral name="Lipid Profile TC" data={medicalTest.lipidTC ? medicalTest.lipidTC : "No Medical Data"} />
                        </div>
                        <div className="md:w-1/3 parent m-3 mt-1">
                          <InputGeneral name="Lipid Profile LDL" data={medicalTest.lipidLDL ? medicalTest.lipidLDL : "No Medical Data"} />
                          <InputGeneral name="Lipid Profile HDL" data={medicalTest.lipidHDL ? medicalTest.lipidHDL : "No Medical Data"} />
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