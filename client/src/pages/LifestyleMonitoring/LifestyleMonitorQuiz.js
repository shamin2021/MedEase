import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Progress,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GridItem } from "@chakra-ui/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { NAVBARHEIGHT } from "../../components/NavBar";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const percentage = 66;

function InputGeneral(props) {
  return (
    <div className="mt-2 text-[18px] ">
      <div className="flex  mb-2">
        <div className="flex w-3/4">
          {props.type === "Weekly" ? (
            <input type="checkbox" className="mr-3 w-[18px]"></input>
          ) : (
            ""
          )}
          <div className="text-[#797878] p-1 ">{props.name}</div>
        </div>
        <div className="text-[#797878] w-1/5 bg-primary p-1 rounded-md text-center">
          {" "}
          {props.type === "Weekly" ? "Weekly" : "Daily"}
        </div>
      </div>
      {props.type === "Weekly" ? (
        ""
      ) : (
        <>
          {daysOfWeek.map((day, index) => (
            <div className="flex w-3/4">
              <input type="checkbox" className="mr-3 w-[15px]"></input>
              <div className="text-[#797878]">{day}</div>
            </div>
          ))}
        </>
      )}

      <hr className="mt-2"></hr>
    </div>
  );
}

const LifestyleMonitorQuiz = () => {
  const [userId, setUserId] = useState(102); // Temporary user id
  const [assignedRecommendations, setAssignedRecommendations] = useState([]);

  const { get, post } = useAxiosMethods();

  const getAssignedRecommendations = async () => {
    try {
      get(
        `/assignedRecommendation/patient/${userId}`,
        setAssignedRecommendations
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAssignedRecommendations();
  }, []);

  return (
    <GridItem colSpan={6} mx={4} mt={NAVBARHEIGHT}>
      <div className=" py-1 bg-primary min-h-screen">
        <div className="flex mx-auto">
          <div className="h-3/4 w-3/4 m-3 bg-white mt-5 rounded-md p-5 ">
            <div className="text-[1rem] m-2 font-medium font-poppins">
              Weekly Quiz
            </div>
            <div className="m-4 mt-1 mb-1">
              <Tabs
                position="relative"
                fontSize={1}
                fontFamily={("Poppins", "sans-serif")}
              >
                <TabList>
                  <Tab fontSize={15} borderBottom={0} paddingLeft={0}>
                    Diet
                  </Tab>
                  <Tab fontSize={15} borderBottom={0}>
                    Exercise
                  </Tab>
                  <Tab fontSize={15} borderBottom={0}>
                    CheckUp
                  </Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                  w={14}
                />
                <TabPanels>
                  <TabPanel padding={2}>
                    <div>
                      {assignedRecommendations.map((recommendation) => {
                        return (
                          <InputGeneral
                            name={recommendation.recommendation}
                            type={recommendation.frequency}
                          ></InputGeneral>
                        );
                      })}
                      <div className=" text-right">
                        <button className="bg-secondary text-[15px] w-1/5 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 ">
                          Next
                        </button>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel padding={2}>
                    <div>sas</div>
                  </TabPanel>
                  <TabPanel padding={2}>
                    <div>sas</div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
          <div className="flex flex-col items-center h-3/4 w-1/4 m-3 bg-white mt-5 rounded-md p-5">
            <div className="text-[1rem] text-center m-2 font-medium font-poppins">
              Progress
            </div>
            <div className="h-3/4 m-3 max-w-[200px] justify-center align-middle">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
              <div className="text-[16px] text-center m-2 font-medium font-poppins">
                Week <br /> Jun 1 - Jun 7
              </div>
              <div className=" mt-4">
                <div className="m-1">
                  <div className="text-[16px] font-poppins m-1">Diet</div>
                  <Progress value={70} height="10px" rounded="5px" />
                </div>
                <div className="m-1">
                  <div className="text-[16px] font-poppins m-1 mt-2">
                    Exercise
                  </div>
                  <Progress value={40} height="10px" rounded="5px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridItem>
  );
};

export default LifestyleMonitorQuiz;
