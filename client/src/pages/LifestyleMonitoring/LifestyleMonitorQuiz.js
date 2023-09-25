import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Progress,
  Checkbox,
} from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GridItem } from "@chakra-ui/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { NAVBARHEIGHT } from "../../components/NavBar";

const daysOfWeek = [
  { day_num: 0, name: "Sunday" },
  { day_num: 1, name: "Monday" },
  { day_num: 2, name: "Tuesday" },
  { day_num: 3, name: "Wednesday" },
  { day_num: 4, name: "Thursday" },
  { day_num: 5, name: "Friday" },
  { day_num: 6, name: "Saturday" },
];

const recommendationTypes = [
  { id: 1, name: "Diet" },
  { id: 2, name: "Exercise" },
  { id: 3, name: "CheckUp" },
];

function InputGeneral(props) {
  const recommendation = props.recommendation;
  const completedQuizzes = props.completedQuizzes;

  // get all completed quizzes for this recommendation
  const completedQuiz = completedQuizzes.filter(
    (quiz) => quiz.assignedRecommendationId === recommendation.recommendation_id
  );

  return (
    <div className="mt-2 text-[18px] ">
      <div className="flex  mb-2">
        <div className="flex w-3/4">
          {recommendation.frequency === "Weekly" ? (
            <Checkbox
              isChecked={completedQuiz.length > 0}
              onChange={() =>
                props.handleCheck(recommendation.recommendation_id, 0)
              }
              className="mr-3 w-[18px]"
            />
          ) : (
            ""
          )}
          <div className="text-[#797878] p-1 ">
            {recommendation.recommendation}
          </div>
        </div>
        <div className="text-[#797878] w-1/5 bg-primary p-1 rounded-md text-center">
          {" "}
          {recommendation.frequency === "Weekly" ? "Weekly" : "Daily"}
        </div>
      </div>
      {recommendation.frequency === "Weekly" ? (
        ""
      ) : (
        <>
          {daysOfWeek.map((day, index) => (
            <div className="flex w-3/4" key={day.day_num}>
              <Checkbox
                id={day.day_num}
                isChecked={
                  completedQuiz.length > 0 &&
                  completedQuiz.filter((quiz) => quiz.dayNumber === day.day_num)
                    .length > 0
                }
                onChange={() =>
                  props.handleCheck(
                    recommendation.recommendation_id,
                    day.day_num
                  )
                }
                className="mr-3 w-[15px]"
              />
              <div className="text-[#797878]">{day.name}</div>
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
  const [state, setState] = useState(null);
  const [quizData, setQuizData] = useState(null); // {completedQuizzes: [], recommendations: []}
  const [assignedRecommendations, setAssignedRecommendations] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [totalRecommendations, setTotalRecommendations] = useState(0); // total number of recommendations for this week
  const [completedRecommendations, setCompletedRecommendations] = useState(0); // total number of completed recommendations for this week

  const [percentage, setPercentage] = useState(0); // percentage of completed recommendations for this week

  const { get, post } = useAxiosMethods();

  const getAssignedRecommendations = async () => {
    try {
      get(`/completeQuiz/${userId}/4`, setQuizData);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotalRecommendations = (assignedRecommendations) => {
    let total = 0;
    assignedRecommendations.forEach((recommendation) => {
      if (recommendation.frequency === "Weekly") {
        total += 1;
      } else {
        total += 7;
      }
    });
    return total;
  };

  const handleMarkComplete = async (recommendationId, day_num) => {
    const data = {
      assigenedUserId: userId,
      assignedRecommendationId: recommendationId,
      weekNumber: 4,
      dayNumber: day_num,
    };

    try {
      post("/completeQuiz/mark", data, setState);
      getAssignedRecommendations(); // ToDo: This is a temporary fix. Need to update the state of completedQuizzes
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAssignedRecommendations();
  }, []);

  useEffect(() => {
    setPercentage(
      Math.round((completedRecommendations / totalRecommendations) * 100)
    );
  }, [completedRecommendations, totalRecommendations]);

  useEffect(() => {
    if (quizData != null && quizData.recommendations !== undefined) {
      setAssignedRecommendations(quizData.recommendations);
      setTotalRecommendations(
        calculateTotalRecommendations(quizData.recommendations)
      );
    }

    if (quizData != null && quizData.completedQuizzes !== undefined) {
      setCompletedQuizzes(quizData.completedQuizzes);
      setCompletedRecommendations(quizData.completedQuizzes.length);
    }
  }, [quizData]);

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
                        <div>
                          {assignedRecommendations
                            .filter(
                              (recommendation) =>
                                recommendation.type === recommendationType.name
                            )
                            .map((recommendation) => {
                              return (
                                <InputGeneral
                                  key={recommendation.recommendation_id}
                                  recommendation={recommendation}
                                  completedQuizzes={completedQuizzes}
                                  handleCheck={handleMarkComplete}
                                ></InputGeneral>
                              );
                            })}
                          {/* <div className=" text-right">
                            <button className="bg-secondary text-[15px] w-1/5 rounded-2xl p-1 text-[#ffffff] font-semibold mt-3 ">
                              Next
                            </button>
                          </div> */}
                        </div>
                      </TabPanel>
                    );
                  })}
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
