import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { User } from "../pages/UserManagement";

type UserProps = {
  setCurrentUserManagementView: (view: string) => void;
  userDetails: User | null;
  isEditing: boolean;
  setSuccessMessage: (message: string) => void;
  setUserDetails: (user: User | null) => void;
  setIsEditing: (state: boolean) => void;
};

interface Role {
  id: number;
  name: string;
  authority: string;
  users?: string[];
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
  setUserDetails,
  setIsEditing,
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
  const { stripRolePrefix } = useAppUtility();
  const { username } = useAuth();

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const response = await get("/roles");
        setRoles(response.data as Role[]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAllRoles();
  }, []);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (globalError) setGlobalError("");
  };

  const isPasswordValid = (password: string): boolean => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    const isLengthValid = password.length >= 8;
    if (hasUppercase && hasNumber && hasSymbol && isLengthValid) {
      return true;
    } else {
      return false;
    }
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
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
          setCurrentUserManagementView("userManagement");
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
        console.error("Error submitting data: ", error);
      }
    } else if (initialValidation() && isEditing && userDetails !== null) {
      try {
        const response = await put("/users/" + userDetails.id, {
          username: values.username,
          password: values.password,
          role: stripRolePrefix(values.role),
          updatedBy: username,
        });
        if (response.status === 200) {
          setSuccessMessage("User updated successfully.");
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
          setCurrentUserManagementView("userManagement");
          setUserDetails(null);
          setIsEditing(false);
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
        console.error("Error submitting data: ", error);
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
      <form className="p-4 w-full max-w-96" onSubmit={handleOnSubmit}>
        {globalError && (
          <div role="alert" className="alert alert-error rounded-none">
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
        )}
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
            {roles.map((role) => (
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
            ))}
          </div>
          {errors.role && (
            <div className="label">
              <span className="label-text-alt text-error">{errors.role}</span>
            </div>
          )}
        </label>
        <div className="flex justify-end gap-x-1.5 py-1.5">
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={() => setCurrentUserManagementView("userManagement")}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="btn btn-sm btn-primary rounded-none"
            value={isEditing ? "Update" : "Add"}
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
