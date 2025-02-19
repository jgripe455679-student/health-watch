import React, { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import PieChart from "./PieChart";

interface BMIAnalysis {
  bmiCategory: string;
  recordCount: number;
  percentage: number;
}

type BMIAnalysisChartProps = {
  startDate: string;
  endDate: string;
  titleText: string;
};

const BMIAnalysisChart: React.FC<BMIAnalysisChartProps> = ({
  startDate,
  endDate,
  titleText,
}) => {
  const [data, setData] = useState<BMIAnalysis[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await get("/reports/bmi-analysis");
      setData(response.data as BMIAnalysis[]);
    } catch (error) {
      console.error("Error fetching bmi analysis data: ", error);
    }
  };

  const fetchFilteredData = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/bmi-analysis/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data as BMIAnalysis[]);
    } catch (error) {
      console.error("Error fetching bmi analysis data: ", error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchFilteredData(startDate, endDate);
    } else {
      fetchData();
    }
  }, [startDate, endDate]);

  const chartData = {
    labels: data.map((d) => d.bmiCategory),
    datasets: [
      {
        label: "% of Total Records",
        data: data.map((d) => Number(d.percentage.toFixed(2))),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(60, 192, 150, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(60, 192, 150, 1)",
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
        text: titleText,
        font: {
          size: 14,
        },
      },
    },
  };

  return <PieChart data={chartData} options={options} />;
};

export default BMIAnalysisChart;
