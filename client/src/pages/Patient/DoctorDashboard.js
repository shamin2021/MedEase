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
            <div className="font-bold ">Hello Doctor John,</div>
            <div className=" text-[21px] text-[#707070]">
              These are the appointment statistics you have for today
            </div>
          </Flex>

          <Flex className="mb-0 mt-[1%]">
            <Flex className="w-full mt-[1%] bg-white rounded-2xl">
              <div className="w-full grid grid-cols-4">
                <div className="bg-[#c5ff8c] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[20px] text-[#707070]">
                    Patients Today
                  </div>
                </div>
                <div className="bg-[#e4ebf5] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    HLC visits
                  </div>
                </div>
                <div className=" text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Online Consultations
                  </div>
                </div>
                <div className="text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">20 </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Physical Consultations
                  </div>
                </div>
              </div>
            </Flex>
          </Flex>

          <Flex flexDirection="column" className="w-3/4 mt-[4%]">
            <div className="text-[20px] font-semibold ml-3">
              Appointment Growth
            </div>
          </Flex>
          <Flex className="mb-0">
            {/* <Flex className="w-1/5 items-end mb-3 justify-center">
              <Flex
                flexDirection="column"
                className="w-full h-60 mx-auto p-3 ml-3"
              >
                <DonutCh />
                <div className=" m-auto">
                  <div className="text-[20px] text-center mt-2">
                    Consultations
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    Online 40%{" "}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    Physical 60%{" "}
                  </div>
                </div>
              </Flex>
            </Flex> */}
            <Flex className="w-auto m-3 mb-0">
              <div className="">
                <CurveLine />
              </div>
            </Flex>
            <Flex className="w-full m-3 mb-0 mr-0 mt-1">
              <div className="m-0">
                <div className="text-[20px]">Your Appointments Today</div>
                <Flex className="w-[500px] p-1 m-1 rounded-lg">
                  <div className="w-3/6 text-[17px] m-1">Patient</div>
                  <div className="w-1/6 text-[17px] m-1 ml-0">Consult </div>
                  <div className="w-1/6 text-[17px] text-center m-1 ">Time</div>
                  <div className="w-1/6 h-5 text-[17px] text-center m-1">
                    Risk
                  </div>
                </Flex>
                <hr />
                <div className=" h-60 overflow-y-scroll">
                  <Flex className="w-[500px] p-1 m-1">
                    <div className="w-1/6">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-5/6">
                      <div className="w-2/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> Lunawa
                      </div>
                      <div className="w-1/5 text-[17px] m-1">Online </div>
                      <div className="w-1/5 text-[17px] text-[#6b6b6b] m-1 text-center">
                        10 AM
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b]  m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[500px] p-1 m-1 ">
                    <div className="w-1/6">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-5/6">
                      <div className="w-2/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> Lunawa
                      </div>
                      <div className="w-1/5 text-[17px] m-1">Online </div>
                      <div className="w-1/5 text-[17px] text-[#6b6b6b] m-1 text-center">
                        10 AM
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[500px] p-1 m-1">
                    <div className="w-1/6">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-5/6">
                      <div className="w-2/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> Lunawa
                      </div>
                      <div className="w-1/5 text-[17px] m-1">Online </div>
                      <div className="w-1/5 text-[17px] text-[#6b6b6b] m-1 text-center">
                        10 AM
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[500px] p-1 m-1">
                    <div className="w-1/6">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-5/6">
                      <div className="w-2/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> Lunawa
                      </div>
                      <div className="w-1/5 text-[17px] m-1">Online </div>
                      <div className="w-1/5 text-[17px] text-[#6b6b6b] m-1 text-center">
                        10 AM
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
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
            <div className="text-[20px] m-3">Your HLC visits Today</div>

            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">Lunawa</div>
                <div className="text-[17px]">10 Patients</div>
                <div className="text-[17px] text-[#6b6b6b]">10 AM - 12 AM </div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">Lunawa</div>
                <div className="text-[17px]">10 Patients</div>
                <div className="text-[17px] text-[#6b6b6b]">10 AM - 12 AM </div>
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
