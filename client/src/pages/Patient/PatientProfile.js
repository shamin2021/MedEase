import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    GridItem,
    Divider,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Flex,
} from '@chakra-ui/react';

import CommonForm from '../../components/Form/CommonForm'
import PatientCard from '../../components/PatientCard';


const PatientProfilePage = () => {
    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
        >
            <Flex
                display={"flex"}
                justifyContent={"center"}
            >
                <Heading size="xl">Patient Profile</Heading>
            </Flex>
            <Divider my={4} />

            <Flex
                flex-direction="column"
                justifyContent="space-between "
            >
                <Flex>
                    <Box>
                        <Heading size="lg">Personal Information</Heading>
                        <Text>Name: John Doe</Text>
                        <Text>Date of Birth: January 15, 1985</Text>
                        <Text>Gender: Male</Text>
                        <Text>Contact Information: 123 Main St, City, Zip Code</Text>
                        <Text>Phone: (123) 456-7890</Text>
                        <Text>Email: johndoe@example.com</Text>
                    </Box>


                </Flex>

                <Flex>
                    <Box>
                        <PatientCard  title="Blood Pressure" description="120/80 mmHg" />
                        <PatientCard  title="Heart Rate" description="75 bpm" />
                        <PatientCard  title="Respiratory Rate" description="75 bpm" />
                        
                    </Box>
                </Flex>
            </Flex>

            <Divider my={4} />

            {/* Medical History */}
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Medical History
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Text>Current Health Conditions: Allergies</Text>
                        <Text>Past Health Conditions: Asthma</Text>
                        <Text>Allergies: Penicillin</Text>
                        <Text>Surgical History: None</Text>
                        <Text>Family Medical History: Diabetes</Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Divider my={4} />

            {/* Medication List */}
            <Box>
                <Heading size="lg">Medication List</Heading>
                <Text>Current Medications: Medication A (10mg, 2x a day)</Text>
                <Text>Past Medications: Medication B</Text>
            </Box>
            <Divider my={4} />

            {/* Vital Signs */}

            <Divider my={4} />

            {/* Laboratory Results */}
            <Box>
                <Heading size="lg">Laboratory Results</Heading>
                <Text>Blood Tests: Normal</Text>
                <Text>Urine Tests: Clear</Text>
                <Text>Imaging Reports: X-ray - No abnormalities</Text>
            </Box>
            <Divider my={4} />

            {/* Appointments */}
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Appointments
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Text>Upcoming Appointments: August 20, 2023</Text>
                        <Text>Past Appointments: August 5, 2023</Text>
                        <Text>Appointment History: Regular check-ups</Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Divider my={4} />

            {/* Notes and Documents */}
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Notes and Documents
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <Text>Doctor's Notes: Patient is in good health.</Text>
                        <Text>Patient's Notes: Feeling well, no issues.</Text>
                        <Text>Medical Reports: Available upon request.</Text>
                        <Text>Treatment Plans: Follow medication and exercise regimen.</Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <Divider my={4} />

            {/* Emergency Contacts */}
            <Box>
                <Heading size="lg">Emergency Contacts</Heading>
                <Text>Emergency Contact 1: Jane Doe - (555) 123-4567</Text>
                <Text>Emergency Contact 2: Tom Smith - (555) 987-6543</Text>
            </Box>
            <Divider my={4} />

            {/* Patient Preferences */}
            <Box>
                <Heading size="lg">Patient Preferences</Heading>
                <Text>Language Preferences: English</Text>
                <Text>Communication Preferences: Email</Text>
            </Box>
        </GridItem>

    );
};

export default PatientProfilePage;
