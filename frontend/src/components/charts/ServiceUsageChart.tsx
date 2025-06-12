import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import useAggregatedByService from "../../hooks/useAggregatedByService";
import HorizontalBarChart from "./HorizontalBarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface ServiceUsage {
  recordDate: string;
  service: string;
  recordCount: number;
}

type ServiceUsageChartProps = {
  titleText: string;
  rawData: ServiceUsage[];
};

const ServiceUsageChart: React.FC<ServiceUsageChartProps> = ({
  titleText,
  rawData,
}) => {
  const data = useAggregatedByService(rawData);

  const chartData = {
    labels: data.map((d) => d.service.replace(/ *\([^)]*\) */g, "")),
    datasets: [
      {
        label: "Medical Services Usage",
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
    indexAxis: "y",
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

  return <HorizontalBarChart data={chartData} options={options} />;
};

export default ServiceUsageChart;
