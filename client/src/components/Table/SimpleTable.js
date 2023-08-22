// // import React from 'react';
// // import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// // const headerCellStyle = {
// //     minWidth: "200px",
// //     bg: "gray.100",
// //     color: "gray.600",
// //     fontSize: "lg",
// //     textAlign: "center",
// // };

// // const dataCellStyle = {
// //     minWidth: "150px",
// //     color: "gray.800",
// //     fontSize: "md",
// //     textAlign: "center",
// // };

// // const SimpleTable = () => {
// //     return (
// //         <Table
// //             variant='simple'
// //             border="1px solid none"
// //             borderRadius="8px"
// //             ml="10px"
// //             mr="10px"
// //         >
// //             <Thead>
// //                 <Tr>
// //                     <Th {...headerCellStyle}>Header 1</Th>
// //                     <Th {...headerCellStyle}>Header 2</Th>
// //                     <Th {...headerCellStyle}>Header 3</Th>
// //                 </Tr>
// //             </Thead>
// //             <Tbody>
// //                 <Tr>
// //                     <Td {...dataCellStyle}>Data 1</Td>
// //                     <Td {...dataCellStyle}>Data 2</Td>
// //                     <Td {...dataCellStyle}>Data 3</Td>
// //                 </Tr>
// //                 <Tr>
// //                     <Td {...dataCellStyle}>Data 4</Td>
// //                     <Td {...dataCellStyle}>Data 5</Td>
// //                     <Td {...dataCellStyle}>Data 6</Td>
// //                 </Tr>
// //             </Tbody>
// //         </Table>
// //     );
// // };

// // export default SimpleTable;


// import React from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';

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
//         <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
//             <Table variant='simple'>
//                 <Thead>
//                     <Tr>
//                         <Th {...headerCellStyle}>Header 1</Th>
//                         <Th {...headerCellStyle}>Header 2</Th>
//                         <Th {...headerCellStyle}>Header 3</Th>
//                     </Tr>
//                 </Thead>
//                 <Tbody>
//                     <Tr>
//                         <Td {...dataCellStyle}>Data 1</Td>
//                         <Td {...dataCellStyle}>Data 2</Td>
//                         <Td {...dataCellStyle}>Data 3</Td>
//                     </Tr>
//                     <Tr>
//                         <Td {...dataCellStyle}>Data 4</Td>
//                         <Td {...dataCellStyle}>Data 5</Td>
//                         <Td {...dataCellStyle}>Data 6</Td>
//                     </Tr>
//                 </Tbody>
//             </Table>
//         </Box>
//     );
// };

// export default SimpleTable;

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const headerCellStyle = {
    minWidth: "150px",
    bg: "gray.100",
    color: "gray.600",
    fontSize: "22",
    fontWeight: "bold",
    padding: "12px",
    borderBottomWidth: "1px",
    borderColor: "gray.300",
    textAlign: "center",
};

const dataCellStyle = {
    minWidth: "150px",
    color: "gray.800",
    fontSize: "18px",
    padding: "12px",
    borderBottomWidth: "1px",
    borderColor: "gray.300",
    textAlign: "center",
};

const boxStyle = {
    p: 4,
    borderWidth: "1px",
    borderRadius: "lg",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    w: "60rem"
};

const TH = {
    w: "0"
};

const TD = {
    w: "0"
};

const SimpleTable = ({ columns, data }) => {
    return (
        <Box {...boxStyle}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        {columns.map((column, index) => (
                            <Th {...TH} key={index} {...headerCellStyle}>
                                {column.header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <Td {...TD} key={colIndex} {...dataCellStyle}>
                                    {row[column.accessor]}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

SimpleTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SimpleTable;
