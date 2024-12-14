import React, { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import Navbar from "../components/Navbar";
import { useAppUtility } from "../hooks/useAppUtility";

export interface Record {
  id: number;
  recordDate: string;
  profileType: string;
  profile: string;
  department: string;
  services: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

const HealthRecord: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formatLocalDateTime } = useAppUtility();

  useEffect(() => {
    const fetchAllRecords = async () => {
      setIsLoading(true);
      try {
        const response = await get("/records");
        setRecords(response.data as Record[]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllRecords();
  }, []);

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="px-8 py-1 my-1.5">
        <div className="card card-bordered border-gray-300 rounded-none shadow">
          <div className="card-body p-0">
            <h6 className="card-title bg-gray-100 text-sm text-primary p-1">
              Electronic Health Record System
            </h6>
            <div className="flex justify-end items-center">
              <button className="btn btn-sm rounded-none mr-1.5">
                New Record
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-xs mx-1.5 mb-0.5">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Record Date</th>
                    <th>Type</th>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Created At</th>
                    <th>Created By</th>
                    <th>Updated At</th>
                    <th>Updated By</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={100} className="text-center py-4">
                        <span className="loading loading-spinner loading-xs text-primary"></span>
                      </td>
                    </tr>
                  ) : (
                    records.map((record, index) => (
                      <tr key={index}>
                        <th>{record.id}</th>
                        <td>{record.recordDate}</td>
                        <td>{record.profileType}</td>
                        <td>{record.profile}</td>
                        <td>{record.department}</td>
                        <td>{formatLocalDateTime(record.createdAt)}</td>
                        <td>{record.createdBy}</td>
                        <td>{formatLocalDateTime(record.updatedAt)}</td>
                        <td>{record.updatedBy}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecord;
