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
import React, { useEffect, useState } from "react";
import {
  FaUserDoctor,
  FaAngleRight,
  FaVialCircleCheck,
  FaHeartCircleCheck,
} from "react-icons/fa6";
import CurveLine from "../../components/CurveLine";
import Calendar from "react-calendar";
import PieChart from "../../components/PieChart";
import "react-circular-progressbar/dist/styles.css";
import DonutCh from "../../components/Donut";

import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Pstient = () => {
  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const [userId, setUserId] = useState(auth.user_id);
  const [dashboard, setDashboardData] = useState([]);

  useEffect(() => {
    try {
      get(`/dashboard/admin/${userId}`, setDashboardData);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, []);

  const labels = dashboard.meetCount?.map((item) => item[0]);
  const meetCounts = dashboard.meetCount?.map((item) => item[1]);

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4 mt-[2%]">
            <div className="font-bold ">Admin,</div>
            <div className=" text-[21px] text-[#707070]">
              These are the statistics for today {dashboard.hlcPatient}{" "}
            </div>
          </Flex>

          <Flex className="mb-0 mt-[1%]">
            <Flex className="w-full mt-[1%] bg-white rounded-2xl">
              <div className="w-full grid grid-cols-3">
                <div className=" bg-[#e4ebf5] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.patientsCount}
                  </div>
                  <div className="text-center text-[20px] text-[#707070]">
                    Patients Registered
                  </div>
                </div>
                <div className=" text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.doctorsCount}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Doctors
                  </div>
                </div>
                <div className="text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.hlcCount}
                  </div>
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
                <PieChart
                  data1={dashboard.healthyCount}
                  data2={dashboard.highRiskCount}
                />
                <div className=" m-auto">
                  <div className="text-[20px] text-center mt-2">
                    Patient Risk
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    High Risk {dashboard.highRiskCount}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    Healthy {dashboard.healthyCount}
                  </div>
                </div>
              </Flex>
            </Flex>
            <Flex className="w-auto m-3 mb-0">
              <div className="">
                <CurveLine labels={labels} dataset ={meetCounts}/>
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
                  {dashboard.hlcPatient?.map((item, index) => (
                    <div key={index}>
                      <Flex className="w-[300px] p-1 m-1">
                        <Flex flexDirection="row" className="w-full">
                          <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                            {item[0]} <br /> {item[1]}
                          </div>
                          <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#e0e0e0] text-center rounded-md">
                            {item[2]}
                          </div>
                        </Flex>
                      </Flex>
                      <hr />
                    </div>
                  ))}
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
                <div className="text-[17px] text-[#6b6b6b]">
                  {dashboard.physicalMeet}
                </div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">
                  Physical Consultations
                </div>
                <div className="text-[17px] text-[#6b6b6b]">
                  {dashboard.virtualMeet}
                </div>
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
