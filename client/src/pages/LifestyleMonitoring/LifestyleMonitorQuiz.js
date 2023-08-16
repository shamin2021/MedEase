import React from 'react'
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
    <div className="mt-2 text-[15px] ">
      <div className="flex  mb-2">
        <div className="flex w-3/4">
          {props.type == "weekly" ? (
            <input type="checkbox" className="mr-3 w-[15px]"></input>
          ) : (
            ""
          )}
          <div className="text-[#797878]">{props.name}</div>
        </div>
        <div className="text-[#797878] w-1/5 bg-primary rounded-md text-center">
          {" "}
          {props.type == "weekly" ? "Weekly" : "Daily"}
        </div>
      </div>
      {props.type == "weekly" ? (
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

      <hr></hr>
    </div>
  );
}

const LifestyleMonitorQuiz = () => {
  return (
    <GridItem colSpan={6} mx={4} mt={2}>
      <div className=" py-1 bg-primary">
        <div className="flex h-screen w-3/4 mx-auto">
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
                      <InputGeneral
                        name="Fruits and Vegetables 20g a day "
                        type="weekly"
                      ></InputGeneral>
                      <InputGeneral
                        name="Fruits and Vegetables 20g a day "
                        type="daily"
                      ></InputGeneral>
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
          <div className="h-3/4 w-1/4 m-3 bg-white mt-5 rounded-md p-5 m-3">
            <div className="text-[1rem] m-2 text-center font-medium font-poppins">
              Progress
            </div>
            <div className="h-3/4 m-3">
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
}

export default LifestyleMonitorQuiz