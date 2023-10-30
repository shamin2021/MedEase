// import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text, Card } from '@chakra-ui/react'
// import { FiLogOut } from 'react-icons/fi';
// import { HiSearch } from 'react-icons/hi';
// import React from 'react'

// import CommonCard from '../../components/CommonCard'
// import BarChart from '../../components/BarChart'
// import PieChart from '../../components/PieChart'
// import SimpleTable from '../../components/Table/SimpleTable'


// const Admin = () => {
//   const [searchQuery, setSearchQuery] = React.useState("");

//   const handleSearch = () => {
//     console.log(`Searching for: ${searchQuery}`);
//   };

//   const columns1 = [
//     { header: 'HLC Name', accessor: 'employeeName' },
//     { header: 'Address', accessor: 'position' },
//     { header: 'Contact Number', accessor: 'department' },
//     // { header: 'Department 1', accessor: 'department1' },
//     // { header: 'Department 1', accessor: 'department1' },
//   ];

//   const data1 = [
//     { employeeName: 'Divlapitiya HLC', position: 'Dunagaha, Divlapitiya', department: '031 2246262' },
//     { employeeName: 'Piliyandala HLC', position: '50 Old Road Maharagama, Boralesgamuwa', department: '011 3648862' },
//     { employeeName: 'Nugegoda HLC', position: 'Madiwela Rd, Nugegoda', department: '022 7846562' },

//     // Add more data as needed
//   ];

//   const columns2 = [
//     { header: 'Doctors', accessor: 'employeeName' },
//     { header: 'Assigned HLC', accessor: 'position' },
//     { header: 'Contact Number', accessor: 'department' },
//     // { header: 'Department 1', accessor: 'department1' },
//     // { header: 'Department 1', accessor: 'department1' },
//   ];

//   const data2 = [
//     { employeeName: 'Dr. Kamal Perera', position: 'Nugegoda HLC', department: '031 2246262' },
//     { employeeName: 'Dr. Hasala Disanayaka', position: 'Piliyandala HLC', department: '011 3648862' },
//     { employeeName: 'Dr. Hasala Disanayaka ', position: 'Divlapitiya HLC', department: '022 7846562' },

//     // Add more data as needed
//   ];

//   const doctors = [
//     { name: "Dr. Kamal Perera", online: true },
//     { name: "Dr. Nimal Smith", online: false },
//     { name: "Dr. Hasala Disanayaka", online: true },
//     { name: "Dr. Samitha De Silva", online: false },
//     { name: "Dr. Proboth Madusanka", online: true },
//     { name: "Dr. Nimala Siriwardana", online: true },
//     // Add more doctors as needed
//   ];
//   return (
//     <GridItem
//       colSpan={6}
//       rowSpan={1}
//       borderRadius="lg"
//       p="4"
//       mr="4"
//       ml="4"

//     // background="blue.300"
//     >
//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="space-between"
//         spacing={10}
//         pb="4"
//       // bg="blue.200"
//       >
//         <CommonCard title="Total Number of Patients in the System" description={"5 210"} />
//         <CommonCard title="New Registration" description={12} />
//         <CommonCard title="Last Week Patiants" description={35} />
//         <CommonCard title="Active HLCs" description={140} />
//         {/* <CommonCard title="Last Week Patiants" description={140} /> */}

//       </Flex>

//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="center"
//         spacing={10}
//         pb="4"
//       >

//         <SimpleTable columns={columns1} data={data1} />


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
//             Risk Level of Patiants
//           </Text>

//           <BarChart />
//         </Flex>
//         <Flex
//           flexDirection="column"
//           alignItems="center"
//           pb="4"
//         >
//           <Text>

//           </Text>

//           <PieChart />
//         </Flex>

//         <Flex direction="column">
//           <Text fontSize="xl" fontWeight="bold" mb={4}>
//             List of Doctors
//           </Text>
//           {doctors.map((doctor, index) => (
//             <Flex key={index} alignItems="center" mb={2}>
//               <Box
//                 w={2}
//                 h={2}
//                 borderRadius="50%"
//                 bg={doctor.online ? "green.500" : "red.500"}
//                 mr={2}
//               // position="absolute"
//               // left={'0'}
//               // top={'30'}
//               />
//               <Text>{doctor.name}</Text>
//             </Flex>
//           ))}
//         </Flex>


//       </Flex>

