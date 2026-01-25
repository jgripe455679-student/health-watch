import axios from "axios";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post, put } from "../api/apiClient";
import { useAppUtility } from "../hooks/useAppUtility";
import { useAuth } from "../hooks/useAuth";
import { useUserManagement } from "../hooks/useUserManagement";
import { User } from "../pages/user-management/UserManagement";
import { FormMessageProps } from "../utils/types";
import getEmptyUserFormValues, { UserFormValues } from "../utils/user";

type UserProps = {
  isEditing: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  userDetails?: User;
};

interface Role {
  id: number;
  name: string;
  authority: string;
  users?: number[];
  permissions: string[];
}

const UserForm: React.FC<UserProps> = ({
  isEditing,
  setMessage,
  userDetails,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [values, setValues] = useState<UserFormValues>({
    username: userDetails?.username || "",
    password: "",
    confirmPassword: "",
    role: userDetails?.role || "",
  });
  const [errors, setErrors] = useState<UserFormValues>(
    getEmptyUserFormValues()
  );
  const [formMessage, setFormMessage] = useState<FormMessageProps | null>(null);
  const { stripRolePrefix, isPasswordValid } = useAppUtility();
  const { username } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { stopEditing } = useUserManagement();

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
    if (formMessage) setFormMessage(null);
  };

  const handleOnClose = (): void => {
    if (isEditing) {
      stopEditing();
    }
    navigate(-1);
  };

  const handleOnSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter;
    const id =
      submitter instanceof HTMLInputElement ? submitter.value : undefined;
    const newErrors: UserFormValues = getEmptyUserFormValues();
    if (initialValidation() && !isEditing) {
      try {
        const response = await post("/users", {
          ...values,
          createdBy: username,
        });
        if (response.status === 201) {
          setValues(getEmptyUserFormValues());
          if (id === "Save & Add New") {
            setFormMessage({
              isError: false,
              message: "User successfully saved.",
            });
          } else {
            setMessage("User successfully saved.");
            navigate("/user-management", { replace: true });
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          newErrors.username = error.response?.data?.message + ".";
        } else {
          setFormMessage({
            isError: true,
            message:
              "Oops, something went wrong. Please contact your system administrator.",
          });
          setValues(getEmptyUserFormValues());
        }
        console.error("Error submitting new user data: ", error);
      }
      setErrors(newErrors);
    }
    if (isEditing && userDetails !== null) {
      try {
        const response = await put("users/" + userDetails?.id, {
          username: values.username,
          password: values.password,
          role: stripRolePrefix(values.role),
          updatedBy: username,
        });
        if (response.status === 200) {
          setValues(getEmptyUserFormValues());
          stopEditing();
          setMessage("Changes successfully applied.");
          navigate("/user-management", { replace: true });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 409) {
          newErrors.username = error.response?.data?.message + ".";
          setErrors(newErrors);
        } else {
          setFormMessage({
            isError: true,
            message:
              "Oops, something went wrong. Please contact your system administrator.",
          });
        }
        console.error("Error submitting user data, Changes not saved: ", error);
      }
    }
  };

  const initialValidation = (): boolean => {
    let isValid = true;
    const newErrors: UserFormValues = getEmptyUserFormValues();

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
      {formMessage && (
        <div
          role="alert"
          className={`alert ${!formMessage.isError ? "alert-success" : "alert-error"} rounded-none flex justify-between`}
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
            <span className="text-sm">{formMessage.message}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 shrink-0 stroke-current cursor-pointer"
            viewBox="0 0 384 512"
            onClick={() => setFormMessage(null)}
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
          {!userDetails && (
            <input
              data-id="new"
              type="submit"
              className="btn btn-sm btn-primary rounded-none"
              value="Save & Add New"
            />
          )}
          <input
            data-id="add"
            type="submit"
            className="btn btn-sm btn-outline rounded-none"
            value="Save & Close"
          />
          <button
            className="btn btn-ghost btn-sm rounded-none"
            onClick={handleOnClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
