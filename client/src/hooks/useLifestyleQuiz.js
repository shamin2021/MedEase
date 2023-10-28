import { useState } from "react";
import useAxiosMethods from "./useAxiosMethods";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { recommendationTypes } from "../constants/quizConstants";
import calculateTotalRecommendations from "../utils/calculateTotalRecommendations";
import moment from "moment";
import getQuizWeekDates from "../utils/getQuizWeekDates";

const useLifeStyleQuiz = (quiz) => {
  const { auth } = useAuth();

  const { get, post } = useAxiosMethods();
  const [quizData, setQuizData] = useState(null); // {completedQuizzes: [], recommendations: []}
  const [assignedRecommendations, setAssignedRecommendations] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [totalRecommendations, setTotalRecommendations] = useState(0); // total number of recommendations for this week
  const [completedRecommendations, setCompletedRecommendations] = useState(0); // total number of completed recommendations for this week
  const [percentage, setPercentage] = useState(0); // percentage of completed recommendations for this week
  const [dietProgress, setDietProgress] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [weekStartEnd, setWeekStartEnd] = useState("");
  const [state, setState] = useState(null);

  const [userId, setUserId] = useState(auth.user_id); // Temporary user id

  const getAssignedRecommendations = async () => {
    // if there is no quiz, get data from the backend
    if (quiz === undefined || quiz === null) {
      try {
        get(`/completeQuiz/${userId}`, setQuizData);
      } catch (err) {
        console.error(err);
      }
      
      getWeekStartEnd();
    } else {
      // if there is a quiz, get data from the quiz
      setQuizData(quiz);
      getWeekStartEnd(quiz.weekNumber);
    }
  };

  const getWeekStartEnd = async (weekNumber = null) => {
    const { startDate, endDate } = getQuizWeekDates(weekNumber);

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    const startDateF = moment(startDate).format("MMM DD");
    const endDateF = moment(endDate).format("MMM DD");

    setWeekStartEnd(`${startDateF} - ${endDateF}`);
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

  useEffect(() => {
    let dietRecommendations = [];
    let exerciseRecommendations = [];
    let dietIds = [];
    let exerciseIds = [];

    assignedRecommendations.filter((recommendation) => {
      if (recommendation.type === recommendationTypes[0].name) {
        dietRecommendations.push(recommendation);
        dietIds.push(recommendation.recommendation_id);
      } else if (recommendation.type === recommendationTypes[1].name) {
        exerciseRecommendations.push(recommendation);
        exerciseIds.push(recommendation.recommendation_id);
      }
      return null;
    });

    const totalDietRecommendations =
      calculateTotalRecommendations(dietRecommendations);

    const totalExerciseRecommendations = calculateTotalRecommendations(
      exerciseRecommendations
    );

    let completedDietRecommendations = 0;
    let completedExerciseRecommendations = 0;

    completedQuizzes.filter((quiz) => {
      // check if quiz is a diet quiz
      if (dietIds.includes(quiz.assignedRecommendationId)) {
        completedDietRecommendations += 1;
      } else if (exerciseIds.includes(quiz.assignedRecommendationId)) {
        completedExerciseRecommendations += 1;
      }
      return null;
    });

    setDietProgress(
      Math.round(
        (completedDietRecommendations / totalDietRecommendations) * 100
      )
    );

    setExerciseProgress(
      Math.round(
        (completedExerciseRecommendations / totalExerciseRecommendations) * 100
      )
    );
  }, [completedQuizzes, assignedRecommendations]);

  return {
    assignedRecommendations,
    completedQuizzes,
    totalRecommendations,
    completedRecommendations,
    percentage,
    dietProgress,
    exerciseProgress,
    weekStartEnd,
    handleMarkComplete,
    state,
  };
};

export default useLifeStyleQuiz;
