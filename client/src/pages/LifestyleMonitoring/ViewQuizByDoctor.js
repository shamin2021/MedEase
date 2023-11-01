import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Progress,
  Box,
  Flex,
  GridItem,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NAVBARHEIGHT } from "../../components/NavBar";
import { recommendationTypes } from "../../constants/quizConstants";
import useLifeStyleQuiz from "../../hooks/useLifestyleQuiz";
import QuizInputField from "../../components/LifestyleQuiz/QuizInputField";
import { useLocation } from "react-router-dom";

const ViewQuizByDoctor = () => {
  const { state } = useLocation();
  const isCheckDisabled = true;

  const {
    assignedRecommendations,
    completedQuizzes,
    percentage,
    dietProgress,
    exerciseProgress,
    weekStartEnd,
  } = useLifeStyleQuiz(state);

  return (
    <GridItem colSpan={6}>
      <Flex
        mr={4}
        ml={{
          base: "75px",
          // lg: "300px",
        }}
        pt={NAVBARHEIGHT}
        mt={-1}
        pb={3}
        flexGrow={1}
        flexDir={{
          base: "column",
          xl: "row",
        }}
        className="min-h-screen min-w-fit bg-primary"
      >
        <Box flex={3} p={5} mt={5} rounded={"md"} bgColor={"white"}>
          <Box className="text-[1rem] m-2 font-medium font-poppins">
            Weekly Quiz
          </Box>
          <Box className="m-4 mt-1 mb-1">
            <Tabs
              position="relative"
              fontSize={1}
              fontFamily={("Poppins", "sans-serif")}
            >
              <TabList>
                {recommendationTypes.map((recommendationType) => {
                  return (
                    <Tab
                      fontSize={15}
                      borderBottom={0}
                      key={recommendationType.id}
                    >
                      {recommendationType.name}
                    </Tab>
                  );
                })}
              </TabList>

              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                w={14}
              />
              <TabPanels>
                {recommendationTypes.map((recommendationType) => {
                  return (
                    <TabPanel padding={2} key={recommendationType.id}>
                      <Box>
                        {assignedRecommendations.filter(
                          (recommendation) =>
                            recommendation.type === recommendationType.name
                        ).length > 0 ? (
                          assignedRecommendations
                            .filter(
                              (recommendation) =>
                                recommendation.type === recommendationType.name
                            )
                            .map((recommendation) => {
                              return (
                                <QuizInputField
                                  key={recommendation.recommendation_id}
                                  recommendation={recommendation}
                                  completedQuizzes={completedQuizzes}
                                  isCheckDisabled={isCheckDisabled}
                                ></QuizInputField>
                              );
                            })
                        ) : (
                          <Box className="text-center text-[20px] text-[#797878] font-medium font-poppins">
                            No {recommendationType.name.toLowerCase()}{" "}
                            recommendations for this week
                          </Box>
                        )}
                        {/* <Box className=" text-right">
                            <button className="bg-secondary text-[15px] w-1/5 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 ">
                              Next
                            </button>
                          </Box> */}
                      </Box>
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
        <Box className="flex flex-col items-center h-3/4 w-1/4 m-3 bg-white mt-5 rounded-md p-5">
          <Box className="text-[1rem] text-center m-2 font-medium font-poppins">
            Progress
          </Box>
          <Box className="h-3/4 m-3 max-w-[200px] justify-center align-middle">
            <CircularProgressbar
              value={percentage ? percentage : 0}
              text={`${percentage ? percentage : 0}%`}
            />
            <Box className="text-[16px] text-center m-2 font-medium font-poppins">
              Week <br /> {weekStartEnd}
            </Box>
            <Box className=" mt-4">
              <Box className="m-1">
                <Box className="text-[16px] font-poppins m-1">Diet</Box>
                <Progress value={dietProgress} height="10px" rounded="5px" />
              </Box>
              <Box className="m-1">
                <Box className="text-[16px] font-poppins m-1 mt-2">
                  Exercise
                </Box>
                <Progress
                  value={exerciseProgress}
                  height="10px"
                  rounded="5px"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default ViewQuizByDoctor;
