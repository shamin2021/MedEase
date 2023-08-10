import React from 'react'
import CheckTable from '../components/CheckTable'
import {
    columnsDataCheck,
} from "./variables/columnsData";

import tableDataCheck from "./variables/tableDataCheck";
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Progress from '../components/Progress';


const ViewWeeklyTasks = () => {
    return (
        <div className="h-94 py-1 bg-primary">
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'> */}
            <Flex gap={'20px'} flexDirection={{base: 'column', md: 'row'}}>
                <Flex flex={3}>
                    <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
                </Flex>
                <Flex flex={1}>
                    <Progress />
                </Flex>
            </Flex>
            {/* </SimpleGrid> */}
        </Box>
        </div>
    )
}

export default ViewWeeklyTasks