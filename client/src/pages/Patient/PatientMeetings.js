import React, { useState, useEffect } from 'react'
import {
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Box,
    Text,
    Button,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const meetingsData = [
    {
        id: 1,
        time: '10:00 AM',
        date: '2023-08-09',
        doctor: 'Dr. Smith',
        status: 'past',
    },
    {
        id: 2,
        time: '02:30 PM',
        date: '2023-08-09',
        doctor: 'Dr. Johnson',
        status: 'current',
    },
    {
        id: 3,
        time: '11:45 AM',
        date: '2023-08-10',
        doctor: 'Dr. Williams',
        status: 'future',
    },
];

const PatientMeetings = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showMeeting, setShowMeeting] = useState(false);

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

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };

    const renderCardAction = (meeting) => {
        if (meeting.status === 'past') {
            return null;
        } else if (meeting.status === 'current') {
            return (
                <div>
                    {!showMeeting ? (
                        <Button
                            rightIcon={<CheckIcon />}
                            colorScheme='teal'
                            variant='outline'
                            onClick={handleMeeting}
                            loadingText="Joining..."
                            isLoading={isLoading}
                        >
                            Join
                        </Button>
                    ) : (
                        <Button colorScheme="teal" variant="outline" isLoading={showMeeting} loadingText="In Progress" />
                    )}
                </div>
            );
        } else {
            return (
                <Button
                    colorScheme="red"
                    rightIcon={<CloseIcon />}
                    size="sm"
                    onClick={() => console.log('Cancel button clicked')}
                >
                    Cancel
                </Button>
            );
        }
    };


    return (
        <Box p={4}>
            <Tabs index={currentTab} onChange={handleTabChange}>
                <TabList>
                    <Tab>Past Meetings</Tab>
                    <Tab>Current Meetings</Tab>
                    <Tab>Future Meetings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {meetingsData
                            .filter((meeting) => meeting.status === 'past')
                            .map((meeting) => (
                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                    <Text>{meeting.id}</Text>
                                    <Text>{meeting.time}</Text>
                                    <Text>{meeting.date}</Text>
                                    <Text>{meeting.doctor}</Text>
                                </Box>
                            ))}
                    </TabPanel>
                    <TabPanel>
                        {meetingsData
                            .filter((meeting) => meeting.status === 'current')
                            .map((meeting) => (
                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                    <Text>{meeting.id}</Text>
                                    <Text>{meeting.time}</Text>
                                    <Text>{meeting.date}</Text>
                                    <Text>{meeting.doctor}</Text>
                                    {renderCardAction(meeting)}
                                </Box>
                            ))}
                    </TabPanel>
                    <TabPanel>
                        {meetingsData
                            .filter((meeting) => meeting.status === 'future')
                            .map((meeting) => (
                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                    <Text>{meeting.id}</Text>
                                    <Text>{meeting.time}</Text>
                                    <Text>{meeting.date}</Text>
                                    <Text>{meeting.doctor}</Text>
                                    {renderCardAction(meeting)}
                                </Box>
                            ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default PatientMeetings;
