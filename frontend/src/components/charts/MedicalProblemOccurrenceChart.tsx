import {
  BubbleController,
  BubbleDataPoint,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import useAggregation from "../../hooks/useAggregation";
import { HealthCondition } from "../../utils/HealthConditionsProvider";
import BubbleChart from "./BubbleChart";

ChartJS.register(
  BubbleController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

type MedicalProblemOccurrenceChartProps = {
  titleText: string;
  rawData: MedicalProblemOccurrence[];
  selectedHealthCondition: string;
  setSelectedHealthCondition: Dispatch<SetStateAction<string>>;
  expandedCard?: string | null;
  setExpandedCard?: Dispatch<SetStateAction<string | null>>;
  healthConditions: HealthCondition[];
};

export interface MedicalProblemOccurrence {
  recordDate: string;
  healthCondition: string;
  medicalProblem: string;
  recordCount: number;
}

const MedicalProblemOccurrenceChart: React.FC<
  MedicalProblemOccurrenceChartProps
> = ({
  titleText,
  rawData,
  selectedHealthCondition,
  setSelectedHealthCondition,
  expandedCard,
  setExpandedCard,
  healthConditions,
}) => {
  const data = useAggregation(rawData, "medicalProblem");
  const maxCount = Math.max(...data.map((d) => d.recordCount), 1);
  const points: BubbleDataPoint[] = data.map((d, idx) => ({
    x: d.recordCount,
    y: idx,
    r: Math.sqrt(d.recordCount / maxCount) * 30,
  }));
  const chartData: ChartData<"bubble", BubbleDataPoint[], string> = {
    datasets: [
      {
        label: "Number of Occurrences",
        data: points,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"bubble"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: titleText,
        font: {
          size: 14,
        },
      },
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const rec = data[ctx.dataIndex];
            return `${rec.column}: ${rec.recordCount}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: false },
        ticks: {
          stepSize: Math.ceil(maxCount / 5),
        },
      },
      y: {
        type: "category",
        labels: data.map((d) => d.column),
        title: { display: false },
      },
    },
  };
  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedHealthCondition(event.target.value);
    if (expandedCard === "4") {
      setExpandedCard?.(null);
    }
  };
  return (
    <div className="relative w-full h-full">
      <select
        className="absolute top-1 right-2 z-10 bg-white border border-gray-300 rounded px-2 py-1 text-sm shadow"
        value={selectedHealthCondition}
        onChange={handleOnChange}
      >
        <option>Select Health Condition</option>
        {healthConditions.map((d, idx) => (
          <option key={idx} value={d.healthCondition}>
            {d.healthCondition}
          </option>
        ))}
      </select>
      <BubbleChart data={chartData} options={options} />
    </div>
  );
};

export default MedicalProblemOccurrenceChart;
