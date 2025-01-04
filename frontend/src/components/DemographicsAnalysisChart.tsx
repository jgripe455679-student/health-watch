import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { get } from "../api/apiClient";

interface DemographicsAnalysis {
  id: number;
  socioeconomicClass: string;
  profileCount: number;
}

const DemographicsAnalysisChart: React.FC = () => {
  const [data, setData] = useState<DemographicsAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await get("/reports/demographics-analysis");
        setData(response.data as DemographicsAnalysis[]);
      } catch (error) {
        console.error("Error fetching demographics analysis data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.socioeconomicClass),
    datasets: [
      {
        label: "% of Profiles",
        data: data.map((d) => d.profileCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
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
        text: "Distribution of Profiles by Socioeconomic Class",
      },
    },
  };

  return isLoading ? (
    <span className="loading loading-spinner loading-xs text-primary"></span>
  ) : (
    <div className="relative w-full h-96">
        <Pie data={chartData} options={options} />
    </div>
  );
};

export default DemographicsAnalysisChart;
