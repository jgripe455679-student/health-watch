import React, { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import ServiceUsageChart, { ServiceUsage } from "../charts/ServiceUsageChart";

type ServiceUsageDashboardPanelProps = {
  startDate: string;
  endDate: string;
};

const ServiceUsageDashboardPanel: React.FC<ServiceUsageDashboardPanelProps> = ({
  startDate,
  endDate,
}) => {
  const [data, setData] = useState<ServiceUsage[]>([]);
  const fetchServiceUsage = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/service-usage/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data as ServiceUsage[]);
    } catch (error) {
      console.error("Error fetching service usage data: ", error);
    }
  };
  useEffect(() => {
    const fetchData = async (
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchServiceUsage(startDate, endDate);
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);
  return (
    <div className="card card-bordered col-span-1 w-full h-64 md:h-80 lg:h-96 rounded-none border-gray-300 shadow">
      <div className="h-full">
        <ServiceUsageChart
          titleText="Medical Service Usage Dashboard: Weekly Overview"
          rawData={data}
        />
      </div>
    </div>
  );
};

export default ServiceUsageDashboardPanel;
