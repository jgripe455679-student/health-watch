import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get, post } from "../../api/apiClient";
import DemographicsAnalysisChart, {
  DemographicsAnalysis,
} from "../charts/DemographicsAnalysisChart";

type DemographicsAnalysisReportPanelProps = {
  expandedCard: string | null;
  setExpandedCard: Dispatch<SetStateAction<string | null>>;
  order: (id: string) => string;
};

interface DemographicsAnalysisAnalytics {
  ageGroup: string;
  percentage: number;
}

interface DemographicsAnalysisDescriptiveAnalyticsResponse {
  analytics: DemographicsAnalysisAnalytics[];
  description: string;
}

const DemographicsAnalysisReportPanel: React.FC<
  DemographicsAnalysisReportPanelProps
> = ({ expandedCard, setExpandedCard, order }) => {
  const [data, setData] = useState<DemographicsAnalysis[]>([]);
  // const [analyticsData, setAnalyticsData] = useState<
  //   DemographicsAnalysisAnalytics[]
  // >([]);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDemographicsAnalysis = async (): Promise<void> => {
    try {
      const response = await get("/reports/demographics-analysis");
      setData(response.data as DemographicsAnalysis[]);
    } catch (error) {
      console.error("Error fetching demographics analysis data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchDemographicsAnalysis();
    };
    fetchData();
  }, []);

  const span = (): string => {
    if (!expandedCard || expandedCard === "5") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return "col-span-2";
    }
    return "col-span-1";
  };

  const handleDemographicsAnalysisDescriptiveAnalytics =
    async (): Promise<void> => {
      setExpandedCard((prev) => (prev === "5" ? null : "5"));
      if (expandedCard === null || expandedCard !== "5") {
        setIsLoading(true);
        try {
          const post_response = await post(
            "/rabbitmq/demographics-analysis/analytics",
            data
          );
          if (post_response.status === 200) {
            const get_response = await get(
              "/reports/demographics-analysis/analytics"
            );
            const { description } =
              get_response.data as DemographicsAnalysisDescriptiveAnalyticsResponse;
            setDescription(description);
          }
        } catch (error) {
          console.error(
            "Error submitting and fetching demographics analysis analytics data: ",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

  return (
    <div
      className={`card card-bordered ${span()} ${order(
        "5"
      )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow transition-all duration-300`}
    >
      <div className="h-5/6">
        <DemographicsAnalysisChart
          titleText="Demographics Analysis"
          data={data}
        />
      </div>
      <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
        <div className="card-actions justify-start">
          {expandedCard === "5" ? (
            <div className="flex items-center m-1.5">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <span className="text-sm">{description}</span>
              )}
              <button
                className="btn btn-sm btn-link"
                onClick={handleDemographicsAnalysisDescriptiveAnalytics}
              >
                Collapse
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-link my-1.5"
              onClick={handleDemographicsAnalysisDescriptiveAnalytics}
            >
              View full on analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemographicsAnalysisReportPanel;
