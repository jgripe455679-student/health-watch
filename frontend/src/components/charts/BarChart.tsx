import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

type BarChartProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  options,
}) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
