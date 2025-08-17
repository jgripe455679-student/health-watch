import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import DoughnutChart from "./DoughnutChart";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type DemographicsAnalysisChartProps = {
  titleText: string;
  data: DemographicsAnalysis[];
};

export interface DemographicsAnalysis {
  ageGroup: string;
  percentage: number;
}

const DemographicsAnalysisChart: React.FC<DemographicsAnalysisChartProps> = ({
  titleText,
  data,
}) => {
  const chartData: ChartData<"doughnut"> = {
    labels: data.map((d) => d.ageGroup),
    datasets: [
      {
        label: "Percentage of Profiles",
        data: data.map((d) => d.percentage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(60, 192, 150, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(60, 192, 150, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: titleText,
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.formattedValue || "";
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };
  return <DoughnutChart data={chartData} options={options} />;
};

export default DemographicsAnalysisChart;
