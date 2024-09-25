import React, { FC, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Card,
  Alert,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from "../@types/auth";
import { ACCESS_KEY, REFRESH_KEY, login } from "../lib/client";
import useAuth from "../hooks/useAuth";

const Login: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { auth, setAuth } = useAuth();

  const clearFormFields = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // email validation
    const emailRegExp = /\S+@\S+\.\S+/;
    const emailLength = formData.email.length;
    const emailFormat = emailRegExp.test(formData.email);

    if (emailLength === 0) {
      setErrorMessage("Email address is required");
      return;
    }

    if (!emailFormat) {
      setErrorMessage("Must be a valid email address");
      return;
    }

    // password validation
    const passwordLength = formData.password.length;

    if (passwordLength === 0) {
      setErrorMessage("Password is required");
      return;
    }

    if (passwordLength < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }

    // API call for jwt token / login function
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      if (response) {
        setAuth({ ...auth, isLoggedIn: !auth.isLoggedIn });
        localStorage.setItem(ACCESS_KEY, response.access);
        localStorage.setItem(REFRESH_KEY, response.refresh);
        navigate("/dashboard");
        clearFormFields();
      }
    } catch (error) {
      clearFormFields();
      setErrorMessage(error.message);
      console.error(error);
    }
  };
  return (
    <>
      {errorMessage && (
        <Alert
          icon={<ExclamationTriangleIcon className="h-6 w-6" />}
          className="p-3 rounded-none"
          color="red"
        >
          {errorMessage}
        </Alert>
      )}
      <Card className="flex flex-col justify-center w-full h-full bg-white shadow-2xl rounded">
        <div className="text-center flex flex-col gap-1 mb-2">
          <Typography variant="h4">Health Watch</Typography>
          <Typography variant="h6">Monitoring System</Typography>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="p-4 flex flex-col justify-center gap-3"
        >
          <Input
            onChange={handleOnChange}
            value={formData.email}
            name="email"
            type="email"
            size="lg"
            color="blue-gray"
            variant="outlined"
            label="Email address"
            autoFocus
            autoComplete="off"
          />
          <Input
            onChange={handleOnChange}
            value={formData.password}
            name="password"
            type="password"
            size="lg"
            color="blue-gray"
            variant="outlined"
            label="Password"
          />
          <Button
            type="submit"
            size="lg"
            color="blue-gray"
            variant="filled"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Login;
