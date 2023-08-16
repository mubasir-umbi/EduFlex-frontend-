// ChartComponent.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Donut = ({labels, series}) => {
  // Sample data for the donut chart
  const chartData = {
    options: {
      chart: {
        id: 'donut-chart',
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
    series: series,
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut" // Set the type to "donut"
        height={350}
      />
    </div>
  );
};

export default Donut