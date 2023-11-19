import React from "react";
import Chart from "react-apexcharts";

const OverAllChart = () => {
  const chartData = {
    options: {
      chart: {
        id: "spline-area-chart",
        type: "area",
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
        data: [5000, 4000, 22000, 45000, 75000, 21000, 70000, 91000, 46000],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width="100%"
      />
    </div>
  );
};

export default OverAllChart;
