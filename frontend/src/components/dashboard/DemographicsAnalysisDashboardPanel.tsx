import React, { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import DemographicsAnalysisChart, {
    DemographicsAnalysis,
} from "../charts/DemographicsAnalysisChart";

const DemographicsAnalysisDashboardPanel: React.FC = () => {
  const [data, setData] = useState<DemographicsAnalysis[]>([]);
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
  return (
    <div className="card card-bordered col-span-2 w-full h-64 md:h-80 lg:h-96 rounded-none border-gray-300 shadow">
      <div className="h-full">
        <DemographicsAnalysisChart
          titleText="Demographics Analysis"
          data={data}
        />
      </div>
    </div>
  );
};

export default DemographicsAnalysisDashboardPanel;
