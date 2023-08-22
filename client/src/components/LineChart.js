// import React from 'react';


// import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
// import { Line, Chart } from 'react-chartjs-2';
// import { Flex } from '@chakra-ui/react';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement
// );

// const LineChart = () => {

//     var data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     };

//     // var options = {
//     //     maintainAspectRatio: false,
//     //     scales: {
//     //     },
//     //     legend: {
//     //         labels: {
//     //             fontSize: 25,
//     //         },
//     //     },
//     // }

//     var options = {
//         maintainAspectRatio: false,
//         scales: {},
//         legend: {
//           labels: {
//             fontSize: 25,
//           },
//         },
//         title: {
//           display: true,
//           text: 'Bar Chart Example',
//           fontSize: 30,
//           padding: 20
//         },
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'X-axis Label',
//               fontSize: 20,
//               padding: 10
//             }
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Y-axis Label',
//               fontSize: 20,
//               padding: 10
//             }
//           }
//         }
//       }

//     return (
//         <Flex h="10rem">
//             <Line
//                 data={data}
//                 options={options}
//                 h="500px"
//             />
//         </Flex>
//     )
// }

// export default LineChart;


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

const LineChart = () => {

  var data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'First Dataset',
        data: [12, 19, 3, 5, 2, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
      },
      {
        label: 'Second Dataset',
        data: [5, 8, 10, 15, 12, 20],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
      },
    ]
  };

  // var options = {
  //     maintainAspectRatio: false,
  //     scales: {
  //     },
  //     legend: {
  //         labels: {
  //             fontSize: 25,
  //         },
  //     },
  // }

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
      text: 'Bar Chart Example',
      fontSize: 30,
      padding: 20
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-axis Label',
          fontSize: 20,
          padding: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y-axis Label',
          fontSize: 20,
          padding: 10
        }
      }
    }
  }

  return (
    <Flex h="20rem" width="700px">
      <Line
        data={data}
        options={options}
        h="500px"
      />
    </Flex>
  )
}

export default LineChart;