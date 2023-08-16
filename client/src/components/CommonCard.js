// import { Box, Center } from '@chakra-ui/react';

// const CommonCard = ({ title, description }) => {
//     return (

//         <Box
//             maxW="20rem"
//             h="10rem"
//             borderRadius="lg"
//             overflow="hidden"
//             p="4"
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"

//             bg="#E4EFFF"
//             border="none"

//         >
//             <Box fontWeight="semibold" fontSize="lg" mb="2" textAlign="center">
//                 {title}
//             </Box>
//             <Box fontSize="5xl" fontWeight="bold" textAlign="center">
//                 {description}
//             </Box>
//         </Box>
//     );
// };

// export default CommonCard;

import { Box } from '@chakra-ui/react';

const CommonCard = ({ title, description }) => {
    return (
        <Box
            maxW="20rem"
            h="10rem"
            borderRadius="40"
            overflow="hidden"
            p="4"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgGradient="linear(to-b, #C4DBFD, #A5C9F3)"
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
            border="none"
            transform="translateY(0)"
            transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
            _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Box fontWeight="semibold" fontSize="lg" mb="2" textAlign="center">
                {title}
            </Box>
            <Box fontSize="5xl" fontWeight="bold" textAlign="center">
                {description}
            </Box>
        </Box>
    );
};

export default CommonCard;

