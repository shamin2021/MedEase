import React, { useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import canvasToImage from 'canvas-to-image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

const BarChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['HIGH', 'SIGNIFICANT', 'MODERATE', 'MILD', 'MINIMAL'],
    datasets: [{
      label: 'My First Dataset',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 10,
    }]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {},
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontSize: 15,
        },
      },
      title: {
        display: true,
        text: 'Bar Chart Example',
        fontSize: 20,
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-axis Label',
          fontSize: 15,
          padding: 10
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y-axis Label',
          fontSize: 15,
          padding: 10
        }
      }
    }
  };

  const saveAsPNG = () => {
    if (chartRef.current && chartRef.current.chartInstance.canvas) {
      const chartCanvas = chartRef.current.chartInstance.canvas;
      canvasToImage({
        canvas: chartCanvas,
        name: 'bar-chart',
        type: 'png',
        quality: 1,
      });
    } else {
      console.error("Chart canvas not found.");
    }
  };

  return (
    <Flex h="20rem" width="700px">
      <div>
        <Bar
          ref={chartRef}
          data={data}
          options={options}
        />
        <button onClick={saveAsPNG}>Save as PNG</button>
      </div>
    </Flex>
  );
};

export default BarChart;
