import React, { useState } from 'react';
import { Box,Button,Checkbox,Calendar,TimePicker,DatePicker,FormControl,FormLabel} from '@chakra-ui/react';

const Availability = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [isVirtual, setIsVirtual] = useState(true); // Initial value is virtual

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedSlots([]);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlots((prevSlots) =>
            prevSlots.includes(slot) ? prevSlots.filter((s) => s !== slot) : [...prevSlots, slot]
        );
    };

    const handleSave = () => {
        // Save selected slots and other availability data
        console.log('Selected Date:', selectedDate);
        console.log('Selected Slots:', selectedSlots);
        console.log('Virtual:', isVirtual);
    };

    return (
        <Box>
            <Calendar
                // You can set props for the calendar component here
                onChange={handleDateSelect}
            />

            {selectedDate && (
                <Box>
                    <DatePicker value={selectedDate} disabled />
                    <FormControl>
                        <FormLabel>Select availability type:</FormLabel>
                        <Checkbox isChecked={isVirtual} onChange={() => setIsVirtual(!isVirtual)}>
                            Virtual
                        </Checkbox>
                    </FormControl>

                    {!isVirtual ? (
                        <TimePicker
                        // Set props for time picker for physical availability
                        />
                    ) : (
                        selectedSlots.length > 0 && (
                            <Box>
                                <FormLabel>Select time slots:</FormLabel>
                                {selectedSlots.map((slot) => (
                                    <Checkbox
                                        key={slot}
                                        isChecked={selectedSlots.includes(slot)}
                                        onChange={() => handleSlotSelect(slot)}
                                    >
                                        {slot}
                                    </Checkbox>
                                ))}
                            </Box>
                        )
                    )}

                    <Button onClick={handleSave}>Save Availability</Button>
                </Box>
            )}
        </Box>
    );
};

export default Availability;
