import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import PieChart from "./PieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DemographicsAnalysis {
  id: number;
  socioeconomicClass: string;
  profileCount: number;
  percentage: number;
}

const DemographicsAnalysisChart: React.FC = () => {
  const [data, setData] = useState<DemographicsAnalysis[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await get("/reports/demographics-analysis");
        setData(response.data as DemographicsAnalysis[]);
      } catch (error) {
        console.error("Error fetching demographics analysis data: ", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.socioeconomicClass),
    datasets: [
      {
        label: "% of Profile Count",
        data: data.map((d) => Number(d.percentage.toFixed(2))),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(60, 192, 150, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(60, 192, 150, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Socioeconomic Class Distribution Analysis",
        font: {
          size: 14,
        },
      },
    },
  };

  return <PieChart data={chartData} options={options} />;
};

export default DemographicsAnalysisChart;
