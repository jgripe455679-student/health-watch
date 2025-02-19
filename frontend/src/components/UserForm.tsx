import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { User } from "../pages/UserManagement";

type UserProps = {
  setCurrentUserManagementView: (view: string) => void;
  userDetails: User | null;
  isEditing: boolean;
  setSuccessMessage: (message: string) => void;
  fetchAllUsers: () => Promise<void>;
  resetEditingState: () => void;
  resetSearchState: () => void;
  resetPageNumber: () => void;
};

interface Role {
  id: number;
  name: string;
  authority: string;
  users?: number[];
  permissions: string[];
}

interface UserFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const UserForm: React.FC<UserProps> = ({
  setCurrentUserManagementView,
  userDetails,
  isEditing,
  setSuccessMessage,
  fetchAllUsers,
  resetEditingState,
  resetSearchState,
  resetPageNumber,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [values, setValues] = useState<UserFormValues>({
    username: userDetails?.username || "",
    password: "",
    confirmPassword: "",
    role: userDetails?.role || "",
  });
  const [errors, setErrors] = useState<UserFormValues>({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [globalError, setGlobalError] = useState<string>("");
  const { stripRolePrefix, isPasswordValid } = useAppUtility();
  const { username } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchAllRoles = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await get("/roles");
      setRoles(response.data as Role[]);
    } catch (error) {
      console.error("Error fetching roles data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setValues({ ...values, [name]: value.toLowerCase() });
      setErrors({ ...errors, [name]: "" });
    } else {
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
    if (globalError) setGlobalError("");
  };

  const resetState = (view?: string): void => {
    setValues({
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
    resetEditingState();
    if (view) setCurrentUserManagementView(view);
  };

  const handleGoBackClick = (): void => {
    resetState("userManagement");
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newErrors: UserFormValues = {
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    };
    if (initialValidation() && !isEditing) {
      try {
        const response = await post("/users", {
          ...values,
          createdBy: username,
        });
        if (response.status === 201) {
          setSuccessMessage("User created successfully.");
          resetState("userManagement");
          resetSearchState();
          resetPageNumber();
          fetchAllUsers();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          newErrors.username = error.response?.data?.message + ".";
        } else {
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
        }
        console.error("Error submitting user data: ", error);
      }
      setErrors(newErrors);
    } else if (initialValidation() && isEditing && userDetails !== null) {
      try {
        const response = await put("/users/" + userDetails.id, {
          username: values.username,
          password: values.password,
          role: stripRolePrefix(values.role),
          updatedBy: username,
        });
        if (response.status === 200) {
          const userResponse = await get(
            `/users/username?username=${username}`
          );
          if (userResponse.status === 200) {
            const { id } = userResponse.data as User;
            if (userDetails.id === id) {
              resetEditingState();
              navigate("/", { replace: true });
            }
          }
          setSuccessMessage("User updated successfully.");
          resetState("userManagement");
          resetSearchState();
          resetPageNumber();
          fetchAllUsers();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          newErrors.username = error.response?.data?.message + ".";
          setErrors(newErrors);
        } else {
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
        }
        console.error("Error submitting user data: ", error);
      }
    }
  };

  const initialValidation = (): boolean => {
    let isValid = true;
    const newErrors: UserFormValues = {
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    if (!values.username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!values.password && !isEditing) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (values.password && !isPasswordValid(values.password)) {
      newErrors.password =
        "Password must be at least 8 characters, with at least one uppercase letter, one number, and one symbol.";
      isValid = false;
    }

    if (!values.confirmPassword && !isEditing) {
      newErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    }

    if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Password do not match.";
      isValid = false;
    }

    if (!values.role) {
      newErrors.role = "Role is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {globalError && (
        <div
          role="alert"
          className="alert alert-error rounded-none flex justify-between"
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
            <span className="text-sm">{globalError}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setGlobalError("")}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </div>
      )}
      <form className="p-4 w-full max-w-96" onSubmit={handleOnSubmit}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            id="username"
            name="username"
            type="text"
            className={
              errors.username
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.username}
            onChange={handleOnChange}
            autoFocus
          />
          {errors.username && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.username}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">New Password</span>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            className={
              errors.password
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered rounded-none w-full py-1.5 px-3"
            }
            value={values.password}
            onChange={handleOnChange}
          />
          {errors.password && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.password}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Confirm New password</span>
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={
              errors.confirmPassword
                ? "input input-sm input-bordered input-error rounded-none w-full py-1.5 px-3"
                : "input input-sm input-bordered w-full rounded-none py-1.5 px-3"
            }
            value={values.confirmPassword}
            onChange={handleOnChange}
          />
          {errors.confirmPassword && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.confirmPassword}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Role</span>
          </div>
          <div className="flex items-center justify-evenly">
            {isLoading ? (
              <span className="loading loading-spinner loading-xs text-primary"></span>
            ) : (
              roles.map((role) => (
                <label key={role.id} className="label cursor-pointer">
                  <input
                    id="role"
                    type="radio"
                    className="radio mx-2 radio-sm"
                    name="role"
                    value={role.name}
                    checked={stripRolePrefix(values.role) === role.name}
                    onChange={handleOnChange}
                  />
                  <span className="label-text">{role.name}</span>
                </label>
              ))
            )}
          </div>
          {errors.role && (
            <div className="label">
              <span className="label-text-alt text-error">{errors.role}</span>
            </div>
          )}
        </label>
        <div className="flex flex-row-reverse gap-x-1.5 py-1.5">
          <input
            type="submit"
            className="btn btn-sm btn-primary rounded-none"
            value={isEditing ? "Update" : "Add"}
          />
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={handleGoBackClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
