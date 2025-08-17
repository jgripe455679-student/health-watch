import React, { useEffect, useRef, useState } from "react";
import { get } from "../../api/apiClient";
import { useHealthConditions } from "../../hooks/useHealthConditions";
import { HealthCondition } from "../../utils/HealthConditionsProvider";
import { HealthConditionOccurrence } from "../charts/HealthConditionOccurrenceChart";
import MedicalProblemOccurrenceChart, {
  MedicalProblemOccurrence,
} from "../charts/MedicalProblemOccurrenceChart";

type MedicalProblemDashboardPanelProps = {
  startDate: string;
  endDate: string;
};

const MedicalProblemDashboardPanel: React.FC<
  MedicalProblemDashboardPanelProps
> = ({ startDate, endDate }) => {
  const [medicalProblemOccurrence, setMedicalProblemOccurrence] = useState<
    MedicalProblemOccurrence[]
  >([]);
  const [healthConditionOccurrence, setHealthConditionOccurrence] = useState<
    HealthConditionOccurrence[]
  >([]);
  const [selectedHealthCondition, setSelectedHealthCondition] =
    useState<string>("");
  const didRun = useRef(false);
  const { healthConditions, populateHealthConditions } = useHealthConditions();

  const fetchMedicalProblemOccurrence = async (
    healthCondition: string,
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `reports/medical-problem-occurrence/filter?healthCondition=${healthCondition}&startDate=${startDate}&endDate=${endDate}`
      );
      setMedicalProblemOccurrence(response.data as MedicalProblemOccurrence[]);
    } catch (error) {
      console.error("Error fetching medical problem occurrence data: ", error);
    }
  };

  const fetchHealthConditionOccurrence = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `reports/health-condition-occurrence/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setHealthConditionOccurrence(
        response.data as HealthConditionOccurrence[]
      );
    } catch (error) {
      console.error("Error fetching health condition occurrence data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async (
      healthCondition: string,
      startDate: string,
      endDate: string
    ): Promise<void> => {
      if (startDate && endDate) {
        await fetchHealthConditionOccurrence(startDate, endDate);
        await fetchMedicalProblemOccurrence(
          healthCondition,
          startDate,
          endDate
        );
      }
    };
    fetchData(selectedHealthCondition, startDate, endDate);
    didRun.current = false;
  }, [selectedHealthCondition, startDate, endDate]);

  useEffect(() => {
    const getUniqueHealthConditions = (
      occurrences: HealthConditionOccurrence[]
    ): HealthCondition[] => {
      const all = occurrences.map((o) => o.healthCondition);
      const distinct = Array.from(new Set(all));
      return distinct.map((hc) => ({ healthCondition: hc }));
    };
    if (!didRun.current) {
      const result = getUniqueHealthConditions(healthConditionOccurrence);
      populateHealthConditions(result);
      didRun.current = true;
    }
  }, [healthConditionOccurrence, populateHealthConditions]);

  return (
    <div className="card card-bordered col-span-1 w-full h-64 md:h-80 lg:h-96 rounded-none border-gray-300 shadow">
      <div className="h-full">
        <MedicalProblemOccurrenceChart
          titleText="Illness Occurrence Dashboard: Weekly Overview"
          rawData={medicalProblemOccurrence}
          selectedHealthCondition={selectedHealthCondition}
          setSelectedHealthCondition={setSelectedHealthCondition}
          healthConditions={healthConditions}
        />
      </div>
    </div>
  );
};

export default MedicalProblemDashboardPanel;
