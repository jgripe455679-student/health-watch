import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

type HorizontalBarChartProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  options,
}) => {
  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
