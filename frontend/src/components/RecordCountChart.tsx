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
import { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import LineChart from "./LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface RecordCount {
  id: number;
  recordDate: string;
  recordCount: number;
}

interface RecordCountChartProps {
  startDate: string;
  endDate: string;
  titleText: string;
}

const RecordCountChart: React.FC<RecordCountChartProps> = ({
  startDate,
  endDate,
  titleText,
}) => {
  const [data, setData] = useState<RecordCount[]>([]);

  const fetchRecordCount = async (): Promise<void> => {
    try {
      const response = await get("/reports/record-count");
      setData(response.data as RecordCount[]);
    } catch (error) {
      console.error("Error fetching record count data: ", error);
    }
  };

  const fetchFilteredRecordCount = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/record-count/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data as RecordCount[]);
    } catch (error) {
      console.error("Error fetching record count data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async (
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchFilteredRecordCount(startDate, endDate);
      } else {
        await fetchRecordCount();
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  const chartData = {
    labels: data.map((d) => new Date(d.recordDate).toLocaleDateString()),
    datasets: [
      {
        label: "# of Visits",
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
        text: titleText,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <LineChart data={chartData} options={options} />;
};

export default RecordCountChart;
