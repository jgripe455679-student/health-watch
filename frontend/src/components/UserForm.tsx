import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { get, post, put } from "../api/apiClient";
import { User } from "../pages/UserManagement";

type UserProps = {
  setCurrentView: (view: string) => void;
  userDetails: User | null;
  stripRolePrefix: (role: string) => string;
  isEditing: boolean;
  setSuccessMessage: (message: string) => void;
  setUserDetails: React.Dispatch<React.SetStateAction<User | null>>;
};

interface Role {
  id: number;
  name: string;
  authority: string;
  users?: string[];
  permissions: string[];
}

interface FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const UserForm: React.FC<UserProps> = ({
  setCurrentView,
  userDetails,
  stripRolePrefix,
  isEditing,
  setSuccessMessage,
  setUserDetails,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [values, setValues] = useState<FormValues>({
    username: userDetails?.username || "",
    password: "",
    confirmPassword: "",
    role: userDetails?.role || "",
  });
  const [errors, setErrors] = useState<FormValues>({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [globalError, setGlobalError] = useState<string>("");

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
    const newErrors: FormValues = {
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
    };
    if (initialValidation() && !isEditing) {
      try {
        const response = await post("/users", values);
        if (response.status === 201) {
          setSuccessMessage("User created successfully!");
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
          setCurrentView("userManagement");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          newErrors.username = error.response?.data?.message + ".";
          setErrors(newErrors);
        } else {
          setGlobalError("Oops, something went wrong. Please try again later.");
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
        }
        console.error(error);
      }
    } else if (initialValidation() && isEditing && userDetails !== null) {
      try {
        const response = await put("/users/" + userDetails.id, {
          username: values.username,
          password: values.password,
          role: stripRolePrefix(values.role),
        });
        if (response.status === 200) {
          setSuccessMessage("User updated successfully!");
          setValues({
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
          });
          setCurrentView("userManagement");
          setUserDetails(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const initialValidation = (): boolean => {
    let isValid = true;
    const newErrors: FormValues = {
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
          <div role="alert" className="alert alert-error text-base-100">
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
            onClick={() => setCurrentView("userManagement")}
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
