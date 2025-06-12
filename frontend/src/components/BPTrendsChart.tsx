import { ChartOptions } from "chart.js";
import React from "react";
import useFetchBPTrends from "../hooks/useFetchBPTrends";
import LineChart from "./charts/LineChart";

type BPTrendsProps = {
  startDate: string;
  endDate: string;
  titleText: string;
};

const BPTrendsChart: React.FC<BPTrendsProps> = ({
  startDate,
  endDate,
  titleText,
}) => {
  const { data } = useFetchBPTrends(startDate, endDate);

  const chartData = {
    labels: data.map((d) => new Date(d.recordDate).toLocaleDateString()),
    datasets: [
      {
        label: "Average Systolic",
        data: data.map((d) => d.systolicMean),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Average Diastolic",
        data: data.map((d) => d.diastolicMean),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleText,
        font: {
          size: 14,
        },
      },
    },
  };

  return <LineChart data={chartData} options={options} />;
};

export default BPTrendsChart;
