const moment = require("moment");

const getQuizWeekDates = (weekId) => {
  let year=2023, weekNumber=1;

  if (weekId === null || weekId === undefined) {
    const date = new Date().now;
    year = moment(date).year();
    weekNumber = moment(date).week();
  } else {
    year = Math.floor(weekId / 100);
    weekNumber = weekId % 100;
  }
  const startDate = moment()
    .year(year)
    .week(weekNumber)
    .startOf("week")
    .toDate();
  const endDate = moment().year(year).week(weekNumber).endOf("week").toDate();
  return { startDate, endDate };
};

export default getQuizWeekDates;
