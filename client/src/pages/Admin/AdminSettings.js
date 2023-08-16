import React, { useState } from 'react';
import {
    Box,
    Heading,
    Select,
    RadioGroup,
    Radio,
    Stack,
    Switch,
    Text,
    Link,
    GridItem,
    Flex,
    Input,
    Button,
} from '@chakra-ui/react';

function DoctorSetting() {
    const [selectedTimeZone, setSelectedTimeZone, newUsername, setNewUsername] = useState('');

    const timeZoneOptions = [
        'UTC',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
    ];

    const handleTimeZoneChange = (event) => {
        setSelectedTimeZone(event.target.value);
    };

    const handleChange = (event) => {
        setNewUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle username change logic here
        console.log('New username:', newUsername);
        // Reset the input field after submission
        setNewUsername('');
    };
    return (

        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"
        >

            <Flex
                display={"flex"}
                flexDir={"column"}
                ml="20"
                mr="20"
            >
                <Heading size="lg" mb={4}>
                    General Settings
                </Heading>

                <Flex
                    alignItems={"center"}
                    mb={6}
                >
                    <Text mr="60px" >Language:</Text>
                    <Select placeholder="Select language">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                    </Select>
                </Flex>

                <Flex
                    alignItems={"center"}
                    mb={6}
                >
                    <Text mr="93px"  >Theme:</Text>
                    <RadioGroup>
                        <Stack direction="row">
                            <Radio value="light">Light</Radio>
                            <Radio value="dark">Dark</Radio>
                            <Radio value="custom">Custom</Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>

                <Flex
                    alignItems={"center"}
                    mb={6}
                >
                    <Text mr="53px">Time Zone:</Text>
                    <select value={selectedTimeZone} onChange={handleTimeZoneChange}>
                        <option value="">Select a time zone</option>
                        {timeZoneOptions.map((timeZone, index) => (
                            <option key={index} value={timeZone}>
                                {timeZone}
                            </option>
                        ))}
                    </select>
                </Flex>

            </Flex>

            <Flex
                display={"flex"}
                flexDir={"column"}
                ml="20"
                mr="20"
            >
                <Heading size="lg" my={4}>
                    Account Settings
                </Heading>

                <Text mb={2}>Username :</Text>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={newUsername}
                        onChange={handleChange}
                        placeholder="Enter new username"
                        mb={2}
                    />
                    <Button mb={4} type="submit">Change Username</Button>
                </form>

                <Text mb={2}>Username :</Text>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={newUsername}
                        onChange={handleChange}
                        placeholder="Enter new username"
                        mb={2}
                    />
                    <Button mb={4} type="submit">Change Username</Button>
                </form>

            </Flex>

            <Flex
                display={"flex"}
                flexDir={"column"}
                ml="20"
                mr="20"
            >
                <Heading size="lg" my={4}>
                    Help and Support
                </Heading>

                <Box mb={6}>
                    <Text mb={2}>FAQs:</Text>
                    {/* List of frequently asked questions */}
                </Box>
                <Box mb={6}>
                    <Text mb={2}>Contact Support:</Text>
                    {/* Options to get in touch with customer support */}
                </Box>
                <Box mb={6}>
                    <Text mb={2}>User Guides:</Text>
                    <Link color="blue.500">View User Guides</Link>
                </Box>

            </Flex>



        </GridItem>


    );
}

export default DoctorSetting;
