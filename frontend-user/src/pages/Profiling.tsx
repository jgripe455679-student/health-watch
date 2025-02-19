import React, { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import Navbar from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";
import SearchInput from "../components/SearchInput";
import { useAppUtility } from "../hooks/useAppUtility";
import useDebounce from "../hooks/useDebounce";
import useDocumentTitle from "../hooks/useDocumentTitle";

export interface Profile {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  address: string;
  mobileNumber: string;
  occupation: string;
  educationalBackground: string;
  householdSize: number;
  incomeBracket: string;
  records: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

const Profiling: React.FC = () => {
  useDocumentTitle("Profiling");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const debouncedSearchValue = useDebounce(searchValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("profiling");
  const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
  const { formatLocalDateTime } = useAppUtility();

  const handleSearchQuery = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get(`profiles/search?lastName=${query}`);
      if (response.status === 200) {
        setProfiles(response.data as Profile[]);
      }
    } catch (error) {
      console.error("Error fetching profiles search results: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllProfiles = async (query: string): Promise<void> => {
      if (query.trim() !== "") {
        await handleSearchQuery(query);
      }
    };
    fetchAllProfiles(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleEditClick = async (id: number): Promise<void> => {
    if (successMessage) setSuccessMessage("");
    setCurrentView("editProfile");
    setIsEditing(true);
    try {
      const response = await get("/profiles/" + id);
      setProfileDetails(response.data as Profile);
    } catch (error) {
      console.error("Error fetching profile data: ", error);
    }
  };

  const handleViewClick = async (id: number): Promise<void> => {
    if (successMessage) setSuccessMessage("");
    setCurrentView("viewProfile");
    try {
      const response = await get("/profiles/" + id);
      setProfileDetails(response.data as Profile);
    } catch (error) {
      console.error("Error fetching profile data: ", error);
    }
  };

  const resetEditingState = (): void => {
    setIsEditing(false);
    setProfileDetails(null);
  };

  const ProfilingCard = () => (
    <div className="px-1.5 md:px-2.5 py-1 my-1.5">
      <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
        <div className="card-body p-0">
          <span className="card-title bg-gray-100 text-md text-primary p-1.5">
            Profiling
          </span>
          {successMessage && (
            <div
              role="alert"
              className="alert alert-success rounded-none flex justify-between max-sm:px-2"
            >
              <div className="flex items-center gap-x-1.5">
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
                onClick={() => setSuccessMessage("")}
              >
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </div>
          )}
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <div className="overflow-x-auto">
            <table className="table table-md mx-1.5 mb-0.5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Civil Status</th>
                  <th>Address</th>
                  <th>Mobile Number</th>
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
                      <span className="loading loading-spinner loading-md text-primary"></span>
                    </td>
                  </tr>
                ) : profiles.length === 0 ? (
                  <tr>
                    <td colSpan={100} className="text-center py-4">
                      <span>No Data</span>
                    </td>
                  </tr>
                ) : debouncedSearchValue.length > 0 ? (
                  profiles.map((profile) => (
                    <tr key={profile.id}>
                      <th>{profile.id}</th>
                      <td>{`${profile.lastName}, ${
                        profile.firstName
                      } ${profile.middleName.slice(0, 1)}. ${
                        profile.suffix
                      }`}</td>
                      <td>{profile.dateOfBirth}</td>
                      <td>{profile.gender}</td>
                      <td>{profile.maritalStatus}</td>
                      <td>{profile.address}</td>
                      <td>{profile.mobileNumber}</td>
                      <td>{formatLocalDateTime(profile.createdAt)}</td>
                      <td>{profile.createdBy}</td>
                      <td>{formatLocalDateTime(profile.updatedAt)}</td>
                      <td>{profile.updatedBy}</td>
                      <td>
                        <div className="flex items-center gap-x-2.5">
                          <button
                            className="btn btn-primary btn-xs rounded-full"
                            onClick={() => handleViewClick(profile.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="#020d19"
                                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-primary btn-xs rounded-full"
                            onClick={() => handleEditClick(profile.id)}
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
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileCard = () => (
    <div className="px-2.5 py-1 my-1.5">
      <div className="card card-bordered bg-base-100 border-gray-300 rounded-none shadow">
        <div className="card-body p-0">
          <span className="card-title bg-gray-100 text-md text-primary p-1.5">
            {currentView === "editProfile" && isEditing
              ? "Edit Profile"
              : "View Profile"}
          </span>
          {currentView === "viewProfile" ? (
            <ProfileView
              setCurrentView={setCurrentView}
              resetEditingState={resetEditingState}
              profileDetails={profileDetails}
            />
          ) : (
            <ProfileForm
              profileDetails={profileDetails}
              setCurrentView={setCurrentView}
              resetEditingState={resetEditingState}
              isEditing={isEditing}
              setSuccessMessage={setSuccessMessage}
              setSearchValue={setSearchValue}
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full min-h-screen">
      <Navbar />
      {currentView === "profiling" ? <ProfilingCard /> : <ProfileCard />}
    </div>
  );
};

export default Profiling;
