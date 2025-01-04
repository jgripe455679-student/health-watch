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

interface RecordCount {
  id: number;
  recordDate: string;
  recordCount: number;
}

const RecordCountChart: React.FC = () => {
  const [data, setData] = useState<RecordCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await get("/reports/record-count");
        setData(response.data as RecordCount[]);
      } catch (error) {
        console.error("Error fetching record count data: ", error);
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
        label: "Number of Visits",
        data: data.map((d) => d.recordCount),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
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
        text: "Patient Visits Over Time",
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

export default RecordCountChart;
