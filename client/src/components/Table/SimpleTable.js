// import React from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// const headerCellStyle = {
//     minWidth: "200px",
//     bg: "gray.100",
//     color: "gray.600",
//     fontSize: "lg",
//     textAlign: "center",
// };

// const dataCellStyle = {
//     minWidth: "150px",
//     color: "gray.800",
//     fontSize: "md",
//     textAlign: "center",
// };

// const SimpleTable = () => {
//     return (
//         <Table
//             variant='simple'
//             border="1px solid none"
//             borderRadius="8px"
//             ml="10px"
//             mr="10px"
//         >
//             <Thead>
//                 <Tr>
//                     <Th {...headerCellStyle}>Header 1</Th>
//                     <Th {...headerCellStyle}>Header 2</Th>
//                     <Th {...headerCellStyle}>Header 3</Th>
//                 </Tr>
//             </Thead>
//             <Tbody>
//                 <Tr>
//                     <Td {...dataCellStyle}>Data 1</Td>
//                     <Td {...dataCellStyle}>Data 2</Td>
//                     <Td {...dataCellStyle}>Data 3</Td>
//                 </Tr>
//                 <Tr>
//                     <Td {...dataCellStyle}>Data 4</Td>
//                     <Td {...dataCellStyle}>Data 5</Td>
//                     <Td {...dataCellStyle}>Data 6</Td>
//                 </Tr>
//             </Tbody>
//         </Table>
//     );
// };

// export default SimpleTable;


import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';

const headerCellStyle = {
    minWidth: "200px",
    bg: "gray.100",
    color: "gray.600",
    fontSize: "lg",
    textAlign: "center",
};

const dataCellStyle = {
    minWidth: "150px",
    color: "gray.800",
    fontSize: "md",
    textAlign: "center",
};

const SimpleTable = () => {
    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th {...headerCellStyle}>Header 1</Th>
                        <Th {...headerCellStyle}>Header 2</Th>
                        <Th {...headerCellStyle}>Header 3</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td {...dataCellStyle}>Data 1</Td>
                        <Td {...dataCellStyle}>Data 2</Td>
                        <Td {...dataCellStyle}>Data 3</Td>
                    </Tr>
                    <Tr>
                        <Td {...dataCellStyle}>Data 4</Td>
                        <Td {...dataCellStyle}>Data 5</Td>
                        <Td {...dataCellStyle}>Data 6</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};

export default SimpleTable;
