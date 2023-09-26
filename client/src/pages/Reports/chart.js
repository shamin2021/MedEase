import React, { useEffect, useState, useRef } from 'react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { Flex, Button, GridItem } from '@chakra-ui/react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto'; // Import Chart.js
import medeaseLogo from "../../assets/Medeaselogo.png";
import useAuth from "../../hooks/useAuth";

const PDFGenerator = () => {
    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState('');

    const { get } = useAxiosMethods();

    const chartCanvasRef = useRef(null);

    const [assessments, setAssessments] = useState([]);
    const id = 61; // Replace with the actual self-assessment ID you want to fetch

    const loggedInUser = {
        "username": auth.first_name,
        "role": auth.role,
        "user_id": auth.user_id
    };

    // Store the chart instance
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        try {
            get(`/SelfAssessments`, setAssessments);

        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        console.log(assessments);

        // Destroy the previous chart instance if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Render the chart on the canvas element
        const ctx = chartCanvasRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                datasets: [
                    {
                        label: 'Data Set 1',
                        data: [10, 20, 15, 30],
                        backgroundColor: ['red', 'blue', 'green', 'orange'],
                    },
                ],
            },
        });

        // Store the new chart instance
        setChartInstance(newChartInstance);

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
            doc.text(`Name: ${loggedInUser.username}`, 10, 25); 
            doc.text(`Role: ${loggedInUser.role}`, 70, 25); 
            doc.text(`User ID: ${loggedInUser.user_id}`, 150, 25); 
        };

        // Define table headers and data
        const selfassessmentheaders = [['Index', 'First Name', 'Last Name', 'Created Date', 'Risk']];
        const selfassessmentdata = assessments.map((assessment, index) => [
            index + 1, 
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
            addHeader(1);

            doc.setFontSize(12);
            doc.text('Self Assessment Data', 10, 35);

            // There is enough space on page 1, so we can print the first table on page 1
            doc.autoTable({
                head: selfassessmentheaders,
                body: selfassessmentdata,
                startY: 40, 
                margin: { top: 10 },
            });

            // Add a page break
            doc.addPage();

            addHeader(2);

            doc.setFontSize(12);
            doc.text('History of Visits', 10, 35);
            doc.autoTable({
                head: visitsheaders,
                body: visitsdata,
                startY: 40,
                margin: { top: 10 },
            });
        } else {

            addHeader(1);

            // There is not enough space on page 1 for the first table, so print it on page 2
            doc.addPage();

            addHeader(2);

            doc.setFontSize(12);
            doc.text('Self Assessment Data', 10, 35);
            doc.autoTable({
                head: selfassessmentheaders,
                body: selfassessmentdata,
                startY: 40, 
                margin: { top: 10 },
            });

            doc.addPage();

            addHeader(3);

            doc.setFontSize(12);
            doc.text('History of Visits', 10, 35);
            doc.autoTable({
                head: visitsheaders,
                body: visitsdata,
                startY: 40, 
                margin: { top: 10 },
            });
        }

        doc.addPage();

        addHeader(4);

        doc.setFontSize(12);
        doc.text('Bar Chart', 10, 35);

        // Capture the chart as an image
        const chartImageUrl = chartCanvasRef.current.toDataURL('image/jpeg', 1.0);

        // Display the chart image on the webpage
        const chartImage = new Image();
        chartImage.src = chartImageUrl;
        document.body.appendChild(chartImage); // Append the image to the body for display

        // Add the canvas to the PDF
        doc.addImage(chartImageUrl, 'JPEG', 10, 45, 190, 100); // Adjust the position and size as needed

        // Save the PDF
        doc.save('PatientReport.pdf');
    };

    return (
        <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
            <Flex align="center" justify="center" height="100vh">
                <Button onClick={generatePDF}>Generate PDF</Button>
            </Flex>
            {/* Add a canvas element for the chart */}
            <canvas ref={chartCanvasRef} width={400} height={200} style={{ display: 'block' }} />
        </GridItem>
    );
};

export default PDFGenerator;
