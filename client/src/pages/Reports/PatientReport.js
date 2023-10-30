import React, { useEffect, useState } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";

import { Flex,Button, GridItem } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable';
import medeaseLogo from "../../assets/Medeaselogo.png";
import useAuth from "../../hooks/useAuth";
import {useParams } from "react-router-dom";

import { useNavigate, useLocation, } from "react-router-dom";



const PDFGenerator = () => {

    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id);

    const { get } = useAxiosMethods();
    
    const [assessments, setSelfAssessments] = useState([]);
    const [medicalTest, setMedicalTest] = useState([])
 
    const loggedInUser = {
      "username": auth.first_name,
      "role": auth.role,
      "user_id": auth.user_id
    };

    useEffect(() => {
      try {
        get(`/SelfAssessments/${id}`, setSelfAssessments);
        get(`/MedicalAssessments/${id}`, setMedicalTest);

      } catch (err) {
        console.error(err);
      }
    }, []);


    useEffect(() => {
      console.log(assessments);
    }, [assessments]);

    useEffect(() => {
      console.log(medicalTest);
    }, [medicalTest]);  

    useEffect(() => {
      // Call generatePDF function when the component is mounted
      generatePDF();

      navigate(`/view-SelfAssessment/${id}`);

    }, []);

const generatePDF = () => {
      const doc = new jsPDF();

      // Define a function to add the header content
      const addHeader = (pageNumber) => {
        doc.addImage(medeaseLogo, 'PNG', 10, 10, 27, 10);

        const currentDate = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber} - ${currentDate}`, 150, 15);
        doc.text(`Name: ${loggedInUser.username}`, 10, 25); 
        doc.text(`Role: ${loggedInUser.role}`, 80, 25); 
        doc.text(`User ID: ${loggedInUser.user_id}`, 150, 25); 
      };

       const generalheaders = [['Weight', 'Height', 'BMI','Waist Circumference','Waist Height Ratio']];
        const generaldata =[[
          medicalTest.weight,
          medicalTest.height ,
          medicalTest.bmi ,
          medicalTest.waist_circumference,
          medicalTest.waistHeightRatio,
        ],];

        const generalheaders2 = [['Hearing Left','Hearing Right','Vision Left','Vision Right','Oral Examination']];
        const generaldata2 =[[
          medicalTest.hearingLeft,
          medicalTest.hearingRight,
          medicalTest.visionRight,
          medicalTest.visionLeft,
          medicalTest.oralExamination,
        ],];

        const familyheaders = [['Heart Disease', 'High Blood Pressure', 'Stroke','Diabetes','Cancer','COPD','Asthma','Kidney Disease']];
        const familysdata = [[
          assessments.heartDisease ? "Yes" : "No",
          assessments.HighBloodPressure ? "Yes" : "No",
          assessments.stroke ? "Yes" : "No",
          assessments.diabetes ? "Yes" : "No",
          assessments.cancer ? "Yes" : "No",
          assessments.copd ? "Yes" : "No",
          assessments.asthma ? "Yes" : "No",
          assessments.kidneyDiseases ? "Yes" : "No",
        ],];

        const habitsheaders = [['Beetle Chewing', 'Physical Activity', 'Tobacco Smoking','Other Substances Consumption','Alcohol Consumption']];
        const habitsdata = [[
          assessments.beetlechewing ? "Yes" : "No",
          assessments.physicalActivity ? "Sufficient" : "Insufficient",
          assessments.tobaccoSmoking ? "Yes" : "No",
          assessments.otherSubstance ? "Yes" : "No",
          assessments.alcoholConsumption ? "Yes" : "No",
        ],];

        const examinationsheaders = [['Cholestorol Level','SBP','FBS','RBS','Blood Sugar', 'Serum Creatinin', 'Lipid Profile TG','Lipid TCHL','Lipid Profile TC','Lipid Profile LDL','Lipid Profile HDL']];
        const examinationsdata = [[
          medicalTest.cholesterolLvl,
          medicalTest.sbp,
          medicalTest.fastingbloodSugar,
          medicalTest.randombloodSugar,
          medicalTest.serumCreatinin,
          medicalTest.lipidTg,
          medicalTest.lipidLDL,
          medicalTest.lipidTCHL,
          medicalTest.lipidHDL,
          medicalTest.lipidTC,
          
        ],];

      // Calculate the height of the first table (Self Assessment)
      const table1Height = habitsheaders.length * 10 + habitsdata.length * 10;

      // Check if there is enough space on page 1 for the first table
      if (table1Height <= doc.internal.pageSize.getHeight()) {
        // Add the header to page 1
        addHeader(1);

        doc.setFontSize(12);
        doc.text(`Assessment ID : ${id}`, 10, 45); 

        doc.text(`Risk Level :  ${assessments.risk}`, 150, 45); 

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

      <GridItem
        colSpan={6}
        rowSpan={1}
        borderRadius="lg"
        p="4"
      >
          <Flex
          align="center"
          justify="center"
          height="100vh" 
          >
              <Button onClick={generatePDF}>Generate PDF</Button>
          </Flex>
      </GridItem>
    );
}

export default PDFGenerator;


