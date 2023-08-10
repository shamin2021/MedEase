import React from 'react';


import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie, Chart } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';

ChartJS.register(
  ArcElement
);

const PieChart = () => {

  var data = {

    labels: ['Blue', 'Purple'],
    datasets: [{
      label: 'Progress',
      data: [60, 40],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'My Doughnut Chart',
        font: {
          size: 30,
          weight: 'bold'
        }
      },
    },
  };

  return (
    <Flex h="10rem" >
      <Pie
        data={data}
        options={options}
        h="100px"
      />
    </Flex>
  )
}

export default PieChart;