// import React from 'react';


// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale } from 'chart.js';
// import { Pie, Chart } from 'react-chartjs-2';
// import { Flex } from '@chakra-ui/react';

// ChartJS.register(
//   ArcElement
// );

// const PieChart = () => {

//   var data = {

//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   };

//   // var options = {
//   //   maintainAspectRatio: false,
//   //   scales: {
//   //   },
//   //   legend: {
//   //     labels: {
//   //       fontSize: 25,
//   //     },
//   //   },
//   // }

//   var options = {
//     maintainAspectRatio: false,
//     scales: {},
//     legend: {
//       labels: {
//         fontSize: 25,
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'My Doughnut Chart',
//         font: {
//           size: 30,
//           weight: 'bold'
//         }
//       },
//     },
//   };

//   return (
//     <Flex h="10rem" >
//       <Pie
//         data={data}
//         options={options}
//         h="100px"
//       />
//     </Flex>
//   )
// }

// export default PieChart;

import React from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';

ChartJS.register(ArcElement);

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontSize: 16,
        },
      },
      title: {
        display: true,
        text: 'My Pie Chart',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
    },
    interaction: {
      mode: 'index',
    },
  };

  return (
    <Flex h="20rem">
      <Pie data={data} options={options} />
    </Flex>
  );
};

export default PieChart;
