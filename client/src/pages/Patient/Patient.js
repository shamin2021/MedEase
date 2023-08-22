// import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
// import { FiLogOut } from 'react-icons/fi';
// import { HiSearch } from 'react-icons/hi';
// import React from 'react'

// import CommonCard from '../../components/CommonCard'
// import BarChart from '../../components/BarChart'
// import SimpleTable from '../../components/Table/SimpleTable'


// const Patient = () => {
//   const [searchQuery, setSearchQuery] = React.useState("");

//   const handleSearch = () => {
//     console.log(`Searching for: ${searchQuery}`);
//   };
//   return (
//     <GridItem
//       colSpan={6}
//       rowSpan={1}
//       borderRadius="lg"
//       p="4"

//     // background="blue.300"
//     >
//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="flex-end"
//         pb="25"
//       >
//         <Input
//           w="400px"
//           type="text"
//           placeholder="Search"
//           borderRadius="lg"
//           border="2px solid #909090"
//           size="sm"
//           mr="3"
//           pl="10"
//           pr="3"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Button
//           colorScheme="teal"
//           // size="sm"
//           leftIcon={<HiSearch />}
//           onClick={handleSearch}
//         >
//         </Button>

//       </Flex>

//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing={10}
//         pb="4"
//       // bg="blue.200"
//       >
//         <CommonCard title="Today's Appointments" description={10} />
//         <CommonCard title="Last Week Patiants" description={140} />
//         <CommonCard title="Last Week Patiants" description={140} />
//         <CommonCard title="Last Week Patiants" description={140} />

//       </Flex>

//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing={10}
//         pb="4"
//       >

//         <SimpleTable />
//         <SimpleTable />

//       </Flex>

//       <Flex
//         justifyContent="space-around"
//       >
//         <Flex
//           flexDirection="column"
//           alignItems="center"
//           pb="4"
//         >
//           <Text>
//             Chart Title
//           </Text>

//           <BarChart />
//         </Flex>
//         <Flex
//           flexDirection="column"
//           alignItems="center"
//           pb="4"
//         >
//           <Text>
//             Chart Title
//           </Text>

//           <BarChart />
//         </Flex>


//       </Flex>



//     </GridItem >
//   )
// }

// export default Patient

import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import React from 'react'

import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import SimpleTable from '../../components/Table/SimpleTable'


const Pstient = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName' },
    { header: 'Position', accessor: 'position' },
    { header: 'Department', accessor: 'department' },
    // { header: 'Department 1', accessor: 'department1' },
    // { header: 'Department 1', accessor: 'department1' },
  ];

  const data = [
    { employeeName: 'Dr. P. Jayamanna', position: 'Chief Medical Officer', department: 'Medical Department' },
    { employeeName: 'Mrs. V. Warnakulasooriya', position: 'Nurse', department: 'Nursing Department' },
    { employeeName: 'Ms. D. Jayasinghe', position: 'Administrative Assistant', department: 'Administration Department' },

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
      {/* <Flex
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

            </Flex> */}

      <Flex
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={10}
        pb="4"
        pt="20"
      // bg="blue.200"
      >
        <CommonCard title="Last Appointments Date" description={"1st Aug"} />
        <CommonCard title="Next Appointments Date" description={"10th Nov"} />

        <CommonCard title="Risk Level" description={" MINIMAL"} />
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

        {/* <SimpleTable columns={columns} data={data} /> */}
        {/* <SimpleTable columns={columns1} data={data1} />  */}

      </Flex>

      <Flex
        justifyContent="space-around"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          pb="4"
        >
          <Text fontSize={30} fontWeight={"Bold"}>
            Your Progress
          </Text>

          <LineChart />
        </Flex>
        {/* <Flex
                    flexDirection="column"
                    alignItems="center"
                    pb="4"
                >
                    <Text>
                        Chart Title
                    </Text>

                    <BarChart />
                </Flex> */}


      </Flex>



    </GridItem >
  )
}

export default Pstient