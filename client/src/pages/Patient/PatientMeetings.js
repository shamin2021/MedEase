import React, { useState, useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box, Text, Button, GridItem, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon, PlusSquareIcon } from '@chakra-ui/icons';

const meetingsData = [
    {
        id: 1,
        time: '10:00 AM',
        date: '2023-08-09',
        doctor: 'Smith',
        status: 'past',
    },
    {
        id: 2,
        time: '02:30 PM',
        date: '2023-08-09',
        doctor: 'Johnson',
        status: 'current',
    },
    {
        id: 3,
        time: '11:45 AM',
        date: '2023-08-10',
        doctor: 'Williams',
        status: 'future',
    },
    {
        id: 4,
        time: '11:45 AM',
        date: '2023-08-10',
        doctor: 'Williams',
        status: 'future',
    },
];

const PatientMeetings = () => {

    const [currentTab, setCurrentTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showMeeting, setShowMeeting] = useState(false);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };

    // to join the meeting on a new tab
    const handleMeeting = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowMeeting(true);

            const conferenceWindow = window.open(
                '/meeting/01/doctor/' + new Date().toISOString(),
                '_blank'
            );
            if (conferenceWindow) {
                localStorage.setItem('meetngInProgress', 'true');
                conferenceWindow.focus();
            }

            const checkTabClosed = setInterval(() => {
                if (conferenceWindow.closed) {
                    clearInterval(checkTabClosed);
                    localStorage.removeItem('meetngInProgress');
                    setIsLoading(false);
                    setShowMeeting(false);
                }
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // to keep track that user is already in a meeting
    useEffect(() => {

        const handleStorageChange = (event) => {
            if (event.key === 'meetngInProgress') {
                setIsLoading(event.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    // to apply the relevant button on the meeting card
    const renderCardAction = (meeting) => {

        if (meeting.status === 'past') {
            return (
                <div>
                    <Button
                        colorScheme="blue"
                        rightIcon={<PlusSquareIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Pescription clicked')}
                    >
                        Add Prescription
                    </Button>
                </div>

            );

        } else if (meeting.status === 'current') {
            return (
                <div>
                    {!showMeeting ? (
                        <Button
                            rightIcon={<CheckIcon />}
                            colorScheme='teal'
                            variant='outline'
                            size='sm'
                            onClick={handleMeeting}
                            loadingText="Joining..."
                            isLoading={isLoading}
                        >
                            Join
                        </Button>
                    ) : (
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                size="sm"
                                isLoading={showMeeting}
                                loadingText="In Progress"
                            />
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <Button
                        colorScheme="red"
                        rightIcon={<SmallCloseIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('Cancel button clicked')}
                    >
                        Cancel
                    </Button>
                </div>

            );
        }
    };

    function formatMeetingDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    // need to edit
    function formatMeetingTime(timeString) {
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours);

        if (period === 'pm') {
            formattedHours += 12;
        }

        return `${formattedHours}:${minutes}`;
    }
    return (
        <GridItem colSpan={6} >
            <Box p={4}>
                <Tabs index={currentTab} onChange={handleTabChange} variant='enclosed'>

                    <TabList>
                        <Tab>Ongoing</Tab>
                        <Tab>Upcoming</Tab>
                        <Tab>History</Tab>
                    </TabList>

                    <TabPanels>

                        <TabPanel>
                            {meetingsData
                                .filter((meeting) => meeting.status === 'current')
                                .map((meeting) => (
                                    <>
                                        <Heading size='md' mb={4}>
                                            {formatMeetingDate(meeting.date)}
                                        </Heading>
                                        <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                            <Flex direction="column">
                                                <Text>
                                                    {formatMeetingTime(meeting.time)} - {formatMeetingTime(meeting.time + 30)} (30 Minutes)
                                                </Text>
                                                <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor}</Text>
                                                {renderCardAction(meeting)}
                                            </Flex>

                                        </Box>
                                    </>

                                ))}
                        </TabPanel>

                        <TabPanel>
                            {meetingsData
                                .filter((meeting) => meeting.status === 'future')
                                .map((meeting) => (
                                    <>
                                        <Heading size='md' mb={4}>
                                            {formatMeetingDate(meeting.date)}
                                        </Heading>
                                        <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                            <Flex direction="column">
                                                <Text>
                                                    {formatMeetingTime(meeting.time)} - {formatMeetingTime(meeting.time + 30)} (30 Minutes)
                                                </Text>
                                                <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor}</Text>
                                                {renderCardAction(meeting)}
                                            </Flex>

                                        </Box>
                                    </>
                                ))}
                        </TabPanel>

                        <TabPanel>
                            {meetingsData
                                .filter((meeting) => meeting.status === 'past')
                                .map((meeting) => (
                                    <>
                                        <Heading size='md' mb={4}>
                                            {formatMeetingDate(meeting.date)}
                                        </Heading>
                                        <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                            <Flex direction="column">
                                                <Text>
                                                    {formatMeetingTime(meeting.time)} - {formatMeetingTime(meeting.time + 30)} (30 Minutes)
                                                </Text>
                                                <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor}</Text>
                                                {renderCardAction(meeting)}
                                            </Flex>

                                        </Box>
                                    </>
                                ))}
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>
        </GridItem>
    );
};

export default PatientMeetings;
