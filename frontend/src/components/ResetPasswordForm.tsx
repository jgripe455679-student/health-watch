import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { get, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { User } from "../pages/UserManagement";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const [globalError, setGlobalError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [values, setValues] = useState<ResetPasswordFormValues>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetPasswordFormValues>({
    password: "",
    confirmPassword: "",
  });
  const { username } = useAuth();
  const { stripRolePrefix, isPasswordValid } = useAppUtility();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (globalError) setGlobalError("");
    if (setSuccessMessage) setSuccessMessage("");
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validation()) {
      try {
        const userResponse = await get(`/users/username?username=${username}`);
        if (userResponse.status === 200) {
          const { id, role } = userResponse.data as User;
          const response = await put("/users/" + id, {
            username: username,
            password: values.password,
            role: stripRolePrefix(role),
            updatedBy: username,
          });
          if (response.status === 200) {
            setSuccessMessage("Reset Password sucessfully.");
            setValues({ password: "", confirmPassword: "" });
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setGlobalError(
            "Oops, something went wrong. Please contact your system administrator."
          );
          setValues({ password: "", confirmPassword: "" });
        }
        console.error("Error resetting password: ", error);
      }
    }
  };

  const validation = (): boolean => {
    let isValid = true;
    const newErrors: ResetPasswordFormValues = {
      password: "",
      confirmPassword: "",
    };

    if (!values.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (values.password && !values.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    }

    if (values.password && !isPasswordValid(values.password)) {
      newErrors.password =
        "Password must be at least 8 characters, with at least one uppercase letter, one number, and one symbol.";
      isValid = false;
    }

    if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Password do not match.";
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
          className="alert alert-error rounded-none flex justify-between max-sm:px-2"
        >
          <div className="flex items-center md:gap-x-1.5">
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
      <form
        className="p-2 lg:p-4 max-sm:gap-y-3 md:gap-y-4 flex flex-col w-11/12 lg:w-10/12 max-sm:w-full"
        onSubmit={handleOnSubmit}
      >
        <div className="flex-1">
          <label className="form-control flex gap-x-2.5 md:flex-row w-full">
            <div className="label flex-none min-w-44 md:justify-end">
              <span className="label-text text-sm">New Password:</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className={
                errors.password
                  ? "input input-sm input-bordered input-error rounded-none flex-none min-w-52 py-1.5 px-3 text-sm lg:text-base"
                  : "input input-sm input-bordered rounded-none flex-none min-w-52 py-1.5 px-3 text-sm lg:text-base"
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
        </div>
        <div className="flex-1">
          <label className="form-control flex gap-x-2.5 md:flex-row w-full">
            <div className="label flex-none min-w-44 md:justify-end">
              <span className="label-text text-sm">Confirm New Password:</span>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={
                errors.confirmPassword
                  ? "input input-sm input-bordered input-error rounded-none flex-none min-w-52 py-1.5 px-3 text-sm lg:text-base"
                  : "input input-sm input-bordered rounded-none flex-none min-w-52 py-1.5 px-3 text-sm lg:text-base"
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
        </div>
        <div className="flex-none min-w-48 max-sm:flex-1 max-sm:w-full self-end">
          <input
            type="submit"
            className="btn btn-sm btn-primary rounded-none text-sm max-sm:w-full"
            value="Reset Password"
          />
        </div>
        <hr className="my-4" />
      </form>
    </div>
  );
};

export default ResetPasswordForm;
