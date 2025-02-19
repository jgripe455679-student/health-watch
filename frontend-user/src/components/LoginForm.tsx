import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const baseURL = "http://localhost:8080/api/v1/auth/login";

interface FormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setErrorMessage("");
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: FormValues = { username: "", password: "" };

    if (!values.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      axios
        .post(
          baseURL,
          {
            username: values.username,
            password: values.password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          login(response.data);
          setValues({
            username: "",
            password: "",
          });
          navigate("/health-record", { replace: true });
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.status === 500) {
            setErrorMessage("Invalid Credentials\nPlease try again.");
            setValues({
              username: "",
              password: "",
            });
          }
          console.error(error);
        });
    }
  };

  return (
    <div className="card bg-base-200 text-primary-content w-full md:w-96 rounded-none md:shadow-2xl">
      {errorMessage && (
        <div
          role="alert"
          className="alert alert-error text-base-100 rounded-none max-sm:flex"
        >
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
          <span className="whitespace-pre-line text-left text-sm">
            {errorMessage}
          </span>
        </div>
      )}
      <div className="card-body items-center p-0">
        <div className="card-title flex items-center justify-center md:bg-primary w-full px-2.5 pt-3.5 md:py-3.5">
          <img
            src="/transparent.svg"
            alt="HealthWatch Transparent Logo"
            className="h-16 w-16"
          />
          <span className="text-xl mr-6">HealthWatch</span>
        </div>
        <form
          className="flex flex-col gap-y-2.5 w-72 my-2.5"
          onSubmit={handleOnSubmit}
        >
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            className={
              errors.username
                ? "input input-bordered input-error input-md text-black rounded-none w-full max-w-xs"
                : "input input-bordered input-md text-black rounded-none w-full max-w-xs"
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
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className={
              errors.password
                ? "input input-bordered input-error input-md text-black rounded-none w-full max-w-xs"
                : "input input-bordered input-md text-black rounded-none w-full max-w-xs"
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
          <div className="card-actions w-full">
            <button className="btn btn-md btn-primary text-lg rounded-none w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
