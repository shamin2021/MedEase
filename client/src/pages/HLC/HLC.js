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
import patient from "../../assets/patient.jpg";
import React, { useEffect, useState } from "react";
import {
  FaUserDoctor,
  FaAngleRight,
  FaVialCircleCheck,
  FaHeartCircleCheck,
} from "react-icons/fa6";
import CurveLine from "../../components/CurveLine";
import PieChart from "../../components/PieChart";
import Calendar from "react-calendar";
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
          get(`/dashboard/hlc/${userId}`, setDashboardData);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }, []);
      
      const labels = dashboard.physicalVisits?.map((item) => item[0]);
      const meetCounts = dashboard.physicalVisits?.map((item) => item[1]);

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4 mt-[2%]">
            <div className="font-bold ">Lunawa HLC,</div>
            <div className=" text-[21px] text-[#707070]">
              These are the statistics for today
              {dashboard.hlcId}
            </div>
          </Flex>

          <Flex className="mb-0 mt-[1%]">
            <Flex className="w-full mt-[1%] bg-white rounded-2xl">
              <div className="w-full grid grid-cols-3">
                <div className="bg-[#c5ff8c] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.patientCount}
                  </div>
                  <div className="text-center text-[20px] text-[#707070]">
                    Patients Registered
                  </div>
                </div>
                <div className="bg-[#e4ebf5] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.riskCount}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    High Risk Patients
                  </div>
                </div>
                <div className="text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.doctorVisits}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Doctor Visitations
                  </div>
                </div>
              </div>
            </Flex>
          </Flex>

          <Flex flexDirection="column" className="w-3/4 mt-[4%]">
            <div className="text-[20px] font-semibold ml-3">
              Patient Monitored Growth
            </div>
          </Flex>
          <Flex className="mb-0">
            <Flex className="w-1/5 items-end mb-3 justify-center">
              <Flex
                flexDirection="column"
                className="w-full h-60 mx-auto p-3 ml-3"
              >
                <PieChart
                  data1={dashboard.healthCount}
                  data2={dashboard.riskCount}
                />
                <div className=" m-auto">
                  <div className="text-[20px] text-center mt-2">
                    Patient Risk
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    High Risk {dashboard.riskCount}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    Healthy {dashboard.healthCount}
                  </div>
                </div>
              </Flex>
            </Flex>
            <Flex className="w-auto m-3 mb-0">
              <div className="">
                <CurveLine labels={labels} dataset={meetCounts} />
              </div>
            </Flex>
            <Flex className="w-[300px] m-3 mb-0 mr-0 mt-1 overflow-hidden">
              <div className="m-0">
                <div className="text-[20px]">Patients Monitored</div>
                <Flex className="w-[350px] p-1 m-1 rounded-lg">
                  <div className="w-3/5 text-[17px] m-1">Patient</div>
                  <div className="w-1/5 h-5 text-[17px] m-1">Risk</div>
                </Flex>
                <hr />
                <div className=" h-60 overflow-y-scroll">
                  <Flex className="w-[350px] p-1 m-1">
                    <div className="w-1/5">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-2/3">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> 32
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[350px] p-1 m-1">
                    <div className="w-1/5">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-2/3">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> 32
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[350px] p-1 m-1">
                    <div className="w-1/5">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-2/3">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> 32
                      </div>
                      <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b] m-1 bg-[#ffc0c0] text-center rounded-md">
                        High
                      </div>
                    </Flex>
                  </Flex>
                  <hr />
                  <Flex className="w-[350px] p-1 m-1">
                    <div className="w-1/5">
                      <img
                        htmlFor="select-image"
                        src={patient}
                        className="p-1 h-[60px] w-[60px] rounded-[100%]"
                      />
                    </div>
                    <Flex flexDirection="row" className="w-2/3">
                      <div className="w-3/5 text-[17px] text-[#6b6b6b] m-1">
                        Hasala Patient <br /> 32
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
            <div className="text-[20px] m-3">Doctor Consultations Today</div>

            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">
                  Dr.Nayana Fernando
                </div>
                <div className="text-[17px] text-[#6b6b6b]">10 AM - 12 AM </div>
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">Dr.Asith Ama</div>
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
