import "chart.js/auto";
import React from "react";
import BMIAnalysisChart from "../components/BMIAnalysisChart";
import BPTrendsChart from "../components/BPTrendsChart";
import DemographicsAnalysisChart from "../components/DemographicsAnalysisChart";
import DepartmentUsageChart from "../components/DepartmentUsageChart";
import Navbar from "../components/Navbar";
import RecentBPTrendsTable from "../components/RecentBPTrendsTable";
import RecordCountChart from "../components/RecordCountChart";
import useDateRange from "../hooks/useDateRange";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Reports: React.FC = () => {
  useDocumentTitle("Reports");
  const { dateRange, updateDateRange } = useDateRange();

  const handleStartDateOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDateRange({ startDate: event.target.value });
  };

  const handleEndDateOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDateRange({ endDate: event.target.value });
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
          <div className="card-body p-0">
            <span className="card-title bg-gray-100 text-sm text-primary p-1.5">
              Reports
            </span>
            <div className="flex flex-col items-center space-y-1 md:p-2.5 m-1 md:m-1.5">
              <div className="flex flex-col gap-2 max-sm:w-3/4 md:flex-row md:self-end items-center md:mr-1.5">
                <span className="max-sm:self-start text-sm md:text-base">
                  From:
                </span>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={handleStartDateOnChange}
                  className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
                />
                <span className="max-sm:self-start text-sm md:text-base">
                  To:
                </span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={handleEndDateOnChange}
                  className="input input-sm input-bordered rounded-none w-full py-1.5 px-3"
                />
              </div>
              <div className="relative w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <RecordCountChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    titleText="Patient Visits Over Time"
                  />
                </div>
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <DepartmentUsageChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                </div>
              </div>
              <span className="text-sm md:text-base font-medium text-gray-600 mt-2.5">
                Most Recent Statistical Analysis of Systolic and Diastolic Blood
                Pressure
              </span>
              <RecentBPTrendsTable
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
              <div className="relative w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <BPTrendsChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    titleText="Averages of Systolic and Diastolic Over Time"
                  />
                </div>
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <BMIAnalysisChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    titleText="BMI Distribution Analysis Over Time"
                  />
                </div>
              </div>
              <div className="relative w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <DemographicsAnalysisChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
