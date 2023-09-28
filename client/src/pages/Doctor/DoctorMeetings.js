import React, { useState, useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box, Text, Button, GridItem, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon, PlusSquareIcon } from '@chakra-ui/icons';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosMethods from '../../hooks/useAxiosMethods';


const DoctorMeetings = () => {

    const { get, post, put } = useAxiosMethods();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentTab, setCurrentTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showMeeting, setShowMeeting] = useState(false);
    const [meetingsData, setMeetingsData] = useState([]);
    const [stateChanged, setStateChanged] = useState(false);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };

    const fetchMeetings = async () => {
        try {
            get(`/meetings/getScheduledMeetingsDoctor/${auth.user_id}`, setMeetingsData);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchMeetings();
        };

        fetchData();
    }, [stateChanged]);

    // to join the meeting on a new tab
    const handleMeeting = async (meeting) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowMeeting(true);

            const meetingUrl = `/meeting/${meeting.meeting_id}/doctor/${meeting.start}`

            const conferenceWindow = window.open(
                meetingUrl,
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

    const handleRemove = (meetingId) => {
        try {
            put(`/meetings/cancelAfterSchedule/${meetingId}`, {}, setStateChanged);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }


    // to apply the relevant button on the meeting card
    const renderCardAction = (meeting) => {

        if (new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) < Date.now()) {
            return null;

        } else if (new Date(meeting.start) >= Date.now() && new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) <= Date.now()) {
            return (
                <>
                    <div>
                        {!showMeeting ? (
                            <Button
                                rightIcon={<CheckIcon />}
                                colorScheme='teal'
                                variant='outline'
                                size='sm'
                                onClick={() => { handleMeeting(meeting) }}
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
                </>
                
            );
        } else {
            return (
                <div>
                    <Button
                        colorScheme="red"
                        rightIcon={<SmallCloseIcon />}
                        variant="outline"
                        size="sm"
                        onClick={() => { handleRemove(meeting.meeting_id) }}
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

    function formatMeetingTime(timeString) {
        const date = new Date(timeString);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <GridItem colSpan={6} rowSpan={7}>
            <div className=" h-screen py-1 bg-primary mt-[3%]">
                <div className="md:w-3/4 mx-auto shadow-xl rounded-2xl pb-2 py-1 bg-white mt-9 p-5 h-3/4">
                    <Box p={4}>
                        <Tabs index={currentTab} onChange={handleTabChange} variant='enclosed'>

                            <TabList>
                                <Tab>Ongoing</Tab>
                                <Tab>Upcoming</Tab>
                                <Tab>History</Tab>
                            </TabList>

                            <TabPanels className='h-[22rem] overflow-y-scroll'>

                                <TabPanel>
                                    {meetingsData
                                        .filter((meeting) => new Date(meeting.start) >= Date.now() && new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) <= Date.now())
                                        .map((meeting) => (
                                            <>
                                                <Heading size='md' mb={4}>
                                                    {formatMeetingDate(meeting.start)}
                                                </Heading>
                                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                                    <Flex direction="column">
                                                        <Text>
                                                            {formatMeetingTime(meeting.start)} - {formatMeetingTime(meeting.end)}
                                                        </Text>
                                                        <Text fontWeight='bold' fontSize="lg">Meeting with Patient, {meeting.patient_name}</Text>
                                                        {renderCardAction(meeting)}
                                                    </Flex>

                                                </Box>
                                            </>

                                        ))}
                                </TabPanel>

                                <TabPanel>
                                    {meetingsData
                                        .filter((meeting) => new Date(meeting.start) > Date.now())
                                        .map((meeting) => (
                                            <>
                                                <Heading size='md' mb={4}>
                                                    {formatMeetingDate(meeting.start)}
                                                </Heading>
                                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                                    <Flex direction="column">
                                                        <Text>
                                                            {formatMeetingTime(meeting.start)} - {formatMeetingTime(meeting.end)}
                                                        </Text>
                                                        <Text fontWeight='bold' fontSize="lg">Meeting with Patient, {meeting.patient_name}</Text>
                                                        {renderCardAction(meeting)}
                                                    </Flex>

                                                </Box>
                                            </>
                                        ))}
                                </TabPanel>

                                <TabPanel>
                                    {meetingsData
                                        .filter((meeting) => new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) < Date.now())
                                        .map((meeting) => (
                                            <>
                                                <Heading size='md' mb={4}>
                                                    {formatMeetingDate(meeting.start)}
                                                </Heading>
                                                <Box key={meeting.id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                                    <Flex direction="column">
                                                        <Text>
                                                            {formatMeetingTime(meeting.start)} - {formatMeetingTime(meeting.end)}
                                                        </Text>
                                                        <Text fontWeight='bold' fontSize="lg">Meeting with Patient, {meeting.patient_name}</Text>
                                                        {renderCardAction(meeting)}
                                                    </Flex>

                                                </Box>
                                            </>
                                        ))}
                                </TabPanel>

                            </TabPanels>
                        </Tabs>
                    </Box>
                </div>
            </div>
        </GridItem>
    );
}

export default DoctorMeetings
