import React from "react";
import DemographicsAnalysisChart from "../components/DemographicsAnalysisChart";
import Navbar from "../components/Navbar";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useFetchModelCounts from "../hooks/useFetchModelCounts";

const Dashboard: React.FC = () => {
  useDocumentTitle("Dashboard");
  const { counts, isLoading } = useFetchModelCounts();
  // const [dateRange, setDateRange] = useState<DateRange>({
  //   startDate: "",
  //   endDate: "",
  // });

  // useEffect(() => {
  //   const getWeekStartAndEndDates = (): DateRange => {
  //     const today = new Date();
  //     const dayOfWeek = today.getDay();

  //     const startDate = new Date(today);
  //     startDate.setDate(today.getDate() - dayOfWeek).toString();

  //     const endDate = new Date(startDate);
  //     endDate.setDate(startDate.getDate() + 6);

  //     const startDateString = startDate.toISOString().split("T")[0];
  //     const endDateString = endDate.toISOString().split("T")[0];

  //     return { startDate: startDateString, endDate: endDateString };
  //   };
  //   const { startDate, endDate } = getWeekStartAndEndDates();
  //   setDateRange({ startDate, endDate });
  // }, []);

  return (
    <div className="h-full w-full min-h-screen">
      <Navbar />
      <div className="px-1.5 md:px-2.5 py-1 my-1.5">
        <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
          <div className="card-body p-0">
            <span className="card-title bg-gray-100 text-sm text-primary p-1.5">
              Dashboard
            </span>
            <div className="flex flex-col space-y-1 md:p-2.5 m-1 md:m-1.5">
              <div className="flex flex-col space-y-3 md:flex-row items-center justify-evenly">
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
                      Departments
                    </span>
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm text-primary self-end mr-5 mt-6 md:mr-3 md:mb-3 lg:mr-5 lg:mb-5"></span>
                    ) : (
                      <span className="block mt-4 mr-3.5 text-end text-3xl md:text-xl lg:text-3xl">
                        {}
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
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                {/* <RecordCountChart titleText="Patient Visit Dashboard: Weekly Overview" /> */}
              </div>
              {/* <div className="relative w-full flex flex-col lg:flex-row gap-2 lg:gap-4">
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <BPTrendsChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    titleText="BP Metrics Dashboard: Weekly Overview"
                  />
                </div>
                <div className="flex-1 h-64 md:h-80 lg:h-96">
                  <BMIAnalysisChart
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    titleText="BMI Distribution Dashboard: Weekly Overview"
                  />
                </div>
              </div> */}
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

export default Dashboard;
