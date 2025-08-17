import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import useAggregation from "../../hooks/useAggregation";
import BarChart from "./BarChart";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export interface HealthConditionOccurrence {
  recordDate: string;
  healthCondition: string;
  recordCount: number;
}

type HealthConditionOccurrenceChartProps = {
  titleText: string;
  rawData: HealthConditionOccurrence[];
};

const HealthConditionOccurrenceChart: React.FC<
  HealthConditionOccurrenceChartProps
> = ({ titleText, rawData }) => {
  const data = useAggregation(rawData, "healthCondition");

  const chartData = {
    labels: data.map((d) => d.column),
    datasets: [
      {
        label: "Number of Occurrences",
        data: data.map((d) => d.recordCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
      },
    ],
    datalabels: {
      font: {
        weight: "bold",
      },
      color: "black",
      align: "end",
      anchor: "end",
    },
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
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
    },
    scales: {
      x: {
        ticks: {
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <BarChart data={chartData} options={options} />;
};

export default HealthConditionOccurrenceChart;
