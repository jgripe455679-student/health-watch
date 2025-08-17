import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get, post } from "../../api/apiClient";
import { useHealthConditions } from "../../hooks/useHealthConditions";
import MedicalProblemOccurrenceChart, {
  MedicalProblemOccurrence,
} from "../charts/MedicalProblemOccurrenceChart";

type MedicalProblemOccurrenceReportPanelProps = {
  startDate: string;
  endDate: string;
  expandedCard: string | null;
  setExpandedCard: Dispatch<SetStateAction<string | null>>;
  span: (id: string) => string;
  order: (id: string) => string;
};

interface MedicalProblemOccurrenceAnalytics {
  medicalProblem: string;
  percentage: number;
  rateOfChange: number;
}

interface MedicalProblemOccurrenceDescriptiveAnalyticsResponse {
  analytics: MedicalProblemOccurrenceAnalytics[];
  description: string;
}

const MedicalProblemOccurrenceReportPanel: React.FC<
  MedicalProblemOccurrenceReportPanelProps
> = ({ startDate, endDate, expandedCard, setExpandedCard, span, order }) => {
  const [rawData, setRawData] = useState<MedicalProblemOccurrence[]>([]);
  const [selectedHealthCondition, setSelectedHealthCondition] =
    useState<string>("");
  const [analyticsData, setAnalyticsData] = useState<
    MedicalProblemOccurrenceAnalytics[]
  >([]);
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { healthConditions } = useHealthConditions();

  const fetchMedicalProblemOccurrence = async (
    healthCondition: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/medical-problem-occurrence/filter?healthCondition=${healthCondition}`
      );
      setRawData(response.data as MedicalProblemOccurrence[]);
    } catch (error) {
      console.error("Error fetching medical problem occurrence data: ", error);
    }
  };

  const fetchMedicalProblemOccurrenceByDateRange = async (
    healthCondition: string,
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/medical-problem-occurrence/filter?healthCondition=${healthCondition}&startDate=${startDate}&endDate=${endDate}`
      );
      setRawData(response.data as MedicalProblemOccurrence[]);
    } catch (error) {
      console.error(
        "Error fetching medical problem occurrence data by date range: ",
        error
      );
    }
  };

  useEffect(() => {
    const fetchData = async (
      healthCondition: string,
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchMedicalProblemOccurrenceByDateRange(
          healthCondition,
          startDate,
          endDate
        );
      } else {
        await fetchMedicalProblemOccurrence(healthCondition);
      }
    };
    fetchData(selectedHealthCondition, startDate, endDate);
  }, [startDate, endDate, selectedHealthCondition]);

  const handleMedicalProblemOccurrenceDescriptiveAnalytics =
    async (): Promise<void> => {
      setExpandedCard((prev) => (prev === "4" ? null : "4"));
      if (expandedCard === null || expandedCard !== "4") {
        setIsLoading(true);
        try {
          const post_response = await post(
            "/rabbitmq/medical-problem-occurrence/analytics",
            rawData
          );
          if (post_response.status === 200) {
            const get_response = await get(
              "/reports/medical-problem-occurrence/analytics"
            );
            const { analytics, description } =
              get_response.data as MedicalProblemOccurrenceDescriptiveAnalyticsResponse;
            setAnalyticsData(analytics);
            setDescription(description);
          }
        } catch (error) {
          console.error(
            "Error submitting and fetching medical problem occurrence analytics data: ",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

  return (
    <div
      className={`card card-bordered ${span("4")} ${order(
        "4"
      )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow transition-all duration-300`}
    >
      <div className={`h-5/6 ${expandedCard === "4" ? "flex" : ""}`}>
        {expandedCard === "4" ? (
          <>
            <div className="w-3/4">
              <MedicalProblemOccurrenceChart
                titleText="Illness Occurrences Over Time"
                rawData={rawData}
                selectedHealthCondition={selectedHealthCondition}
                setSelectedHealthCondition={setSelectedHealthCondition}
                setExpandedCard={setExpandedCard}
                expandedCard={expandedCard}
                healthConditions={healthConditions}
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
                      <th className="border border-gray-600">Illness</th>
                      <th className="border border-gray-600">Percentage</th>
                      <th className="border border-gray-600">Rate of Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.map((d, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-600">
                          {d.medicalProblem}
                        </td>
                        <td className="border border-gray-600">
                          {d.percentage}%
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
          <MedicalProblemOccurrenceChart
            titleText="Illness Occurrences Over Time"
            rawData={rawData}
            selectedHealthCondition={selectedHealthCondition}
            setSelectedHealthCondition={setSelectedHealthCondition}
            setExpandedCard={setExpandedCard}
            expandedCard={expandedCard}
            healthConditions={healthConditions}
          />
        )}
      </div>
      <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
        <div className="card-actions justify-start">
          {expandedCard === "4" ? (
            <div className="flex items-center m-1.5">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <span className="text-sm">{description}</span>
              )}
              <button
                className="btn btn-sm btn-link"
                onClick={handleMedicalProblemOccurrenceDescriptiveAnalytics}
              >
                Collapse
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-link my-1.5"
              onClick={handleMedicalProblemOccurrenceDescriptiveAnalytics}
            >
              View full on analytics
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalProblemOccurrenceReportPanel;
