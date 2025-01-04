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
  id: number;
  department: string;
  recordDate: string;
  recordCount: number;
}

const DepartmentUsageChart: React.FC = () => {
  const [data, setData] = useState<DepartmentUsage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await get("/reports/department-usage");
        setData(response.data as DepartmentUsage[]);
      } catch (error) {
        console.error("Error fetching department usage data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map(
      (d) => `(${d.department}) ${new Date(d.recordDate).toLocaleDateString()}`
    ),
    datasets: [
      {
        label: "Department Usage",
        data: data.map((d) => d.recordCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "Department Usage Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return isLoading ? (
    <span className="loading loading-spinner loading-xs text-primary"></span>
  ) : (
    <div className="relative w-full h-96">
        <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepartmentUsageChart;
