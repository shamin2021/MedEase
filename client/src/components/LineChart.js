import React from 'react';

import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line, Chart } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const LineChart = ({labels,riskData}) => {

      var data = {
        labels: labels,
        datasets: [
          {
            label: "First Dataset",
            data: riskData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 10,
          },
        ],
      };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    title: {
      display: true,
      text: "Bar Chart Example",
      fontSize: 30,
      padding: 20,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          fontSize: 20,
          padding: 10,
        },
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Risk",
          fontSize: 20,
          padding: 10,
        },
        ticks: {
          callback: (value) => {
            // Define custom labels for the y-axis based on your data
            if (value === 0) return "PENDING";
            if (value === 1) return "MINIMAL";
            if (value === 2) return "HIGH";
            return ""; // Return an empty string for other values
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Flex height="300px" className="mt-4">
      {console.log(riskData)}
      <Line data={data} options={options} />
    </Flex>
  );
}

export default LineChart;