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
import logo from "../../assets/human_outline.png";
import React, { useEffect, useState } from "react";
import {
  FaUserDoctor,
  FaAngleRight,
  FaVialCircleCheck,
  FaHeartCircleCheck,
} from "react-icons/fa6";

import LineChart from "../../components/LineChart";
import Calendar from "react-calendar";

import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Patient = () => {
  
  const { get } = useAxiosMethods();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const [userId, setUserId] = useState(auth.user_id);
  const [dashboard, setDashboardData] = useState([]);

    useEffect(() => {
      try {
        get(`/dashboard/patient/${userId}`, setDashboardData);
        console.log("rsi");
        console.log(dashboard);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    }, []);

    
    let bgColorClass;

    if (dashboard.lastSelfAssessment?.risk === "PENDING") {
      bgColorClass = "bg-[#fbfbfb]";
    } else if (dashboard.lastSelfAssessment?.risk === "HIGH") {
      bgColorClass = "bg-[#fdc2c2]";
    }else{
      bgColorClass = "bg-[#d5ffcf]";
    }


    const labels = dashboard.riskArray?.map((item) => item[0]);
    const riskData = dashboard.riskArray?.map((item) => {
      if (item[1] === "PENDING") {
        return 0;
      } else if (item[1] === "HIGH") {
        return 2;
      } else if (item[1] === "MINIMAL") {
        return 1;
      }
      return item[1]; // If none of the conditions match, return the original value.
    });

    console.log(labels,riskData);

  return (
    <GridItem colSpan={6} rowSpan={1} borderRadius="lg" p="4">
      <Flex className=" mt-[4%]">
        <div className="w-3/4 h-auto m-3 mt-0  bg-white shadow-xl rounded-2xl p-[4%] pt-[2%] ">
          <Flex flexDirection="column" className="w-3/4">
            <div className="font-bold ">Hi {dashboard.user},</div>
            <div className=" text-[21px] text-[#707070]">
<<<<<<< HEAD
              This is your health Check for today {labels}
              {riskData}
=======
              These are the statistics for today
>>>>>>> 2fe210cbbb6a51ffea5fda252142a9011bb87b2d
            </div>
          </Flex>

          <Flex className="mb-0 mt-[2%]">
            <Flex
              flexDirection="column"
              className={`w-1/5 ${bgColorClass} shadow-md rounded-lg p-3`}
            >
              <div className=" m-auto">
                <div className="font-bold text-center">
                  {dashboard.lastSelfAssessment?.risk}
                </div>
                <div className="text-center text-[18px] text-[#707070]">
                  Health Status
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
                <DonutCh />
                <div className=" m-auto">
                  <div className="text-[20px] text-center mt-2">
                    Patient Risk
                  </div>
                  <div className="text-center text-[18px] text-[#707070]">
                    {" "}
                    High Risk 40%{" "}
                  </div>
                  <div className="w-4/5 text-[20px]">
                    <div className="">Current Vitals </div>
                    <hr className="mb-1" />
                    <Flex className="mt-3">
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Weight</div>
                        <div className="text-center">
                          {dashboard.medicalTest?.weight}
                        </div>
                      </div>
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Height</div>
                        <div className="text-center">
                          {dashboard.medicalTest?.height}
                        </div>
                      </div>
                      <div className="m-1 border border-1 rounded-lg p-2">
                        <div className="text-center">Waist</div>
                        <div className="text-center">
                          {dashboard.medicalTest?.waistCircumference}
                        </div>
                      </div>
                      <div className="m-1 ">
                        <div className="text-center bg-primary rounded-lg p-2 mb-1 ">
                          BMI : {dashboard.medicalTest?.bmi}
                        </div>
                        <div className="text-center bg-primary rounded-lg p-2">
                          Waist/Height :{" "}
                          {dashboard.medicalTest?.waistHeightRatio}
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
                <div className="text-[18px] text-[#707070]">
                  {dashboard.medicalTest?.fastingbloodSugar}
                </div>
                <hr />
              </div>
              <div className="mb-1">
                <div className="text-[18px] font-bold">Pressure</div>
                <div className="text-[18px] text-[#707070]">
                  {dashboard.medicalTest?.sbp}
                </div>
                <hr />
              </div>
              <div className="mb-1">
                <div className="text-[18px] font-bold">Lipid</div>
                <div className="text-[18px] text-[#707070]">
                  {dashboard.medicalTest?.lipidTg}
                </div>
                <hr />
              </div>
            </Flex>
          </Flex>

          <Flex className="parent h-auto mt-[2%] text-[20px] bg-white rounded-2xl">
            <div className="w-full grid grid-cols-5">
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Assessments</div>
                <div>{dashboard.selfAssessmentsCount}</div>
              </div>
              <div className=" text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Appointments</div>
                <div>{dashboard.appointmentsCount}</div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Lifestyle</div>
                <div></div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">HLC visits</div>
                <div></div>
              </div>
              <div className="text-center bg-[#e4ebf5] rounded-lg p-1 m-1">
                <div className="font-bold">Treatments</div>

                <div></div>
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

          <Flex className="m-3">
            <div className="">
              <Text fontSize={20} fontWeight={"Bold"}>
                Risk Assessed
              </Text>
              <LineChart
                labels={labels}
                riskData={riskData}
                className=" h-80 w-20"
              />
            </div>
          </Flex>
        </div>

        <div className="w-1/4 pb-3 m-3 mt-0 bg-white shadow-xl rounded-2xl">
          <Calendar className="m-3 pb-4 p-1" />
          <div className="m-3">
            <div className="text-[20px] m-3">Doctor Consultations Today</div>

            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
<<<<<<< HEAD
                <div className="text-[18px]">Doctors Appointment</div>
                <div className="text-[17px] text-[#6b6b6b]">
                  {dashboard.medicalTest?.medicalTestDate}
                </div>
=======
                <div className="text-[17px] text-[#6b6b6b]">
                  Online Consultations
                </div>
                <div className="text-[17px] text-[#6b6b6b]">321</div>
>>>>>>> 2fe210cbbb6a51ffea5fda252142a9011bb87b2d
              </Flex>
              <FaAngleRight className="text-2xl w-1/5 m-auto align-middle " />
            </Flex>
            <Flex className="m-3 p-3 bg-[#fafafa] rounded-lg">
              <Flex flexDirection="column" className="w-3/4 ml-1">
                <div className="text-[17px] text-[#6b6b6b]">Physical Consultations</div>
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

export default Patient

