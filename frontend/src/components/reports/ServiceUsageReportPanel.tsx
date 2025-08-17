import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get, post } from "../../api/apiClient";
import ServiceUsageChart, { ServiceUsage } from "../charts/ServiceUsageChart";

type ServiceUsageReportPanelProps = {
  startDate: string;
  endDate: string;
  expandedCard: string | null;
  setExpandedCard: Dispatch<SetStateAction<string | null>>;
  span: (id: string) => string;
  order: (id: string) => string;
};

interface ServiceUsageAnalytics {
  service: string;
  recordCount: number;
  percentage: number;
}

interface ServiceUsageDescriptiveAnalyticsResponse {
  analytics: ServiceUsageAnalytics[];
  description: string;
}

const ServiceUsageReportPanel: React.FC<ServiceUsageReportPanelProps> = ({
  startDate,
  endDate,
  expandedCard,
  setExpandedCard,
  span,
  order,
}) => {
  const [rawData, setRawData] = useState<ServiceUsage[]>([]);
  const [analyticsData, setAnalyticsData] = useState<ServiceUsageAnalytics[]>(
    []
  );
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchServiceUsage = async (): Promise<void> => {
    try {
      const response = await get("/reports/service-usage");
      setRawData(response.data as ServiceUsage[]);
    } catch (error) {
      console.error("Error fetching service usage data: ", error);
    }
  };

  const fetchServiceUsageByDateRange = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/service-usage/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setRawData(response.data as ServiceUsage[]);
    } catch (error) {
      console.error("Error fetching service usage data by date range: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async (
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchServiceUsageByDateRange(startDate, endDate);
      } else {
        await fetchServiceUsage();
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  const handleServiceUsageDescriptiveAnalytics = async (): Promise<void> => {
    setExpandedCard((prev) => (prev === "2" ? null : "2"));
    if (expandedCard === null || expandedCard !== "2") {
      setIsLoading(true);
      try {
        const post_response = await post(
          "/rabbitmq/service-usage/analytics",
          rawData
        );
        if (post_response.status === 200) {
          const get_response = await get("/reports/service-usage/analytics");
          const { analytics, description } =
            get_response.data as ServiceUsageDescriptiveAnalyticsResponse;
          setAnalyticsData(analytics);
          setDescription(description);
        }
      } catch (error) {
        console.error(
          "Error submitting and fetching service usage analytics data: ",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`card card-bordered ${span("2")} ${order(
        "2"
      )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow transition-all duration-300`}
    >
      <div className={`h-5/6 ${expandedCard === "2" ? "flex" : ""}`}>
        {expandedCard === "2" ? (
          <>
            <div className="w-3/4">
              <ServiceUsageChart
                titleText="Medical Service Usages Over Time"
                rawData={rawData}
              />
            </div>
            <div
              className={`w-1/4 overflow-auto ${
                isLoading ? "flex items-center justify-center" : ""
              }`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <table className="table table-sm border-collapse border border-gray-600">
                  <thead>
                    <tr>
                      <th className="border border-gray-600">Service</th>
                      <th className="border border-gray-600">Usage</th>
                      <th className="border border-gray-600">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.map((d, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-600">
                          {d.service.replace(/ *\([^)]*\) */g, "")}
                        </td>
                        <td className="border border-gray-600">
                          {d.recordCount}
                        </td>
                        <td className="border border-gray-600">
                          {d.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <ServiceUsageChart
            titleText="Medical Service Usages Over Time"
            rawData={rawData}
          />
        )}
      </div>
      <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
        <div className="card-actions justify-start">
          {expandedCard === "2" ? (
            <div className="flex items-center m-1.5">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <span className="text-sm">{description}</span>
              )}
              <button
                className="btn btn-sm btn-link"
                onClick={handleServiceUsageDescriptiveAnalytics}
              >
                Collapse
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-link my-1.5"
              onClick={handleServiceUsageDescriptiveAnalytics}
            >
              View full on analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceUsageReportPanel;
