import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

type DoughnutChartProps = {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
