import React, { useState, useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanel, TabPanels, Box, Text, Button, GridItem, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import useAxiosMethods from '../../hooks/useAxiosMethods';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const PatientMeetings = () => {

    const { get, put } = useAxiosMethods();
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
            get(`/meetings/getScheduledMeetingsPatient/${auth.user_id}`, setMeetingsData);

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

            const meetingStart = changeUTCFormat(meeting.start)

            const meetingUrl = `/meeting/${meeting.meeting_id}/patient/${meetingStart}`

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


    const changeUTCFormat = (dateStr) => {
        const dateObj = new Date(dateStr);
        console.log(dateStr);
        const localTime = new Date();
        localTime.setFullYear(dateObj.getFullYear());
        localTime.setMonth(dateObj.getMonth());
        localTime.setDate(dateObj.getDate());
        localTime.setHours(dateObj.getHours());
        localTime.setMinutes(dateObj.getMinutes());
        localTime.setSeconds(dateObj.getSeconds());
        return localTime;
    }


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

        } else if (new Date(meeting.start) <= Date.now() && new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) >= Date.now()) {
            return (
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
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <GridItem colSpan={6} >
            <div className=" h-screen py-1 bg-primary mt-[5%]">
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
                                    {meetingsData ? meetingsData.filter((meeting) => new Date(meeting.start) <= Date.now() && new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) >= Date.now()).length > 0
                                        ?
                                        meetingsData
                                            .filter((meeting) => new Date(meeting.start) <= Date.now() && new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) >= Date.now())
                                            .map((meeting) => (
                                                <>
                                                    <Heading size='md' mb={4}>
                                                        {formatMeetingDate(meeting.start)}
                                                    </Heading>
                                                    <Box key={meeting.meeting_id} p={4} borderWidth="1px" borderRadius="md" mb={2}>
                                                        <Flex direction="column">
                                                            <Text>
                                                                {formatMeetingTime(meeting.start)} - {formatMeetingTime(meeting.end)}
                                                            </Text>
                                                            <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor_name}</Text>
                                                            {renderCardAction(meeting)}
                                                        </Flex>

                                                    </Box>
                                                </>

                                            )) :

                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meetings currently in progress
                                        </Text>

                                        :
                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meetings currently in progress
                                        </Text>
                                    }
                                </TabPanel>

                                <TabPanel>
                                    {meetingsData ? meetingsData.filter((meeting) => new Date(meeting.start) > Date.now()).length > 0
                                        ?
                                        meetingsData
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
                                                            <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor_name}</Text>
                                                            {renderCardAction(meeting)}
                                                        </Flex>

                                                    </Box>
                                                </>
                                            )) :

                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meetings scheduled at the moment
                                        </Text>

                                        :
                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meetings scheduled at the moment
                                        </Text>
                                    }
                                </TabPanel>

                                <TabPanel>
                                    {meetingsData ? meetingsData.filter((meeting) => new Date(meeting.start).setMinutes(new Date(meeting.start).getMinutes() + 30) < Date.now()).length > 0
                                        ?
                                        meetingsData
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
                                                            <Text fontWeight='bold' fontSize="lg">Meeting with Dr.{meeting.doctor_name}</Text>
                                                            {renderCardAction(meeting)}
                                                        </Flex>

                                                    </Box>
                                                </>
                                            )) :

                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meeting history available
                                        </Text>

                                        :
                                        <Text size='sm' textAlign="center" mb={4}>
                                            No meeting history available
                                        </Text>
                                    }
                                </TabPanel>

                            </TabPanels>
                        </Tabs>
                    </Box>
                </div>
            </div>
        </GridItem>
    );
};

export default PatientMeetings;
