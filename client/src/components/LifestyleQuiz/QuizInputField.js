import { Checkbox } from "@chakra-ui/react";
import { daysOfWeek } from "../../constants/quizConstants";

const QuizInputField = ({
  recommendation,
  completedQuizzes,
  handleCheck,
  isCheckDisabled,
}) => {
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
              isDisabled={isCheckDisabled}
              onChange={() => handleCheck(recommendation.recommendation_id, 0)}
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
                isDisabled={isCheckDisabled}
                isChecked={
                  completedQuiz.length > 0 &&
                  completedQuiz.filter((quiz) => quiz.dayNumber === day.day_num)
                    .length > 0
                }
                onChange={() =>
                  handleCheck(recommendation.recommendation_id, day.day_num)
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
};

export default QuizInputField;
