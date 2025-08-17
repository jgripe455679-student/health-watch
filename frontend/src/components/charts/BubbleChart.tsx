import { ChartData, ChartOptions } from "chart.js";
import React from "react";
import { Bubble } from "react-chartjs-2";

type BubbleChartProps = {
  data: ChartData<"bubble">;
  options: ChartOptions<"bubble">;
};

const BubbleChart: React.FC<BubbleChartProps> = ({ data, options }) => {
  return <Bubble data={data} options={options} />;
};

export default BubbleChart;
