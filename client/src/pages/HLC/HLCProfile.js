import React from 'react';
import {
    Box,
    Container,
    Heading,
    Image,
    Text,
    VStack,
    HStack,
    Divider,
    GridItem,
} from '@chakra-ui/react';

const DoctorProfilePage = () => {
    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
            // mr="10"
        >
            <Container maxW="xl" py={8} w="36rem">
                {/* Hospital Name and Logo */}
                <Box mb={6}>
                    <Image src="/hospital-logo.png" alt="Hospital Logo" maxH="100px" />
                    <Heading mt={2}>St. John's Hospital</Heading>
                </Box>

                {/* About Us */}
                <Box mb={8}>
                    <Heading size="md">About Us</Heading>
                    <Text>
                        St. John's Hospital has been serving the community for over 50 years.
                        Our mission is to provide high-quality healthcare with compassion and
                        dedication. We value patient-centered care and strive to make a
                        positive impact on the lives of those we serve.
                    </Text>
                </Box>

                {/* Contact Information */}
                <Box mb={8}>
                    <Heading size="md">Contact Information</Heading>
                    <Text>123 Main Street, Cityville</Text>
                    <Text>Phone: (123) 456-7890</Text>
                    <Text>Email: info@stjohnshospital.com</Text>
                    {/* Add Map Component here */}
                </Box>

                {/* Services */}
                <Box mb={8}>
                    <Heading size="md">Services</Heading>
                    <VStack align="start" spacing={2}>
                        <HStack>
                            <Image src="/emergency-icon.png" alt="Emergency Care" boxSize="40px" />
                            <Text>Emergency Care</Text>
                        </HStack>
                        <Text>
                            Our Emergency Department is open 24/7 to provide immediate medical
                            attention for critical cases.
                        </Text>

                        {/* Add more service descriptions here */}
                    </VStack>
                </Box>

                {/* Accreditations and Certifications */}
                <Box mb={8}>
                    <Heading size="md">Accreditations and Certifications</Heading>
                    <Text>
                        St. John's Hospital is proud to be accredited by the Joint Commission,
                        ensuring our commitment to quality and patient safety.
                    </Text>
                    {/* Add more accreditations and certifications here */}
                </Box>

                {/* Privacy and Terms of Use */}
                <Box>
                    <Divider mb={4} />
                    <Text>
                        By using this website, you agree to our Privacy Policy and Terms of Use.
                        Please read them carefully before proceeding.
                    </Text>
                </Box>
            </Container>
        </GridItem>
    );
};

export default DoctorProfilePage;
