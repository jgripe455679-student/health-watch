import React, { useEffect, useState } from "react";
import { deleteRequest, get } from "../api/apiClient";
import HealthRecordForm from "../components/HealthRecordForm";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { useAppUtility } from "../hooks/useAppUtility";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Profile } from "./Profiling";

export interface Record {
  id: number;
  recordDate: string;
  profileType: string;
  profileId: number;
  profile: string;
  department: string;
  services: string[];
  height: string;
  weight: string;
  bloodPressure: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export type ProfileType = {
  name: string;
};

const profileTypes: ProfileType[] = [{ name: "OLD" }, { name: "NEW" }];

const HealthRecord: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formatLocalDateTime } = useAppUtility();
  const [currentHealthRecordView, setCurrentHealthRecordView] =
    useState<string>("EHRs");
  const [successMessage, setSuccessMessage] = useState<string>("");
  useDocumentTitle("EHRs");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recordDetails, setRecordDetails] = useState<Record | null>(null);
  const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recordToDeleteId, setRecordToDeleteId] = useState<number | null>(null);

  const openModal = (recordId: number) => {
    setIsOpen(true);
    setRecordToDeleteId(recordId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setRecordDetails(null);
  };

  const deleteRecord = async (recordId: number | null): Promise<void> => {
    resetSuccessMessage();
    try {
      const response = await deleteRequest("/records/" + recordId);
      if (response.status === 200) {
        setSuccessMessage("Record successfully deleted.");
        setIsOpen(false);
        setRecordToDeleteId(null);
        fetchAllRecords();
        if (currentPage !== 1) setCurrentPage(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllRecords = async (): Promise<void> => {
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

  useEffect(() => {
    fetchAllRecords();
  }, [currentHealthRecordView]);

  const resetSuccessMessage = (): void => {
    setSuccessMessage("");
  };

  const handleNewRecordClick = () => {
    resetSuccessMessage();
    setCurrentHealthRecordView("newRecord");
  };

  const isNotEditingRecord = () => {
    setIsEditing(false);
    setRecordDetails(null);
    setProfileDetails(null);
  };

  const handleEditClick = async (recordId: number): Promise<void> => {
    resetSuccessMessage();
    setCurrentHealthRecordView("editRecord");
    setIsEditing(true);
    try {
      const recordResponse = await get("/records/" + recordId);
      if (recordResponse.status === 200) {
        const healthRecordDetails = recordResponse.data as Record;
        setRecordDetails(healthRecordDetails);
        if (healthRecordDetails.profileId) {
          const profileResponse = await get(
            "/profiles/" + healthRecordDetails.profileId
          );
          setProfileDetails(profileResponse.data as Profile);
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    resetSuccessMessage();
  };

  const EHRsCard = () => (
    <div className="px-8 py-1 my-1.5">
      <div className="card card-bordered border-gray-300 rounded-none shadow">
        <div className="card-body p-0">
          <h6 className="card-title bg-gray-100 text-sm text-primary p-1">
            Electronic Health Record System
          </h6>
          {successMessage && (
            <div
              role="alert"
              className="alert alert-success rounded-none flex justify-between"
            >
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">{successMessage}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
                viewBox="0 0 384 512"
                onClick={resetSuccessMessage}
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </div>
          )}
          <div className="flex justify-end items-center">
            <button
              className="btn btn-sm btn-outline btn-primary rounded-none mr-1.5"
              onClick={handleNewRecordClick}
            >
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
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Blood Pressure</th>
                  <th>Created At</th>
                  <th>Created By</th>
                  <th>Updated At</th>
                  <th>Updated By</th>
                  <th>Actions</th>
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
                  currentItems.map((record) => (
                    <tr key={record.id}>
                      <th>{record.id}</th>
                      <td>{record.recordDate}</td>
                      <td>{record.profileType}</td>
                      <td>{record.profile}</td>
                      <td>{record.department}</td>
                      <td>{record.height}</td>
                      <td>{record.weight}</td>
                      <td>{record.bloodPressure}</td>
                      <td>{formatLocalDateTime(record.createdAt)}</td>
                      <td>{record.createdBy}</td>
                      <td>{formatLocalDateTime(record.updatedAt)}</td>
                      <td>{record.updatedBy}</td>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <button
                            className="btn btn-primary btn-xs rounded-full"
                            onClick={() => handleEditClick(record.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#020d19"
                                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-error btn-xs rounded-full"
                            onClick={() => openModal(record.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 448 512"
                            >
                              <path
                                fill="#020d19"
                                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <dialog open={isOpen} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={closeModal}
                >
                  x
                </button>
              </form>
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="#FF0000"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
                <h3 className="text-error">Confirm Delete</h3>
              </div>
              <p className="my-2.5">
                Are you sure you want to delete this record?
              </p>
              <div className="join flex justify-end gap-x-1.5">
                <button
                  className="btn btn-sm btn-ghost rounded-none"
                  onClick={() => deleteRecord(recordToDeleteId)}
                >
                  Yes
                </button>
                <button
                  className="btn btn-sm btn-ghost rounded-none"
                  onClick={closeModal}
                >
                  No
                </button>
              </div>
            </div>
          </dialog>
          <Pagination
            totalItems={records.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );

  const HealthRecordCard = () => (
    <div className="px-8 py-1 my-1.5">
      <div className="card card-bordered border-gray-300 rounded-none shadow">
        <div className="card-body p-0">
          <h6 className="card-title bg-gray-100 text-sm text-primary p-1">
            {currentHealthRecordView === "editRecord" && isEditing
              ? "Edit Record"
              : "New Record"}
          </h6>
          <HealthRecordForm
            setCurrentHealthRecordView={setCurrentHealthRecordView}
            setSuccessMessage={setSuccessMessage}
            fetchAllRecords={fetchAllRecords}
            recordDetails={recordDetails}
            profileDetails={profileDetails}
            profileTypes={profileTypes}
            isEditing={isEditing}
            isNotEditingRecord={isNotEditingRecord}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full">
      <Navbar />
      {currentHealthRecordView === "EHRs" ? <EHRsCard /> : <HealthRecordCard />}
    </div>
  );
};

export default HealthRecord;
