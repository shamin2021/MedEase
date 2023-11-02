import React, { useState, useEffect } from 'react';
import { GridItem } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';
import useAxiosMethods from "../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";


const Availability = () => {

    const { get, post, del } = useAxiosMethods();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isVirtual, setIsVirtual] = useState(false);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [res, setRes] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [stateChanged, setStateChanged] = useState(false);
    const [hlcList, setHlcList] = useState([]);
    const [selectedHlc, setSelectedHlc] = useState(null);
    const [err, SetErr] = useState("");


    const timeSlots = [];
    const slotStarts = [];
    const slotEnds = [];

    // to add the timeslots to the modal
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
        const selectedDate = new Date(arg.date);
        const currentDate = new Date();


        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate >= currentDate) {
            setSelectedDate(arg.date);
            setIsModalOpen(true);
        }
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
        if (isVirtual) {
            setSelectedHlc(null);
            setFromTime(null);
            setToTime(null);
        } else {
            setSelectedTimeSlots([]);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setSelectedHlc(null);
        setSelectedEvent(null);
    };

    const hadleEventRemove = async (removeId) => {
        console.log(removeId)
        try {
            del(`/meetings/removeScheduling/${removeId}`, setRes);
            setStateChanged(!stateChanged)
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

    }

    const covertStringDateTimeToTimeStamp = (time) => {
        const dateObject = new Date(selectedDate);
        const [hours, minutes] = time.split(':').map(Number);
        dateObject.setHours(hours);
        dateObject.setMinutes(minutes);
        return dateObject;
    }

    const convertSeletedDateRangestoTimeSlotArray = () => {
        selectedTimeSlots.forEach((timeRange) => {
            const [startTime, endTime] = timeRange.split(' - ');
            slotStarts.push(covertStringDateTimeToTimeStamp(startTime));
            slotEnds.push(covertStringDateTimeToTimeStamp(endTime));
        })
    }

    const handleAddAvailability = () => {
        console.log(selectedTimeSlots);

        if (!isVirtual) {
            if (selectedHlc == null || fromTime == null || toTime == null) {
                SetErr("Please fill all fields");
            } else {
                try {
                    post('/meetings/addSchedule',
                        { meetingType: "PHYSICAL", doctor: auth.user_id, availableHLC: selectedHlc, start: covertStringDateTimeToTimeStamp(fromTime), end: covertStringDateTimeToTimeStamp(toTime) },
                        setRes);
                    closeModal();
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
                setStateChanged(true);
            }
        } else {
            if (selectedTimeSlots.length === 0) {
                SetErr("Please select time slots");
            } else {

                convertSeletedDateRangestoTimeSlotArray();

                try {
                    post('/meetings/addSchedule',
                        { meetingType: "VIRTUAL", doctor: auth.user_id, slotStarts, slotEnds },
                        setRes);
                    closeModal();

                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
            setStateChanged(true);
        }

    }


    const fetchAvailableSlots = async () => {
        try {
            get(`/meetings/getAvailableSlots/${auth.user_id}`, setAvailableSlots);
            get(`/meetings/getHLCForSchedule`, setHlcList);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    useEffect(() => {
        ;
        const fetchData = async () => {
            await fetchAvailableSlots();
        };

        fetchData();
    }, [stateChanged]);

    return (
        <GridItem colSpan={6} mx={4} mt={2}>
            <div>
                <FullCalendar
                    plugins={[interactionPlugin, dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={availableSlots.filter(slot => new Date(slot.start).getTime() > new Date().getTime()).map(event => ({
                        ...event,
                        color: event.meetingType === "VIRTUAL" ? '#1e57c9' : '#bb7cd9',
                    }))}

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
                                        <Text>{selectedEvent.extendedProps.meetingType}</Text>
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
                                    <Button colorScheme="red" onClick={() => hadleEventRemove(selectedEvent.extendedProps.availability_id)}>
                                        Remove
                                    </Button>
                                </Box>
                            </ModalBody>
                        ) : (
                            <>
                                <ModalHeader>{selectedDate && selectedDate.toDateString()}</ModalHeader>
                                <ModalBody>
                                    <Box mt={2}>{err ? err : ''}</Box>

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
                                                    <span>HLC:</span>
                                                    <select value={selectedHlc} onChange={(e) => setSelectedHlc(e.target.value)}>
                                                        <option value="">Choose One</option>
                                                        {hlcList.map((hlc) => (
                                                            <option key={hlc.hlc_id} value={hlc.hlc_id}>
                                                                {hlc.hlc_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Box>
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
                                    <Button colorScheme="teal" onClick={handleAddAvailability}>
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
