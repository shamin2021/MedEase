import React, { useState, useEffect } from 'react';
import { GridItem } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, ModalContent, ModalBody, Button, Box, Text } from '@chakra-ui/react';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


const MeetingSchedule = () => {

    const { get, post, put } = useAxiosMethods();
    const { id } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [stateChanged, setStateChanged] = useState(false);
    const [scheduleUpdated, setScheduleUpdated] = useState(false);
    const [scheduledMeeting, setScheduledMeeting] = useState(false);

    const fetchAvailableSlots = async () => {
        try {
            get(`/meetings/getAvailableSlots/${id}`, setAvailableSlots);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchAvailableSlots();
        };

        fetchData();
    }, [stateChanged]);


    useEffect(() => {
        console.log(isModalOpen, selectedEvent);
    }, [isModalOpen, selectedEvent]);


    const scheduleMeeting = (event) => {
        console.log(selectedEvent.start, selectedEvent.end);
        try {
            post('/meetings/scheduleMeeting', {start: selectedEvent.start, end: selectedEvent.end, doctor: id, patient: auth.user_id}, setScheduledMeeting);
            put(`/meetings/removeSlotAfterSchedule/${selectedEvent.extendedProps.availability_id}`, {} , setScheduleUpdated);
            closeModal();

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
        setStateChanged(!stateChanged);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <GridItem colSpan={6} mx={4} mt={2}>
            <div className="ml-[30px] h-screen bg-white mt-[4%]">
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

                        eventClick={(event) => {
                            console.log(event.event.extendedProps.meetingType);
                            // if (event.event.extendedProps.meetingType === 'VIRTUAL') {
                                setSelectedEvent(event.event);
                                setIsModalOpen(true);
                            // }
                        }}

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
                        contentHeight={"auto"}

                    />

                    {selectedEvent && (
                        <Modal isOpen={isModalOpen || selectedEvent !== null} onClose={closeModal}>
                            <ModalOverlay />
                            <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]}>
                                <ModalBody>
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>Schedule Meeting:</Text>

                                        <Box>
                                            {selectedEvent.extendedProps.meetingType === "PHYSICAL" ? 
                                                <Box mb={2}>
                                                    <span>HLC:</span>
                                                    <Text>{selectedEvent.extendedProps.hlcName}</Text>
                                                </Box>
                                                :
                                                null
                                            }
                                            <Box mb={2}>
                                                <span>From:</span>
                                                <Text>{selectedEvent.start.toLocaleString()}</Text>
                                            </Box>
                                            <Box>
                                                <span>To:</span>
                                                <Text>{selectedEvent.end.toLocaleString()}</Text>
                                            </Box>
                                        </Box>

                                    </Box>
                                    <Box mt={4}>
                                        <Button colorScheme="blue" mr={3} onClick={closeModal}>
                                            Close
                                        </Button>

                                        <Button colorScheme="teal" onClick={scheduleMeeting}>
                                            Schedule
                                        </Button>

                                    </Box>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    )}

                </div>
            </div>
        </GridItem>
    )
}

export default MeetingSchedule
