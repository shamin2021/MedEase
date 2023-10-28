import React, { useEffect, useState } from "react";
import { Box, Flex, GridItem, Button, Spacer, Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { NAVBARHEIGHT } from "../../components/NavBar";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import moment from "moment";
import getQuizWeekDates from "../../utils/getQuizWeekDates";
import useAuth from "../../hooks/useAuth";
import WeekProgress from "../../components/LifestyleQuiz/WeekProgress";
import calculateTotalRecommendations from "../../utils/calculateTotalRecommendations";
import useLifeStyleQuiz from "../../hooks/useLifestyleQuiz";

// const percentage = 66;
const LifestyleDashboard = () => {
  // completeQuiz
  // /dashboard/{patient_id}/{page}
  const { get } = useAxiosMethods();
  const { auth } = useAuth();

  const [page, setPage] = useState(1);
  const [quizzes, setQuizzes] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [userId, setUserId] = useState(auth.user_id);

  const { percentage, dietProgress, exerciseProgress, weekStartEnd } =
    useLifeStyleQuiz();

  useEffect(() => {
    const getQuizzes = async () => {
      get(`/completeQuiz/dashboard/${userId}/${page}`, (response) => {
        setQuizzes(response.weeklyQuizzes);
        setIsLastPage(response.isLastPage);
      });
    };
    getQuizzes();
  }, [page, userId]);

  const showProgress = (quiz) => {
    const total = calculateTotalRecommendations(quiz.recommendations);
    const completed = quiz.completedQuizzes.length;
    const percentage = Math.round((completed / total) * 100);
    return percentage;
  };

  const handleNext = () => {
    console.log("next");
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
          <Box className="flex justify-between items-center">
            <h2 className="text-[1rem] font-bold font-poppins">
              Lifestyle Tracker
            </h2>
            <Link to={"/LifestyleQuiz"}>
              <button className="text-[0.8rem] font-poppins font-semibold rounded-md bg-primary px-10 py-2">
                Attempt Quiz
              </button>
            </Link>
          </Box>
          <hr className="my-3" />
          <Box className="m-4 mt-1 mb-1">
            <Flex>
              <Box className="text-[0.8rem] font-poppins font-semibold">
                Previous Quizzes
              </Box>
              <Spacer />
              <Flex alignItems={"center"}>
                <Button
                  size="xs"
                  color={"#797878"}
                  marginRight={2}
                  variant='ghost'
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Text fontSize={"xs"}>Page {page}</Text>
                <Button
                  size="xs"
                  color={"#797878"}
                  marginLeft={2}
                  variant='ghost'
                  onClick={handleNext}
                  isDisabled={isLastPage}
                >
                  Next
                </Button>
              </Flex>
            </Flex>
            <Box className="w-full">
              <Flex className="text-[18px] text-[#797878] font-medium text-center justify-between">
                <Box flex={3} className="w-1/4 p-2">
                  Quiz ID
                </Box>
                <Box flex={4} className="w-1/4 p-2">
                  Quiz Week
                </Box>
                <Box flex={3} className="w-1/4 p-2">
                  Progress
                </Box>
                <Box flex={3} className="w-1/4 p-2">
                  Actions
                </Box>
              </Flex>
            </Box>
            <hr className="my-1" />
            <Box className="overflow-y-auto">
              {quizzes.map((quiz) => {
                if (quiz === null || quiz.weekNumber === undefined) {
                  return <></>;
                }

                const { startDate, endDate } = getQuizWeekDates(
                  quiz?.weekNumber
                );

                const startDateF = moment(startDate).format("MMM DD");
                const endDateF = moment(endDate).format("MMM DD");

                const weekPercentage = showProgress(quiz);

                return (
                  <>
                    <Flex
                      key={quiz?.weekNumber}
                      className="text-[18px] text-[#797878] font-medium text-center justify-between"
                    >
                      <Box flex={3} className="w-1/4 p-2">
                        {quiz?.weekNumber}
                      </Box>
                      <Box
                        flex={4}
                        className="w-1/4 p-2"
                      >{`${startDateF} - ${endDateF}`}</Box>
                      <Box flex={3} className="w-1/4 p-2">
                        {weekPercentage}%
                      </Box>
                      <Box flex={3} className="w-1/4 p-2">
                        <Link to={"/LifestyleQuiz"} state={quiz}>
                          <button
                            className="btn w-1/2 bg-primary rounded-lg px-3 py-1"
                            href=""
                          >
                            View
                          </button>
                        </Link>
                      </Box>
                    </Flex>
                    <hr className="my-1" />
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>

        <hr className="m-3 mt-2"></hr>
        <WeekProgress
          percentage={percentage}
          dietProgress={dietProgress}
          exerciseProgress={exerciseProgress}
          weekDates={weekStartEnd}
          isCurrentWeek={true}
        />
      </Flex>
    </GridItem>
  );
};

export default LifestyleDashboard;
