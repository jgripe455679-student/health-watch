import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteRequest, get } from "../../api/apiClient";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { useAppUtility } from "../../hooks/useAppUtility";
import { useAuth } from "../../hooks/useAuth";
import useDebounce from "../../hooks/useDebounce";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useUserManagement } from "../../hooks/useUserManagement";

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  permissions: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  isEnabled: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { message, setMessage } = useUserManagement();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { stripRolePrefix, formatLocalDateTime } = useAppUtility();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useDocumentTitle("User Management");
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue);
  const { username } = useAuth();
  const filteredUsers = users.filter((user) => user.username !== username);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const allIds: number[] = users.map((d) => d.id);
  const selectedCount = selectedIds.size;
  const selectAllRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const deleteUser = async (userIds: Set<number>): Promise<void> => {
    try {
      const idsArray = Array.from(userIds);
      const responses = await Promise.all(
        idsArray.map((id) => deleteRequest(`/users/${id}`)),
      );
      const allSuccessful = responses.every((res) => res.status === 200);
      if (allSuccessful) {
        if (userIds.size > 1) {
          setMessage("Selected users have been deactivated successfully.");
        } else if (userIds.size === 1) {
          setMessage("User has been deactivated successfully.");
        }
        setIsOpen(false);
        resetPageNumber();
        resetSearchState();
        fetchAllUsers();
        setSelectedIds(new Set());
      }
    } catch (error) {
      console.error("Error deactivating user data: ", error);
    }
  };


  // Modal utilities
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetchAllUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get("/users");
      setUsers(response.data as User[]);
    } catch (error) {
      console.error("Error fetching users data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (): void => {
    selectedIds.forEach((value) => {
      navigate(`edit/${value}`);
    });
  };

  // Reset utilities

  const resetPageNumber = (): void => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const resetSearchState = (): void => {
    if (searchValue) setSearchValue("");
  };

  const resetMessage = (): void => {
    if (message) setMessage("");
  };

  // Keep the header checkbox indeterminate when partially selected

  useEffect(() => {
    if (!selectAllRef.current) return;
    const total = users.length;
    const selectedCount = selectedIds.size;
    selectAllRef.current.indeterminate =
      selectedCount > 0 && selectedCount < total;
  }, [selectedIds, users.length]);

  // Master checkbox

  const toggleAll = () => {
    setSelectedIds((prev) =>
      prev.size === users.length || prev.size > 0 ? new Set() : new Set(allIds),
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
      const response = await get(`users/search?username=${query}`);
      if (response.status === 200) {
        setUsers(response.data as User[]);
      }
    } catch (error) {
      console.error("Error fetching user search results: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async (query: string): Promise<void> => {
      if (query.trim() === "") {
        await fetchAllUsers();
      } else {
        await handleSearchQuery(debouncedSearchValue);
      }
    };
    fetchData(debouncedSearchValue);
  }, [debouncedSearchValue]);

  // Pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    resetMessage();
  };

  return (
    <>
      <h1 className="text-4xl p-1.5 pl-0 mb-2.5">User Management</h1>
      {message && (
        <div
          role="alert"
          className="alert alert-success rounded-none flex justify-between max-sm:px-2 md:my-1.5"
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
          keyword={"username"}
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
              <button
                className="btn btn-sm btn-secondary rounded-none max-sm:w-3/4"
                onClick={handleEditUser}
              >
                Edit User
              </button>
            </>
          ) : selectedCount > 0 ? (
            <button
              className="btn btn-sm btn-error rounded-none max-sm:w-3/4"
              onClick={() => openModal()}
            >
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
            New User
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
                  checked={selectedCount === users.length && users.length > 0}
                  title="Select all"
                  aria-label="Select all users"
                />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Updated At</th>
              <th>Updated By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={100} className="text-center py-4">
                  <span className="loading loading-spinner loading-xs text-primary"></span>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={100} className="text-center py-4">
                  <div>No data</div>
                </td>
              </tr>
            ) : (
              currentItems.map((user) => {
                const isChecked: boolean = selectedIds.has(user.id);
                return (
                  <tr key={user.id} className={isChecked ? "bg-base-300" : ""}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs"
                        checked={isChecked}
                        onChange={() => toggleRow(user.id)}
                      />
                    </td>
                    <th>{user.id}</th>
                    <td>{user.username}</td>
                    <td>{stripRolePrefix(user.role)}</td>
                    <td>{formatLocalDateTime(user.createdAt)}</td>
                    <td>{user.createdBy}</td>
                    <td>{formatLocalDateTime(user.updatedAt)}</td>
                    <td>{user.updatedBy}</td>
                    <td>
                      {user.isAccountNonExpired &&
                      user.isAccountNonLocked &&
                      user.isCredentialsNonExpired &&
                      user.isEnabled ? (
                        <span className="text-success">Active</span>
                      ) : (
                        <span className="text-error">Inactive</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <dialog open={isOpen} className="modal">
        <div className="modal-box rounded-none">
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
            <span className="text-error">Confirm Deactivate</span>
          </div>
          <p className="my-2.5">
            Permanently deactivate
            {selectedIds.size > 1 ? "the selected users" : "this user"}
          </p>
          <div className="join flex justify-end gap-x-1.5">
            <button
              className="btn btn-sm btn-ghost rounded-none"
              onClick={() => deleteUser(selectedIds)}
            >
              Confirm
            </button>
            <button
              className="btn btn-sm btn-ghost rounded-none"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <Pagination
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default UserManagement;