//       <Flex
//         display="flex"
//         flexDirection="row"
//         alignItems="center"
//         justifyContent="space-around"
//         spacing={10}
//         pb="4"
//       >
//         <SimpleTable columns={columns2} data={data2} />
//         {/* <SimpleTable columns={columns} data={data} /> */}

//       </Flex>



//     </GridItem >
//   )
// }

// export default Admin

import {
  Box,
  Flex,
  Input,
  Button,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { HiSearch } from "react-icons/hi";
import logo from "../../assets/human_outline.png";
import patient from "../../assets/patient.jpg";
import React from "react";
import {
  FaUserDoctor,
  FaAngleRight,
  FaVialCircleCheck,
  FaHeartCircleCheck,
} from "react-icons/fa6";
import CurveLine from "../../components/CurveLine";
import Calendar from "react-calendar";
import "react-circular-progressbar/dist/styles.css";
import DonutCh from "../../components/Donut";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
const percentage = 66;

const Pstient = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4 mt-[2%]">
            <div className="font-bold ">Lunawa HLC,</div>
            <div className=" text-[21px] text-[#707070]">
              These are the statistics for today
            </div>
          </Flex>

          <Flex className="mb-0 mt-[1%]">
            <Flex className="w-full mt-[1%] bg-white rounded-2xl">
              <div className="w-full grid grid-cols-3">
                <div className=" bg-[#e4ebf5] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[20px] text-[#707070]">
                    Patients Registered
                  </div>
                </div>
                <div className=" text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Doctors
                  </div>
                </div>
                <div className="text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    HLC regsitered
                  </div>
                </div>
              </div>
            </Flex>
          </Flex>

          <Flex flexDirection="column" className="w-3/4 mt-[4%]">
            <div className="text-[20px] font-semibold ml-3">Patient Growth</div>
          </Flex>
          <Flex className="mb-0">
            <Flex className="w-1/5 items-end mb-3 justify-center">
              <Flex
                flexDirection="column"
                className="w-full h-60 mx-auto p-3 ml-3"
              >
                {/* <DonutCh /> */}
                <div className=" m-auto">
                  <div className="text-[20px] text-center mt-2">
                    Patient Risk
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    High Risk 40%{" "}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    Healthy 60%{" "}
                  </div>
                </div>
              </Flex>
            </Flex>
            <Flex className="w-auto m-3 mb-0">
              <div className="">
                <CurveLine />
              </div>
            </Flex>
            <Flex className="w-[300px] m-3 mb-0 mr-0 mt-1">
              <div className="m-0">
                <div className="text-[20px]">Patients in HLC</div>
                <Flex className="w-[300px] p-1 m-1 rounded-lg">
                  <div className="w-2/3 text-[17px] m-1">HLC</div>
                  <div className="w-1/3 h-5 text-[17px] m-1">Patients</div>
                </Flex>
                <hr />
                <div className=" w-[300px] h-60 overflow-y-scroll overflow-x-hidden">
                  <Flex className="w-[300px] p-1 m-1">
                    <Flex flexDirection="row" className="w-full">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Lunawa HLC <br /> Dr.Asith Ama
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b]  m-1 bg-[#e0e0e0] text-center rounded-md">
                        123
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[300px] p-1 m-1">
                    <Flex flexDirection="row" className="w-full">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Lunawa HLC <br /> Dr.Asith Ama
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#e0e0e0] text-center rounded-md">
                        123
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[300px] p-1 m-1">
                    <Flex flexDirection="row" className="w-full">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Lunawa HLC <br /> Dr.Asith Ama
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#e0e0e0] text-center rounded-md">
                        123
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[300px] p-1 m-1">
                    <Flex flexDirection="row" className="w-full">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Lunawa HLC <br /> Dr.Asith Ama
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#e0e0e0] text-center rounded-md">
                        123
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                </div>
              </div>
            </Flex>
          </Flex>
        </div>

        <div className="w-1/4 pb-3 m-3 mt-0 bg-white shadow-xl rounded-2xl">
          <Calendar className="m-3 pb-4 p-1" />
          <div className="m-3">
            <div className="text-[20px] m-3">Doctor Consultations Today</div>

            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">
                  Online Consultations
                </div>
                <div className="text-[17px] text-[#6b6b6b]">321</div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">
                  Physical Consultations
                </div>
                <div className="text-[17px] text-[#6b6b6b]">221</div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
          </div>
        </div>
      </Flex>
    </GridItem>
  );
};

export default Pstient;
