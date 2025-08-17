import React, { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import RecordCountChart, { RecordCount } from "../charts/RecordCountChart";

type RecordCountDashboardPanelProps = {
  startDate: string;
  endDate: string;
};

const RecordCountDashboardPanel: React.FC<RecordCountDashboardPanelProps> = ({
  startDate,
  endDate,
}) => {
  const [data, setData] = useState<RecordCount[]>([]);
  const fetchRecordCount = async (
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
        await fetchRecordCount(startDate, endDate);
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);
  return (
    <div className="card card-bordered col-span-2 w-full h-64 md:h-80 lg:h-96 rounded-none border-gray-300 shadow">
      <div className="h-full">
        <RecordCountChart
          titleText="Patient Visit Dashboard: Weekly Overview"
          rawData={data}
        />
      </div>
    </div>
  );
};

export default RecordCountDashboardPanel;
