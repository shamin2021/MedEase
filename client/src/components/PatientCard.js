import { Box, Center } from '@chakra-ui/react';

const PatientCard = ({ title, description }) => {
    return (

        <Box
            maxW="20rem"
            h="10rem"
            borderRadius="lg"
            overflow="hidden"
            p="4"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"

            bg="#E4EFFF"
            border="none"

        >
            <Box fontWeight="semibold" fontSize="lg" mb="2" textAlign="center">
                {title}
            </Box>
            <Box fontSize="3xl" fontWeight="bold" textAlign="center">
                {description}
            </Box>
        </Box>
    );
};

export default PatientCard;
