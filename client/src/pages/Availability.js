import React, { useState, useEffect } from 'react';
import { GridItem } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';
import useAxiosMethods from "../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";


const Availability = () => {

    const { get, post, put, del } = useAxiosMethods();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVirtual, setIsVirtual] = useState(false);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [delRes, setDelRes] = useState('');
    const [res, setRes] = useState('');
    const [meetingID, setMeetingID] = useState('');
    const [meetings, setMeetings] = useState([]);
    const [removeId, setRemoveId] = useState(null);


    const timeSlots = [];

    for (let hour = 6; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 22 && minute >= 30) {
                break;
            }
            const startHour = hour.toString().padStart(2, '0');
            const startMinute = minute.toString().padStart(2, '0');
            const endHour = hour + Math.floor((minute + 30) / 60);
            const endMinute = (minute + 30) % 60;
            const formattedEndHour = endHour.toString().padStart(2, '0');
            const formattedEndMinute = endMinute.toString().padStart(2, '0');
            timeSlots.push(`${startHour}:${startMinute} - ${formattedEndHour}:${formattedEndMinute}`);
        }
    }

    const handleDayClick = (arg) => {
        setSelectedDate(arg.date);
        setIsModalOpen(true);
    };

    const handleTimeSlotClick = (timeSlot) => {
        if (selectedTimeSlots.includes(timeSlot)) {
            setSelectedTimeSlots(selectedTimeSlots.filter(slot => slot !== timeSlot));
        } else {
            setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
        }
    };


    const handleToggleSwitch = () => {
        setIsVirtual(!isVirtual);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    const hadleEventRemove = async (removeId) => {
        console.log(removeId)
        try {
            del(`/removeMeeting/${removeId}`, setDelRes);
        } catch(err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    }

    // const formatDateAndTime = (selectedDate, selectedTime) => {
    //     // Convert the selectedDate to the format YYYY-MM-DD
    //     const formattedDate = selectedDate.toISOString().split('T')[0];

    //     // Split the selectedTime into hours and minutes
    //     const [hours, minutes] = selectedTime.split(':');

    //     // Create the formatted time string
    //     const formattedTime = `${formattedDate} ${hours}:${minutes}:00.000000`;

    //     return formattedTime;
    // };

    // const handleAdd = (selectedDate) => {
    //     // console.log(formatDateAndTime(selectedDate, fromTime))
    //     try {
    //         post('/ScheduleMeeting', { type: "Virtual", start: formatDateAndTime(selectedDate,fromTime), end:formatDateAndTime(selectedDate,toTime)}, setRes)
    //     } catch (err){
    //         console.error(err);
    //         navigate('/login', { state: { from: location }, replace: true });
    //     }
    // }



    const fetchMeetings = async () => {
        try {
            get('/getMeetings', setMeetings);

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
    }, [meetings]);

    // useEffect(() => {
    //     console.log(meetings); // Logged the users state here
    // }, [meetings]);

    useEffect(() => {
        console.log(fromTime); // Logged the users state here
        console.log(toTime)
        console.log(selectedDate)
    }, [fromTime, toTime]);

    return (
        <GridItem colSpan={6} mx={4} mt={2}>
            <div>
                <FullCalendar
                    plugins={[interactionPlugin, dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={
                        meetings
                    }

                    eventDisplay="block"
                    selectable={true}

                    eventClick={(event) => setSelectedEvent(event.event)}

                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false
                    }}

                    displayEventEnd={true}
                    progressiveEventRendering={true}

                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev today next'
                    }}

                    buttonText={{
                        today: 'Today',
                    }}

                    height={"auto"}
                    dateClick={handleDayClick}
                    contentHeight={"auto"}



                />

                <Modal isOpen={isModalOpen || selectedEvent !== null} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]} >
                        {selectedEvent ? (
                            <ModalBody>
                                <Box >
                                    <Text fontWeight="bold" mb={2}>Availability Details:</Text>
                                    <Box mb={2}>
                                        <span>Type:</span>
                                        <Text>{selectedEvent.extendedProps.type}</Text>
                                    </Box>
                                    <Box mb={2}>
                                        <span>Start:</span>
                                        <Text>{selectedEvent.start.toLocaleString()}</Text>
                                    </Box>
                                    <Box>
                                        <span>End:</span>
                                        <Text>{selectedEvent.end.toLocaleString()}</Text>
                                    </Box>
                                </Box>
                                <Box mt={4}>
                                    <Button colorScheme="blue" mr={3} onClick={() => setSelectedEvent(null)}>
                                        Close
                                    </Button>
                                    <Button colorScheme="red" onClick={() => hadleEventRemove(selectedEvent.extendedProps.meeting_id)}>
                                        Remove
                                    </Button>
                                </Box>
                            </ModalBody>
                        ) : (
                            <>
                                <ModalHeader>{selectedDate && selectedDate.toDateString()}</ModalHeader>
                                <ModalBody>
                                    <Switch
                                        onChange={handleToggleSwitch}
                                        isChecked={isVirtual}
                                        colorScheme="blue"
                                        mb={4}
                                    >
                                        Virtual
                                    </Switch>
                                    <Box overflowY={isVirtual ? "scroll" : "visible"} maxHeight="40vh">
                                        {isVirtual ? (
                                            <Box>
                                                {timeSlots.map(timeSlot => (
                                                    <Box
                                                        key={timeSlot}
                                                        onClick={() => handleTimeSlotClick(timeSlot)}
                                                        cursor="pointer"
                                                        bg={selectedTimeSlots.includes(timeSlot) ? "blue.500" : "gray.200"}
                                                        p={2}
                                                        borderRadius="md"
                                                        mb={2}
                                                    >
                                                        {timeSlot}
                                                    </Box>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Box>
                                                <Box mb={2}>
                                                    <span>From:</span>
                                                    <Input
                                                        type="time"
                                                        value={fromTime}
                                                        onChange={(e) => setFromTime(e.target.value)}
                                                        ml={2}
                                                        step={900}
                                                    />
                                                </Box>
                                                <Box>
                                                    <span>To:</span>
                                                    <Input
                                                        type="time"
                                                        value={toTime}
                                                        onChange={(e) => setToTime(e.target.value)}
                                                        ml={3}
                                                        step={900}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                        Close
                                    </Button>
                                        <Button colorScheme="teal" onClick={()=>{}}>
                                        Add Availability
                                    </Button>
                                </ModalFooter>
                            </>

                        )}

                    </ModalContent>
                </Modal>

            </div>
        </GridItem>
    );
};

export default Availability;
