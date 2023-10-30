import { Box, Flex, Input, Button, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import logo from "../../assets/human_outline.png";
import React from 'react'
import {
  FaUserDoctor,
  FaAngleRight,
  FaVialCircleCheck,
  FaHeartCircleCheck,
} from "react-icons/fa6";
import CommonCard from '../../components/CommonCard'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import SimpleTable from '../../components/Table/SimpleTable'
import Calendar from 'react-calendar';


const Patient = () => {

  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  const columns = [
    { header: 'Employee Name', accessor: 'employeeName' },
    { header: 'Position', accessor: 'position' },
    { header: 'Department', accessor: 'department' },
  ];

  const data = [
    { employeeName: 'Dr. P. Jayamanna', position: 'Chief Medical Officer', department: 'Medical Department' },
    { employeeName: 'Mrs. V. Warnakulasooriya', position: 'Nurse', department: 'Nursing Department' },
    { employeeName: 'Ms. D. Jayasinghe', position: 'Administrative Assistant', department: 'Administration Department' },

  ];

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4">
            <div className="font-bold ">Hi John,</div>
            <div className=" text-[21px] text-[#707070]">
              This is your health Check for today
            </div>
          </Flex>

          <Flex className="mb-0 mt-[2%]">
            <Flex
              flexDirection="column"
              className=" w-1/5 bg-[#c5ff8c] shadow-md rounded-lg p-3"
            >
              <div className=" m-auto">
                <div className="font-bold text-center">Healthy</div>
                <div className="font-bold text-center">No Risk</div>
                <div className="text-center text-[18px] text-[#707070]">
                  Health Status
                </div>
              </div>
            </Flex>

            <Flex
              flexDirection="column"
              className=" w-3/5 shadow-md rounded-lg p-3 ml-3 "
            >
              <div className="">
                <Flex>
                  <div className="w-1/5">
                    <img
                      htmlFor="select-image"
                      src={logo}
                      className="mx-auto p-1 h-[180px] "
                    />
                  </div>
                  <div className="w-4/5 text-[20px]">
                    <div className="">Current Vitals </div>
                    <hr className="mb-1" />
                    <Flex className="mt-3">
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Weight</div>
                        <div className="text-center">75kg</div>
                      </div>
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Height</div>
                        <div className="text-center">125cm</div>
                      </div>
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Waist</div>
                        <div className="text-center">25</div>
                      </div>
                      <div className="m-1 ">
                        <div className="text-center bg-primary rounded-lg p-2 mb-1 ">
                          BMI : 22
                        </div>
                        <div className="text-center bg-primary rounded-lg p-2">
                          Waist/Height : 22
                        </div>
                      </div>
                    </Flex>
                  </div>
                </Flex>
              </div>
            </Flex>

            <Flex
              flexDirection="column"
              className=" w-1/5 shadow-md rounded-lg p-3 ml-3 "
            >
              <div className="mb-1">
                <div className="text-[18px] font-bold">Blood Sugar</div>
                <div className="text-[18px] text-[#707070]">23 | Normal</div>
                <hr />
              </div>
              <div className="mb-1">
                <div className="text-[18px] font-bold">Pressure</div>
                <div className="text-[18px] text-[#707070]">18 | Normal</div>
                <hr />
              </div>
              <div className="mb-1">
                <div className="text-[18px] font-bold">Lipid</div>
                <div className="text-[18px] text-[#707070]">03 | Normal</div>
                <hr />
              </div>
            </Flex>
          </Flex>

          <Flex className="parent h-auto mt-[2%] text-[20px] bg-white rounded-2xl">
            <div className="w-full grid grid-cols-5">
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Assessments</div>
                <div>2</div>
              </div>
              <div className=" text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Appointments</div>
                <div>3</div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Lifestyle</div>
                <div>4</div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">HLC visits</div>
                <div>1</div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Treatments</div>
                <div>None</div>
              </div>
            </div>
          </Flex>

          {/* <Flex className="parent h-auto mt-[3%] bg-white border border-1 rounded-2xl">
            <div className="w-full grid grid-cols-5 divide-x m-3">
              <div className="text-center  p-1 rounded-md">
                <div>Assessments</div>
                <div>2</div>
              </div>
              <div className=" text-center">
                <div>Appointments</div>
                <div>3</div>
              </div>
              <div className="text-center">
                <div>Lifestyle</div>
                <div>4</div>
              </div>
              <div className="text-center">
                <div>Treatments</div>
                <div>None</div>
              </div>
              <div className="text-center">
                <div>HLC visits</div>
                <div>1</div>
              </div>
            </div>
          </Flex> */}

          <Flex className='m-3' >
            <div className=''>
            <Text fontSize={20} fontWeight={"Bold"}>
              Risk Assessed
            </Text>
            <LineChart className=" h-80 w-20"/>
            </div>
          </Flex>
        </div>

        <div className="w-1/4 pb-3 m-3 mt-0 bg-white shadow-xl rounded-2xl">
          <Calendar className="m-3 pb-4 p-1" />
          <div className="m-3">
            <div className="m-3">Upcoming Reminders</div>

            <Flex className="m-3 p-3 bg-[#efefef] rounded-lg">
              <FaUserDoctor className="text-2xl w-1/5 align-middle m-auto" />
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[18px]">Doctors Appointment</div>
                <div className="text-[17px] text-[#6b6b6b]">27th June</div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>

            <Flex className="m-3 p-3 bg-[#efefef] rounded-lg">
              <FaHeartCircleCheck className="text-2xl w-1/5 align-middle m-auto" />
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[18px]">Lifestyle Track</div>
                <div className="text-[17px] text-[#6b6b6b] ">27th June</div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>

            <Flex className="m-3 p-3 bg-[#efefef] rounded-lg">
              <FaVialCircleCheck className="text-2xl w-1/5 align-middle m-auto" />
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[18px]">Medical Exam</div>
                <div className="text-[17px] text-[#6b6b6b]">27th June</div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
          </div>
        </div>
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

      <Flex justifyContent="space-around">
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
    </GridItem>
  );
}

export default Patient