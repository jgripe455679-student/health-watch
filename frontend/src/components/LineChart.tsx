import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

type LineChartProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
};

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;
