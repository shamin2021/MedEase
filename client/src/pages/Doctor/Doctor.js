// import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
// import { FiLogOut } from 'react-icons/fi';
// import { HiSearch } from 'react-icons/hi';


// import CommonCard from '../../components/CommonCard'
// import BarChart from '../../components/BarChart'
// import SimpleTable from '../../components/Table/SimpleTable'
// import React from 'react'
// import { Bar } from 'react-chartjs-2';


// const Doctor = () => {
//     const [searchQuery, setSearchQuery] = React.useState("");

//     const handleSearch = () => {
//         console.log(`Searching for: ${searchQuery}`);
//     };
//     return (
//         <GridItem
//             colSpan={6}
//             rowSpan={1}
//             borderRadius="lg"
//             p="4"

//         // background="blue.300"
//         >
//             <Flex
//                 display="flex"
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="flex-end"
//                 pb="25"
//             >
//                 <Input
//                     w="400px"
//                     type="text"
//                     placeholder="Search"
//                     borderRadius="lg"
//                     border="2px solid #909090"
//                     size="sm"
//                     mr="3"
//                     pl="10"
//                     pr="3"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button
//                     colorScheme="teal"
//                     // size="sm"
//                     leftIcon={<HiSearch />}
//                     onClick={handleSearch}
//                 >
//                 </Button>


//             </Flex>

//             <Flex
//                 display="flex"
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 spacing={10}
//                 pb="4"
//             // bg="blue.200"
//             >
//                 <CommonCard title="Today's Appointments" description={10} />
//                 <CommonCard title="Last Week Patiants" description={140} />
//                 <CommonCard title="Last Week Patiants" description={140} />
//                 <CommonCard title="Last Week Patiants" description={140} />

//             </Flex>

//             <Flex
//                 display="flex"
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 spacing={10}
//                 pb="4"
//             >

//                 <SimpleTable />
//                 <SimpleTable />

//             </Flex>

//             <Flex
//                 justifyContent="space-around"
//             >
//                 <Flex
//                     flexDirection="column"
//                     alignItems="center"
//                     pb="4"
//                 >
//                     <Text>
//                         Chart Title
//                     </Text>

//                     <BarChart />
//                 </Flex>
//                 <Flex
//                     flexDirection="column"
//                     alignItems="center"
//                     pb="4"
//                 >
//                     <Text>
//                         Chart Title
//                     </Text>

//                     <BarChart />
//                 </Flex>


//             </Flex>



//         </GridItem>





//         // <CommonForm />
//     )
// }

// export default Doctor

import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';


import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart';
import SimpleTable from '../../components/Table/SimpleTable'
import React from 'react'
import { Bar } from 'react-chartjs-2';


const Doctor = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = () => {
        console.log(`Searching for: ${searchQuery}`);
    };

    const columns = [
        { header: 'Patient Name', accessor: 'employeeName' },
        { header: 'Time Slot', accessor: 'position' },
        { header: 'HLC Center', accessor: 'department' },
        { header: 'Appointment Date', accessor: 'department1' },
        { header: '', accessor: 'method' },
    ];

    const data = [
        { employeeName: 'Kamal Perera', position: '9:00 AM - 10:00 AM', department: 'Lunawa', department1: '2023-08-16', method: "Online" },
        { employeeName: 'NImal Banda', position: '9:00 AM - 10:00 AM', department: 'Piliyandala', department1: '2023-08-16', method: "Online" },
        { employeeName: 'Samira ', position: '2:30 PM - 3:30 PM', department: 'Nugegoda', department1: '2023-08-18', method: "Vertual" },
        { employeeName: 'Sunil Perera', position: '11:15 AM - 12:15 PM', department: 'Kandy', department1: '2023-08-21', method: "Online" },

        // Add more data as needed
    ];


    return (
        <GridItem
            colSpan={6}
            rowSpan={1}
            borderRadius="lg"
            p="4"

        // background="blue.300"
        >
            <Flex
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                pb="25"
            >
                <Input
                    w="400px"
                    type="text"
                    placeholder="Search"
                    borderRadius="lg"
                    border="2px solid #909090"
                    size="sm"
                    mr="3"
                    pl="10"
                    pr="3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    colorScheme="teal"
                    // size="sm"
                    leftIcon={<HiSearch />}
                    onClick={handleSearch}
                >
                </Button>


            </Flex>

            <Flex
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={10}
                pb="4"
            // bg="blue.200"
            >
                <CommonCard title="Appointments Pending Today" description={10} />
                <CommonCard title="Last Week Patiants" description={140} />
                <CommonCard title="Appointments Cancelled" description={20} />
                <CommonCard title="Total Appointments" description={60} />

            </Flex>

            <Flex
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="Center"
                spacing={10}
                pb="4"
            >

                <SimpleTable columns={columns} data={data} />
                {/* <SimpleTable columns={columns} data={data} /> */}

            </Flex>

            <Flex
                justifyContent="space-around"
            >
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    pb="4"
                >
                    <Text>
                        Patients
                    </Text>

                    <LineChart />
                </Flex>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    pb="4"
                >
                    <Text>
                        Risk Level of Patiants
                    </Text>

                    <BarChart />
                </Flex>


            </Flex>



        </GridItem>

    )
}

export default Doctor

