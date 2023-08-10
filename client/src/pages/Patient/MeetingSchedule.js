import React, { useState } from 'react';
import { GridItem } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Switch, Input, Box, Text } from '@chakra-ui/react';


const MeetingSchedule = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    return (
        <GridItem colSpan={6} mx={4} mt={2}>
            <div>
                <FullCalendar
                    plugins={[interactionPlugin, dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[
                        {
                            id: 1,
                            doctor: 'Dr. John Doe',
                            type: 'Physical',
                            start: '2023-08-10T10:00:00',
                            end: '2023-08-10T12:00:00',
                            backgroundColor: '#79b1ff'
                        },
                        {
                            id: 2,
                            type: 'Virtual',
                            doctor: 'Dr. John Doe',
                            start: '2023-08-10T14:00:00',
                            end: '2023-08-10T16:00:00',
                            backgroundColor: 'teal'
                        },
                        {
                            id: 3,
                            type: 'Virtual',
                            doctor: 'Dr. John Doe',
                            start: '2023-08-10T10:30:00',
                            end: '2023-08-10T12:00:00',
                            backgroundColor: 'teal'
                        },
                        {
                            id: 4,
                            type: 'Physical',
                            doctor: 'Dr. John Doe',
                            start: '2023-08-07T14:00:00',
                            end: '2023-08-07T16:00:00',
                            backgroundColor: '#79b1ff'
                        },

                    ]}

                    eventDisplay="block"
                    selectable={true}

                    eventClick={(event) => {
                        if (event.event.extendedProps.type === 'Virtual') {
                            setSelectedEvent(event.event);
                            setIsModalOpen(true);
                        }
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
                    <Modal isOpen={selectedEvent !== null} onClose={closeModal}>
                        <ModalOverlay />
                        <ModalContent maxWidth="90vw" width="auto" mx={[4, 8, 16]} my={[4, 8, 12]}>
                            <ModalBody>
                                <Box>
                                    <Text fontWeight="bold" mb={2}>Schedule Meeting:</Text>
                                    <Box mb={2}>
                                        <span>Doctor:</span>
                                        <Text>{selectedEvent?.extendedProps?.doctor}</Text>
                                    </Box>

                                    <Box>
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

                                    <Button colorScheme="teal" onClick={() => { }}>
                                        Schedule
                                    </Button>

                                </Box>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </div>
        </GridItem>
    )
}

export default MeetingSchedule
