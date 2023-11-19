import React from "react";
import Chart from "react-apexcharts";

const ServiceChart = () => {
  const chartData = {
    options: {
      chart: {
        id: "basic-column-chart",
        type: "bar",
      },
      xaxis: {
        categories: [
          "Makup",
          "Facial",
          "Party",
          "Manicure",
          "Pedicure",
          "Melons",
          "Haricut",
          "Steaming",
          "Nail Polish",
        ],
      },
    },
    series: [
      {
        name: "Series 1",
        data: [
          // You can keep dummy values if needed
          30, 40, 25, 50, 49, 21, 70, 91, 46,
        ],
      },
    ],
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default ServiceChart;
