import React from 'react';
import { Avatar, Box, Container, Text, VStack, HStack, Link, Grid, GridItem } from '@chakra-ui/react';

const AdminProfile = () => {
    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
        >

            <Container maxW="lg" mt={8}>
                <HStack spacing={4} align="start">
                    <Avatar size="xl" src="/profile-picture.jpg" alt="Doctor Avatar" />
                    <VStack align="start">
                        <Text fontSize="xl" fontWeight="semibold">Dr. Jane Doe</Text>
                        <Text color="gray.500">Pediatrician</Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ligula urna.
                        </Text>
                    </VStack>
                </HStack>
                <Box mt={6}>
                    <Text fontSize="lg" fontWeight="semibold">Contact Information:</Text>
                    <Text>Email: <Link color="blue.500" href="mailto:drjanedoe@example.com">drjanedoe@example.com</Link></Text>
                    <Text>Phone: +123 456 7890</Text>
                    <Text>
                        Social Media: <Link color="blue.500" href="https://twitter.com/drjanedoe" isExternal>@drjanedoe on Twitter</Link>
                    </Text>
                    <Text>
                        Website: <Link color="blue.500" href="https://www.drjanedoe.com" isExternal>www.drjanedoe.com</Link>
                    </Text>
                </Box>
                <Box mt={6}>
                    <Text fontSize="lg" fontWeight="semibold">Location:</Text>
                    <Text>New York City, USA</Text>
                </Box>
                <Box mt={6}>
                    <Text fontSize="lg" fontWeight="semibold">Education/Work History:</Text>
                    <Text>Medical School: University of Medicine</Text>
                    <Text>Residency: Children's Hospital</Text>
                    <Text>Years of Experience: 10+</Text>
                </Box>
                <Box mt={6}>
                    <Text fontSize="lg" fontWeight="semibold">Skills/Expertise:</Text>
                    <Text>Pediatrics, Child Healthcare, Preventive Medicine</Text>
                </Box>
            </Container>
        </GridItem>
    );
};

export default AdminProfile;

