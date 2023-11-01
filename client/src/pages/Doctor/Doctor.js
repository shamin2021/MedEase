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
  FaAngleRight,
} from "react-icons/fa6";
import CurveLine from "../../components/CurveLine";
import Calendar from "react-calendar";
import "react-circular-progressbar/dist/styles.css";
import { format } from "date-fns";

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
        get(`/dashboard/doctor/${userId}`, setDashboardData);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    }, []);

    const labels = dashboard.meetCounts?.map((item) => item[0]);
    const meetCounts = dashboard.meetCounts?.map((item) => item[1]);

    function formatDate(datetimeString) {
      const date = new Date(datetimeString);
      const formattedTime = format(date, "haaaa");
      return formattedTime;
    }
    

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4 mt-[2%]">
            <div className="font-bold ">Hello Doctor {dashboard.user},</div>
            <div className=" text-[21px] text-[#707070]">
              These are the appointment statistics you have for today
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
                    Patients Today
                  </div>
                </div>
                <div className="bg-[#e4ebf5] text-center shadow-md rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.physicalMeet}{" "}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    HLC visits
                  </div>
                </div>
                <div className=" text-center bg-[#e4ebf5] rounded-lg p-3 m-1">
                  <div className="font-bold text-center">
                    {dashboard.virtualMeet}
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    Online Consultations
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
            <Flex className="w-auto m-3 mb-0">
              <div className="">
                <CurveLine labels={labels} dataset={meetCounts} />
              </div>
            </Flex>
            <Flex className="w-full m-3 mb-0 mr-0 mt-1">
              <div className="m-0">
                <div className="text-[20px]">Your Appointments Today</div>
                <Flex className="w-[500px] p-1 m-1 rounded-lg">
                  <div className="w-2/5 text-[17px] m-1">Patient</div>
                  <div className="w-1/5 text-[17px] m-1 ml-0">Consult </div>
                  <div className="w-1/5 text-[17px] text-center m-1 ">Time</div>
                  <div className="w-1/5 h-5 text-[17px] text-center m-1">
                    Risk
                  </div>
                </Flex>
                <hr />
                <div className=" h-60 overflow-y-scroll">
                  {dashboard.todayMeetings?.map((item, index) => (
                    <div key={index}>
                      <Flex className="w-[500px] p-1 m-1">
                        <Flex flexDirection="row" className="w-full">
                          <div className="w-2/5 text-[17px] text-[#6b6b6b] m-1">
                            {item[0]}
                            {item[1]}
                          </div>
                          <div className="w-1/5 text-[17px] m-1">Online </div>
                          <div className="w-1/5 text-[17px] text-[#6b6b6b] m-1 text-center">
                            {formatDate(item[2])}
                          </div>
                          <div className="w-1/5 h-5 text-[17px] text-[#6b6b6b]  m-1 bg-[#ffc0c0] text-center rounded-md">
                            {item[3]}
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
            <div className="text-[20px] m-3">
              Your HLC visits Today 
            </div>
            {dashboard.todaysPhysicalVisits?.map((item, index) => (
              <div key={index}>
                <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
                  <Flex flexDirection="column" className="w-3/4 ml-1">
                    <div className="text-[17px] text-[#6b6b6b]">{item[0]}</div>
                    <div className="text-[17px] text-[#6b6b6b]">
                      {formatDate(item[1])} - {formatDate(item[2])}
                    </div>
                  </Flex>
                  <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
                </Flex>
              </div>
            ))}
          </div>
        </div>
      </Flex>
    </GridItem>
  );
};

export default Pstient;
