import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get, post } from "../../api/apiClient";
import RecordCountChart, { RecordCount } from "../charts/RecordCountChart";

type RecordCountReportPanelProps = {
  startDate: string;
  endDate: string;
  expandedCard: string | null;
  setExpandedCard: Dispatch<SetStateAction<string | null>>;
  span: (id: string) => string;
  order: (id: string) => string;
};

interface RecordCountAnalytics {
  recordDate: string;
  rateOfChange: number;
}

interface RecordCountDescriptiveAnalyticsResponse {
  analytics: RecordCountAnalytics[];
  description: string;
}

const RecordCountReportPanel: React.FC<RecordCountReportPanelProps> = ({
  startDate,
  endDate,
  expandedCard,
  setExpandedCard,
  span,
  order,
}) => {
  const [rawData, setRawData] = useState<RecordCount[]>([]);
  const [analyticsData, setAnalyticsData] = useState<RecordCountAnalytics[]>(
    []
  );
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecordCount = async (): Promise<void> => {
    try {
      const response = await get("/reports/record-count");
      setRawData(response.data as RecordCount[]);
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
      setRawData(response.data as RecordCount[]);
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

  const handleRecordCountAnalytics = async (): Promise<void> => {
    setExpandedCard((prev) => (prev === "1" ? null : "1"));
    if (expandedCard === null || expandedCard !== "1") {
      setIsLoading(true);
      try {
        const post_response = await post(
          "/rabbitmq/record-count/analytics",
          rawData
        );
        if (post_response.status === 200) {
          const get_response = await get("/reports/record-count/analytics");
          const { analytics, description } =
            get_response.data as RecordCountDescriptiveAnalyticsResponse;
          setAnalyticsData(analytics);
          setDescription(description);
        }
      } catch (error) {
        console.error(
          "Error submitting and fetching record count analytics data: ",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`card card-bordered ${span("1")} ${order(
        "1"
      )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow transition-all duration-300`}
    >
      <div className={`h-5/6 ${expandedCard === "1" ? "flex" : ""}`}>
        {expandedCard === "1" ? (
          <>
            <div className="w-4/5">
              <RecordCountChart
                titleText="Patient Visits Over Time"
                rawData={rawData}
              />
            </div>
            <div
              className={`w-1/5 overflow-auto ${
                isLoading ? "flex items-center justify-center" : ""
              }`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <table className="table table-sm border-collapse border border-gray-600">
                  <thead>
                    <tr>
                      <th className="border border-gray-600">Record Date</th>
                      <th className="border border-gray-600">Rate of Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.map((d, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-600">
                          {new Date(d.recordDate).toLocaleDateString()}
                        </td>
                        <td
                          className={`border border-gray-600 ${
                            d.rateOfChange > 0
                              ? "text-green-600"
                              : d.rateOfChange < 0
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {Math.abs(d.rateOfChange)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <RecordCountChart
            titleText="Patient Visits Over Time"
            rawData={rawData}
          />
        )}
      </div>
      <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
        <div className="card-actions justify-start">
          {expandedCard === "1" ? (
            <div className="flex items-center m-1.5">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <span className="text-sm">{description}</span>
              )}
              <button
                className="btn btn-sm btn-link"
                onClick={handleRecordCountAnalytics}
              >
                Collapse
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-link my-1.5"
              onClick={handleRecordCountAnalytics}
            >
              View full on analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordCountReportPanel;
