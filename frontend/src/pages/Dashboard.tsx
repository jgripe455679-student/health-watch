import React, { useEffect, useState } from "react";
import DemographicsAnalysisDashboardPanel from "../components/dashboard/DemographicsAnalysisDashboardPanel";
import MedicalProblemDashboardPanel from "../components/dashboard/MedicalProblemOccurrenceDashboardPanel";
import RecordCountDashboardPanel from "../components/dashboard/RecordCountDashboardPanel";
import ServiceUsageDashboardPanel from "../components/dashboard/ServiceUsageDashboardPanel";
import Navbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useFetchModelCounts from "../hooks/useFetchModelCounts";

interface DateRange {
  startDate: string;
  endDate: string;
}

const Dashboard: React.FC = () => {
  useDocumentTitle("Dashboard");
  const { counts, isLoading } = useFetchModelCounts();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: "",
    endDate: "",
  });
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    const getWeekStartAndEndDates = (): DateRange => {
      const today = new Date();
      const dayOfWeek = today.getDay();

      const startDate = new Date(today);
      startDate.setDate(today.getDate() - dayOfWeek).toString();

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];

      return { startDate: startDateString, endDate: endDateString };
    };
    setLoadingState(true);
    const { startDate, endDate } = getWeekStartAndEndDates();
    setDateRange({ startDate, endDate });
  }, []);

  useEffect(() => {
    const isDateRangeUpdated = (): void => {
      if (dateRange.startDate && dateRange.endDate) {
        setLoadingState(false);
      }
    };
    isDateRangeUpdated();
  }, [dateRange]);

  return (
    <div className="h-full w-full min-h-screen">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <h1 className="text-4xl p-1.5 pl-0 mb-2.5">Dashboard</h1>
        <div className="flex flex-col space-y-3 md:space-y-0 md:mb-2.5 md:flex-row items-center justify-evenly">
          <div className="card card-bordered border-gray-300 bg-base-100 rounded-none shadow">
            <div className="card-body p-0 h-full w-full min-w-64 min-h-28 md:min-w-40 md:min-h-20 lg:min-w-52 lg:min-h-24">
              <span className="block ml-2.5 mt-2.5 text-start text-lg md:text-sm">
                Total Records
              </span>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-primary self-end mr-5 mt-6 md:mr-3 md:mb-3 lg:mr-5 lg:mb-5"></span>
              ) : (
                <span className="block mt-4 mr-3.5 text-end text-3xl md:text-xl lg:text-3xl">
                  {counts?.healthRecords}
                </span>
              )}
            </div>
          </div>
          <div className="card card-bordered border-gray-300 bg-base-100 rounded-none shadow">
            <div className="card-body p-0 h-full w-full min-w-64 min-h-28 md:min-w-40 md:min-h-20 lg:min-w-52 lg:min-h-24">
              <span className="block ml-2.5 mt-2.5 text-start text-lg md:text-sm">
                Profile Count
              </span>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-primary self-end mr-5 mt-6 md:mr-3 md:mb-3 lg:mr-5 lg:mb-5"></span>
              ) : (
                <span className="block mt-4 mr-3.5 text-end text-3xl md:text-xl lg:text-3xl">
                  {counts?.profiles}
                </span>
              )}
            </div>
          </div>
          <div className="card card-bordered border-gray-300 bg-base-100 rounded-none shadow">
            <div className="card-body p-0 h-full w-full min-w-64 min-h-28 md:min-w-40 md:min-h-20 lg:min-w-52 lg:min-h-24">
              <span className="block ml-2.5 mt-2.5 text-start text-lg md:text-sm">
                Medical Services
              </span>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-primary self-end mr-5 mt-6 md:mr-3 md:mb-3 lg:mr-5 lg:mb-5"></span>
              ) : (
                <span className="block mt-4 mr-3.5 text-end text-3xl md:text-xl lg:text-3xl">
                  {counts?.services}
                </span>
              )}
            </div>
          </div>
          <div className="card card-bordered border-gray-300 bg-base-100 rounded-none shadow">
            <div className="card-body p-0 h-full w-full min-w-64 min-h-28 md:min-w-40 md:min-h-20 lg:min-w-52 lg:min-h-24">
              <span className="block ml-2.5 mt-2.5 text-start text-lg md:text-sm">
                System Users
              </span>
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-primary self-end mr-5 mt-6 md:mr-3 md:mb-3 lg:mr-5 lg:mb-5"></span>
              ) : (
                <span className="block mt-4 mr-3.5 text-end text-3xl md:text-xl lg:text-3xl">
                  {counts?.systemUsers}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {loadingState ? (
            <span className="loading loading-spinner loading-xs text-primary"></span>
          ) : (
            <RecordCountDashboardPanel
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
            />
          )}
          {loadingState ? (
            <span className="loading loading-spinner loading-xs text-primary"></span>
          ) : (
            <ServiceUsageDashboardPanel
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
            />
          )}
          {loadingState ? (
            <span className="loading loading-spinner loading-xs text-primary"></span>
          ) : (
            <MedicalProblemDashboardPanel
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
            />
          )}
          <DemographicsAnalysisDashboardPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
