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
  recordDate: string;
  recordCount: number;
}

type RecordCountChartProps = {
  titleText: string;
  rawData: RecordCount[];
}

const RecordCountChart: React.FC<RecordCountChartProps> = ({
  titleText,
  rawData,
}) => {
  const chartData = {
    labels: rawData.map((d) => new Date(d.recordDate).toLocaleDateString()),
    datasets: [
      {
        label: "Number of Visits",
        data: rawData.map((d) => d.recordCount),
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
  return (
    <>
      <LineChart data={chartData} options={options} />
    </>
  );
};

export default RecordCountChart;
