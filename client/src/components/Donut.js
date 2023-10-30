// src/DonutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DonutChart = () => {
  const data = {
    labels: ["Red", "Green"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#8698ff", "#8698ff"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;
