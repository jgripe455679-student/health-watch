import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../../api/apiClient";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useAppUtility } from "../../hooks/useAppUtility";
import useDebounce from "../../hooks/useDebounce";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useProfiling } from "../../hooks/useProfiling";

export interface Profile {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  maritalStatus: string;
  address: string;
  emailAddress: string;
  mobileNumber: string;
  occupation: string;
  educationalBackground: string;
  records: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

const Profiling: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { message, setMessage } = useProfiling();
  const { formatLocalDateTime, formatDateOfBirth } = useAppUtility();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  useDocumentTitle("Profiling");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const allIds: number[] = profiles.map((d) => d.id);
  const selectedCount = selectedIds.size;
  const selectAllRef = useRef<HTMLInputElement>(null);

  const fetchAllProfiles: () => Promise<void> = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get("/profiles");
      setProfiles(response.data as Profile[]);
    } catch (error) {
      console.error("Error fetching profiles data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset utilities

  const resetMessage = (): void => {
    if (message) setMessage("");
  };

  const resetSearchState = (): void => {
    if (searchValue) setSearchValue("");
  };

  const resetPageNumber = (): void => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  // TODO: CREATE A NEW AND FUNCTIONAL ONE
  // const handleViewClick = async (profileId: number): Promise<void> => {
  //   resetMessage();
  //   setCurrentProfilingView("viewProfile");
  //   try {
  //     const response = await get("/profiles/" + profileId);
  //     setProfileDetails(response.data as Profile);
  //   } catch (error) {
  //     console.error("Error fetching profile data: ", error);
  //   }
  // };

  // Modal utilities

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // TODO: MAKE A NEW AND FUNCTIONAL ONE
  // const deleteProfile = async (profileId: number | null): Promise<void> => {
  //   try {
  //     const response = await deleteRequest("/profiles/" + profileId);
  //     if (response.status === 200) {
  //       setSuccessMessage("Profile successfully deleted.");
  //       setIsOpen(false);
  //       setProfileToDeleteId(null);
  //       resetPageNumber();
  //       resetSearchState();
  //       fetchAllProfiles();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // TODO: handleEditProfile

  // Keep the header checkbox indeterminate when partially selected

  useEffect(() => {
    if (!selectAllRef.current) return;
    const total = profiles.length;
    const selectedCount = selectedIds.size;
    selectAllRef.current.indeterminate =
      selectedCount > 0 && selectedCount < total;
  }, [selectedIds, profiles.length]);

  // Master checkbox

  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === profiles.length || prev.size > 0
        ? new Set()
        : new Set(allIds),
    );
  };

  // Multiple selection
  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Search

  const handleSearchQuery = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get(`profiles/search?lastName=${query}`);
      if (response.status === 200) {
        setProfiles(response.data as Profile[]);
      }
    } catch (error) {
      console.error("Error fetching profile search results: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfiles = async (query: string): Promise<void> => {
      if (query.trim() === "") {
        await fetchAllProfiles();
      } else {
        await handleSearchQuery(debouncedSearchValue);
      }
    };
    fetchProfiles(debouncedSearchValue);
  }, [debouncedSearchValue]);

  // Pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profiles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    resetMessage();
  };

  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">Profiling</h1>
      {message && (
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
            <span className="text-sm">{message}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={resetMessage}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      )}
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:my-1.5 justify-between items-center">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          keyword={"Last Name"}
          resetPageNumber={resetPageNumber}
          resetSuccessMessage={resetMessage}
        />
        <div className="flex gap-x-2">
          {selectedCount > 0 && selectedCount === 1 ? (
            <>
              <button
                className="btn btn-sm btn-error rounded-none max-sm:w-3/4"
                onClick={() => openModal()}
              >
                Deactivate User
              </button>
              <button className="btn btn-sm btn-secondary rounded-none max-sm:w-3/4">
                Edit User
              </button>
            </>
          ) : selectedCount > 0 ? (
            <button className="btn btn-sm btn-error rounded-none max-sm:w-3/4">
              Deactivate Users
            </button>
          ) : (
            <></>
          )}
          <Link
            to="new"
            className="btn btn-sm btn-outline btn-primary rounded-none max-sm:w-3/4"
            onClick={resetMessage}
          >
            New Profile
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs mb-0.5">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  className="checkbox checkbox-xs"
                  onChange={toggleAll}
                  checked={
                    selectedCount === profiles.length && profiles.length > 0
                  }
                  title="Select all"
                  aria-label="Select all profiles"
                />
              </th>
              <th>ID</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Suffix</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Civil Status</th>
              <th>Address</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Occupation</th>
              <th>Educational Background</th>
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
            ) : profiles.length === 0 ? (
              <tr>
                <td colSpan={100} className="text-center py-4">
                  <div>No data</div>
                </td>
              </tr>
            ) : (
              currentItems.map((profile) => {
                const isChecked: boolean = selectedIds.has(profile.id);
                return (
                  <tr
                    key={profile.id}
                    className={isChecked ? "bg-base-300" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs"
                        checked={isChecked}
                        onChange={() => toggleRow(profile.id)}
                      />
                    </td>
                    <th>{profile.id}</th>
                    <td>{profile.firstName}</td>
                    <td>{profile.middleName}</td>
                    <td>{profile.lastName}</td>
                    <td>{profile.suffix}</td>
                    <td>{formatDateOfBirth(profile.dateOfBirth)}</td>
                    <td>{profile.age}</td>
                    <td>{profile.gender}</td>
                    <td>{profile.maritalStatus}</td>
                    <td>{profile.address}</td>
                    <td>{profile.emailAddress}</td>
                    <td>{profile.mobileNumber}</td>
                    <td>{profile.occupation}</td>
                    <td>{profile.educationalBackground}</td>
                    <td>{formatLocalDateTime(profile.createdAt)}</td>
                    <td>{profile.createdBy}</td>
                    <td>{formatLocalDateTime(profile.updatedAt)}</td>
                    <td>{profile.updatedBy}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={profiles.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default Profiling;
