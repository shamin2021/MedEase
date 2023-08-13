import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const SimpleTable = () => {
    return (
        <Table
            variant='simple'
            border="1px solid gray"
            borderRadius="8px"
        >
            <Thead>
                <Tr>
                    <Th minWidth="200px">Header 1</Th>
                    <Th minWidth="200px">Header 2</Th>
                    <Th minWidth="200px">Header 3</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td minWidth="150px">Data 1</Td>
                    <Td minWidth="200px">Data 2</Td>
                    <Td minWidth="100px">Data 3</Td>
                </Tr>
                <Tr>
                    <Td minWidth="150px">Data 4</Td>
                    <Td minWidth="200px">Data 5</Td>
                    <Td minWidth="100px">Data 6</Td>
                </Tr>
                {/* Add more rows as needed */}
            </Tbody>
        </Table>
    );
};

export default SimpleTable;
