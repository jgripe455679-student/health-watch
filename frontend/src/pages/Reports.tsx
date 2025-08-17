import "chart.js/auto";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DemographicsAnalysisReportPanel from "../components/reports/DemographicsAnalysisReportPanel";
import HealthConditionOccurrenceReportPanel from "../components/reports/HealthConditionOccurrenceReportPanel";
import MedicalProblemOccurrenceReportPanel from "../components/reports/MedicalProblemOccurrenceReportPanel";
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

  const span = (id: string): string => {
    if (expandedCard === id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return "col-span-2";
    }
    return "col-span-1";
  };

  const order = (id: string) =>
    expandedCard === id ? "order-first" : "order-none";

  useEffect(() => {
    console.log(expandedCard);
  }, [expandedCard])

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <h1 className="text-4xl p-1.5 pl-0 mb-2.5">Reports</h1>
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
          <HealthConditionOccurrenceReportPanel
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            span={span}
            order={order}
          />
          <MedicalProblemOccurrenceReportPanel
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            span={span}
            order={order}
          />
          <DemographicsAnalysisReportPanel
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
            order={order}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
