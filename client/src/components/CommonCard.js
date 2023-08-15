import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const SimpleCard = ({ title, description }) => {
    return (
        <Box
            maxW="520px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            boxShadow="lg"
        >
            <Text fontSize="xl" fontWeight="bold" mb="2">
                {title}
            </Text>
            <Text>
                {description} 
            </Text>
        </Box>
    );
};

export default SimpleCard;
