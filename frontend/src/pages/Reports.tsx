import "chart.js/auto";
import React, { useState } from "react";
import BMIAnalysisChart from "../components/BMIAnalysisChart";
import BPTrendsChart from "../components/BPTrendsChart";
import DemographicsAnalysisChart from "../components/DemographicsAnalysisChart";
import Navbar from "../components/Navbar";
import RecordCountReportPanel from "../components/reports/RecordCountReportPanel";
import ServiceUsageReportPanel from "../components/reports/ServiceUsageReportPanel";
import useDateRange from "../hooks/useDateRange";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Reports: React.FC = () => {
  useDocumentTitle("Reports");
  const { dateRange, updateDateRange } = useDateRange();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleStartDateOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDateRange({ startDate: event.target.value });
    setExpandedCard(null);
  };

  const handleEndDateOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDateRange({ endDate: event.target.value });
    setExpandedCard(null);
  };

  const span = (id: string) =>
    expandedCard === id ? "col-span-2" : "col-span-1";

  const order = (id: string) =>
    expandedCard === id ? "order-first" : "order-none";

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <h1 className="text-4xl p-1.5">Reports</h1>
        <div className="flex flex-col space-x-2 max-sm:w-3/4 md:flex-row md:self-end items-center md:my-1.5 md:mr-1.5">
          <span className="max-sm:self-start text-sm md:text-base">From:</span>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={handleStartDateOnChange}
            className="input input-sm input-bordered rounded-none md:w-40 py-1.5 px-3"
          />
          <span className="max-sm:self-start text-sm md:text-base">To:</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={handleEndDateOnChange}
            className="input input-sm input-bordered rounded-none md:w-40 py-1.5 px-3"
          />
        </div>
        <div className={`grid grid-cols-2 gap-2 grid-flow-row-dense`}>
          <RecordCountReportPanel
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            span={span}
            order={order}
          />
          <ServiceUsageReportPanel
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            span={span}
            order={order}
          />
          <div
            className={`card card-bordered ${span(
              "3"
            )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow`}
          >
            <div className="h-full">
              <BPTrendsChart
                titleText="Averages of Systolic and Diastolic Over Time"
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </div>
            <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
              <div className="card-actions justify-start">
                <button
                  className="btn btn-sm btn-link"
                  onClick={() =>
                    setExpandedCard((prev) => (prev === "3" ? null : "3"))
                  }
                >
                  {expandedCard === "3" ? "Collapse" : "View full on analytics"}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`card card-bordered ${span(
              "4"
            )} w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow`}
          >
            <div className="h-full">
              <BMIAnalysisChart
                titleText="BMI Distribution Analysis Over Time"
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
            </div>
            <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
              <div className="card-actions justify-start">
                <button
                  className="btn btn-sm btn-link"
                  onClick={() =>
                    setExpandedCard((prev) => (prev === "4" ? null : "4"))
                  }
                >
                  {expandedCard === "4" ? "Collapse" : "View full on analytics"}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`card card-bordered ${
              !expandedCard ? "col-span-2" : "col-span-1"
            } w-full h-64 md:h-80 lg:h-96 rounded-none border-x-gray-300 border-t-gray-300 shadow`}
          >
            <div className="h-full">
              <DemographicsAnalysisChart />
            </div>
            <div className="card-body p-2 bg-base-100 border-x-gray-800 border-b-gray-800 rounded-none shadow">
              <div className="card-actions justify-start">
                <button
                  className="btn btn-sm btn-link"
                  onClick={() =>
                    setExpandedCard((prev) => (prev === "5" ? null : "5"))
                  }
                >
                  {expandedCard === "5" ? "Collapse" : "View full on analytics"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
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
                    titleText="Patient Visits Over Time"
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                  />
                  <a className="link">View Interpretation</a>
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
        </div> */}
      </div>
    </div>
  );
};

export default Reports;
