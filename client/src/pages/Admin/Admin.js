import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text, Card } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import React from 'react'

import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import PieChart from '../../components/PieChart'
import SimpleTable from '../../components/Table/SimpleTable'


const Admin = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const columns1 = [
    { header: 'HLC Name', accessor: 'employeeName' },
    { header: 'Address', accessor: 'position' },
    { header: 'Contact Number', accessor: 'department' },
    // { header: 'Department 1', accessor: 'department1' },
    // { header: 'Department 1', accessor: 'department1' },
  ];

  const data1 = [
    { employeeName: 'Divlapitiya HLC', position: 'Dunagaha, Divlapitiya', department: '031 2246262' },
    { employeeName: 'Piliyandala HLC', position: '50 Old Road Maharagama, Boralesgamuwa', department: '011 3648862' },
    { employeeName: 'Nugegoda HLC', position: 'Madiwela Rd, Nugegoda', department: '022 7846562' },

    // Add more data as needed
  ];

  const columns2 = [
    { header: 'Doctors', accessor: 'employeeName' },
    { header: 'Assigned HLC', accessor: 'position' },
    { header: 'Contact Number', accessor: 'department' },
    // { header: 'Department 1', accessor: 'department1' },
    // { header: 'Department 1', accessor: 'department1' },
  ];

  const data2 = [
    { employeeName: 'Dr. Kamal Perera', position: 'Nugegoda HLC', department: '031 2246262' },
    { employeeName: 'Dr. Hasala Disanayaka', position: 'Piliyandala HLC', department: '011 3648862' },
    { employeeName: 'Dr. Hasala Disanayaka ', position: 'Divlapitiya HLC', department: '022 7846562' },

    // Add more data as needed
  ];

  const doctors = [
    { name: "Dr. Kamal Perera", online: true },
    { name: "Dr. Nimal Smith", online: false },
    { name: "Dr. Hasala Disanayaka", online: true },
    { name: "Dr. Samitha De Silva", online: false },
    { name: "Dr. Proboth Madusanka", online: true },
    { name: "Dr. Nimala Siriwardana", online: true },
    // Add more doctors as needed
  ];
  return (
    <GridItem
      colSpan={6}
      rowSpan={1}
      borderRadius="lg"
      p="4"
      mr="4"
      ml="4"

    // background="blue.300"
    >
      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={10}
        pb="4"
      // bg="blue.200"
      >
        <CommonCard title="Total Number of Patients in the System" description={"5 210"} />
        <CommonCard title="New Registration" description={12} />
        <CommonCard title="Last Week Patiants" description={35} />
        <CommonCard title="Active HLCs" description={140} />
        {/* <CommonCard title="Last Week Patiants" description={140} /> */}

      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        spacing={10}
        pb="4"
      >

        <SimpleTable columns={columns1} data={data1} />


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
            Risk Level of Patiants
          </Text>

          <BarChart />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Text>

          </Text>

          <PieChart />
        </Flex>

        <Flex direction="column">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            List of Doctors
          </Text>
          {doctors.map((doctor, index) => (
            <Flex key={index} alignItems="center" mb={2}>
              <Box
                w={2}
                h={2}
                borderRadius="50%"
                bg={doctor.online ? "green.500" : "red.500"}
                mr={2}
              // position="absolute"
              // left={'0'}
              // top={'30'}
              />
              <Text>{doctor.name}</Text>
            </Flex>
          ))}
        </Flex>


      </Flex>

      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={10}
        pb="4"
      >
        <SimpleTable columns={columns2} data={data2} />
        {/* <SimpleTable columns={columns} data={data} /> */}

      </Flex>



    </GridItem >
  )
}

export default Admin