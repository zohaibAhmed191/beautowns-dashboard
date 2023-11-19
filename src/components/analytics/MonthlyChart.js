import React from "react";
import Chart from "react-apexcharts";

const MonthlyChart = () => {
  const chartData = {
    options: {
      chart: {
        id: "basic-line-chart",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
    series: [
      {
        name: "Series 1",
        data: [30, 40, 25, 50, 49, 21, 70, 91, 46],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="100%"
      />
    </div>
  );
};

export default MonthlyChart;
