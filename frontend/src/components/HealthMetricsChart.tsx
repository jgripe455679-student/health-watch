import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { get } from "../api/apiClient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthMetrics {
  id: number;
  recordDate: string;
  heightMean: number;
  heightMedian: number;
  heightStd: number;
  weightMean: number;
  weightMedian: number;
  weightStd: number;
  systolicMean: number;
  systolicMedian: number;
  systolicStd: number;
  diastolicMean: number;
  diastolicMedian: number;
  diastolicStd: number;
}

const HealthMetricsChart: React.FC = () => {
  const [data, setData] = useState<HealthMetrics[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await get("/reports/health-metrics");
        setData(response.data as HealthMetrics[]);
      } catch (error) {
        console.error("Error fetching health metrics data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => new Date(d.recordDate).toLocaleDateString()),
    datasets: [
      {
        label: "Average Systolic Pressure",
        data: data.map((d) => d.systolicMean),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "Average Diastolic Pressure",
        data: data.map((d) => d.diastolicMean),
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
      {
        label: "Average Height",
        data: data.map((d) => d.heightMean),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
      },
      {
        label: "Average Weight",
        data: data.map((d) => d.weightMean),
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
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
        text: "Monthly Averages of Height, Weight, and Blood Pressure",
      },
    },
  };
  return isLoading ? (
    <span className="loading loading-spinner loading-xs text-primary"></span>
  ) : (
    <div className="relative w-full h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HealthMetricsChart;
