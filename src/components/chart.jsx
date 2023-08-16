// ChartComponent.jsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Chart = ({categories, data, type }) => {
  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: 'Sales',
        data: data,
      },
    ],
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type={type}
        height={250}
      />
    </div>
  );
};

export default Chart;
