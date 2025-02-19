import React from "react";
import useFetchBPTrends from "../hooks/useFetchBPTrends";

type RecentBPTrendsTableProps = {
  startDate: string;
  endDate: string;
}

const RecentBPTrendsTable: React.FC<RecentBPTrendsTableProps> = ({
  startDate,
  endDate,
}) => {
  const { data } = useFetchBPTrends(startDate, endDate);
  const recentData = data.slice(data.length - 5, data.length);

  return (
    <div className="overflow-x-auto w-full my-2.5">
      <table className="table table-xs border-collapse border border-gray-600">
        <thead>
          <tr>
            <th className="border border-gray-600">Record Date</th>
            <th className="border border-gray-600">Systolic Mean</th>
            <th className="border border-gray-600">Systolic Median</th>
            <th className="border border-gray-600">Systolic Std</th>
            <th className="border border-gray-600">Diastolic Mean</th>
            <th className="border border-gray-600">Diastolic Median</th>
            <th className="border border-gray-600">Diastolic Std</th>
          </tr>
        </thead>
        <tbody>
          {recentData.map((d) => (
            <tr key={d.id}>
              <td className="border border-gray-600">
                {new Date(d.recordDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-600">{d.systolicMean}</td>
              <td className="border border-gray-600">{d.systolicMedian}</td>
              <td className="border border-gray-600">{d.systolicStd}</td>
              <td className="border border-gray-600">{d.diastolicMean}</td>
              <td className="border border-gray-600">{d.diastolicMedian}</td>
              <td className="border border-gray-600">{d.diastolicStd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBPTrendsTable;
