import React, { useEffect, useState } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";

import { Flex,Button, GridItem } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable';
import medeaseLogo from "../../assets/Medeaselogo.png";
import useAuth from "../../hooks/useAuth";

const PDFGenerator = () => {

    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState('')

    const { get } = useAxiosMethods();
    
  const [assessments, setAssessments] = useState([]);
  const id = 61; // Replace with the actual self-assessment ID you want to fetch

    const loggedInUser = {
      "username": auth.first_name,
      "role": auth.role,
      "user_id": auth.user_id
    };

  useEffect(() => {
    try {
      get(`/SelfAssessments`, setAssessments);

    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log(assessments);
  }, [assessments]);

const generatePDF = () => {
      const doc = new jsPDF();

      // Define a function to add the header content
      const addHeader = (pageNumber) => {
        // Add the company logo to the header
        doc.addImage(medeaseLogo, 'PNG', 10, 10, 27, 10);

        // Add the timestamp to the header
        const currentDate = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Page ${pageNumber} - ${currentDate}`, 150, 15);
        doc.text(`Name: ${loggedInUser.username}`, 10, 25); // Print Name
        doc.text(`Role: ${loggedInUser.role}`, 70, 25); // Print role
        doc.text(`User ID: ${loggedInUser.user_id}`, 150, 25); // Print id
      };

      // Define table headers and data
      const selfassessmentheaders = [['Index','First Name', 'Last Name', 'Created Date', 'Risk']];
      const selfassessmentdata = assessments.map((assessment, index) => [
          index + 1, //10, 20 + index * 10,
          assessment.firstName,
          assessment.lastName,
          assessment.created_date,
          assessment.risk,
      ]);

      const visitsheaders = [['Date', 'Time', 'Mode']];
      const visitsdata = assessments.map((assessment, index) => [
          index + 1, 10, 20 + index * 10,
          assessment.firstName,
          assessment.lastName,
          assessment.created_date,
          assessment.risk,
      ]);

      // Calculate the height of the first table (Self Assessment)
      const table1Height = selfassessmentheaders.length * 10 + selfassessmentdata.length * 10;

      // Check if there is enough space on page 1 for the first table
      if (table1Height <= doc.internal.pageSize.getHeight()) {
        // Add the header to page 1
        addHeader(1);

        doc.setFontSize(12);
        doc.text('Self Assessment Data', 10, 35);

          // There is enough space on page 1, so we can print the first table on page 1
          doc.autoTable({
              head: selfassessmentheaders,
              body: selfassessmentdata,
              startY: 40, // Start Y-position of the first table
              margin: { top: 10 },
          });

          // Add a page break
          doc.addPage();

          // Add the header to page 2
          addHeader(2);

          doc.setFontSize(12);
          doc.text('History of Visits', 10, 35);
          // Print the second table (Visits) on page 2
          doc.autoTable({
              head: visitsheaders,
              body: visitsdata,
              startY: 40, // Start Y-position of the second table on page 2
              margin: { top: 10 },
          });
      } else {

        // Add the header to page 1
        addHeader(1);

          // There is not enough space on page 1 for the first table, so print it on page 2
          doc.addPage();

          // Add the header to page 2
          addHeader(2);

          doc.setFontSize(12);
          doc.text('Self Assessment Data', 10, 35);
          // Print the first table (Self Assessment) on page 2
          doc.autoTable({
              head: selfassessmentheaders,
              body: selfassessmentdata,
              startY: 40, // Start Y-position of the first table on page 2
              margin: { top: 10 },
          });

          // Add a page break
          doc.addPage();

          // Add the header to page 3
          addHeader(3);

          doc.setFontSize(12);
          doc.text('History of Visits', 10, 35);
          // Print the second table (Visits) on page 3
          doc.autoTable({
              head: visitsheaders,
              body: visitsdata,
              startY: 40, // Start Y-position of the second table on page 3
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