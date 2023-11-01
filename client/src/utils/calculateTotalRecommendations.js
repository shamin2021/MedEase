const calculateTotalRecommendations = (assignedRecommendations) => {
  if(assignedRecommendations.length === 0){
    return 1
  }
  
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

export default calculateTotalRecommendations;