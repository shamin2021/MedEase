import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const SimpleCard = ({ title, description }) => {
    return (
        <Box
            maxW="520px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Text fontSize="xl" fontWeight="bold" mb="2">
                {title}
            </Text>
            <Text>
                {description}
            </Text>
            <Button colorScheme="blue" mt="4">
                Click Me
            </Button>
        </Box>
    );
};

export default SimpleCard;
