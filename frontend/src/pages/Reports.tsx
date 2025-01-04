import "chart.js/auto";
import React from "react";
import DemographicsAnalysisChart from "../components/DemographicsAnalysisChart";
import DepartmentUsageChart from "../components/DepartmentUsageChart";
import HealthMetricsChart from "../components/HealthMetricsChart";
import Navbar from "../components/Navbar";
import RecordCountChart from "../components/RecordCountChart";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Reports: React.FC = () => {
  useDocumentTitle("Reports");

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-8 py-1 my-1.5">
        <div className="card card-bordered border-gray-300 rounded-none shadow">
          <div className="card-body p-0">
            <h6 className="card-title bg-gray-100 text-sm text-primary p-1">
              Reports
            </h6>
            <div className="flex flex-col items-center justify-center px-8 py-2.5">
              <RecordCountChart />
              <DepartmentUsageChart />
              <HealthMetricsChart />
              <DemographicsAnalysisChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
