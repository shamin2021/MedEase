import { Box, Flex, Input, Button, GridItem, Text, Heading } from '@chakra-ui/react'
import { HiSearch } from 'react-icons/hi';
import React from 'react'

import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import DoughnutChart from '../../components/DoughnutChart'
import SimpleTable from '../../components/Table/SimpleTable'


const HLC = () => {
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

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName' },
    { header: 'Position', accessor: 'position' },
    { header: 'Department', accessor: 'department' },
    // { header: 'Department 1', accessor: 'department1' },
    // { header: 'Department 1', accessor: 'department1' },
  ];

  const data = [
    { employeeName: 'Dr. Emily Johnson', position: 'Chief Medical Officer', department: 'Medical Department' },
    { employeeName: 'John Smith', position: 'Nurse', department: 'Nursing Department' },
    { employeeName: 'Sarah Williams', position: 'Administrative Assistant', department: 'Administration Department' },

    // Add more data as needed
  ];

  const doctors = [
    { name: "Dr. Kamal Perera", online: true },
    { name: "Dr. Nimal Smith", online: false },
    { name: "Dr. Hasala Disanayaka", online: true },
    { name: "Dr. Samitha De Silva", online: false },
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
        justifyContent="space-between"
        spacing={10}
        pb="4"
      // bg="blue.200"
      >
        <CommonCard title="Today's Appointments" description={10} />
        <CommonCard title="Last Week Patiants" description={140} />
        <CommonCard title="Last Week Patiants" description={140} />
        <CommonCard title="Last Week Patiants" description={140} />

      </Flex>

      <Flex
        justifyContent="space-around"
      >


        <Flex direction="column" w="10rem">
          <Text alignContent={""} fontSize="2xl" fontWeight="bold" mb={4}>
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


        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Heading>
            HLC Details
          </Heading>


          <SimpleTable columns={columns1} data={data1} />
        </Flex>


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
            Chart Title
          </Text>

          <DoughnutChart />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Text>
            Chart Title
          </Text>

          <BarChart />
        </Flex>


      </Flex>



    </GridItem>

  )
}

export default HLC
