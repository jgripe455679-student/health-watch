import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { get } from "../api/apiClient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentUsage {
  department: string;
  recordCount: string;
}

type DepartmentUsageChartProps = {
  startDate: string;
  endDate: string;
};

const DepartmentUsageChart: React.FC<DepartmentUsageChartProps> = ({
  startDate,
  endDate,
}) => {
  const [data, setData] = useState<DepartmentUsage[]>([]);

  const fetchDepartmentUsage = async (): Promise<void> => {
    try {
      const response = await get("/reports/department-usage");
      setData(response.data as DepartmentUsage[]);
    } catch (error) {
      console.error("Error fetching department usage data: ", error);
    }
  };

  const fetchDepartmentUsageByDateRange = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/department-usage/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data as DepartmentUsage[]);
    } catch (error) {
      console.error("Error fetching department usage data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async (
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchDepartmentUsageByDateRange(startDate, endDate);
      } else {
        await fetchDepartmentUsage();
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  const chartData = {
    labels: data.map((d) => {
      switch (d.department) {
        case "MEDICAL & NURSING SERVICES":
          return "MED & NURSE";
        case "NUTRITION SERVICES":
          return "NUTRI";
        case "POPULATION PROGRAM SERVICES":
          return "POPU PROG";
        case "LABORATORY SERVICES":
          return "LAB";
        case "DENTAL SERVICES":
          return "DENTAL";
        default:
          return d.department;
      }
    }),
    datasets: [
      {
        label: "Department Usage",
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Department Usage Over Time",
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

  return <Bar data={chartData} options={options} />;
};

export default DepartmentUsageChart;
