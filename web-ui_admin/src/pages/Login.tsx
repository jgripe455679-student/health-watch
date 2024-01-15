import React, { FC, useState } from "react";
import { Typography, Input, Button, Card, Alert } from "@material-tailwind/react";
import axios, { AxiosError } from "axios";
import TriangleExclamationIcon from "../components/TriangleExclamationIcon";
import { useNavigate } from "react-router-dom";

type LoginCredentials = {
    email: string;
    password: string;
}

const Login: FC = () => {
    const [formData, setFormData] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const client = axios.create({
        baseURL: "http://localhost:8000/api/v1/jwt/create/"
    });
    const navigate = useNavigate();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // email validation
        const emailRegExp = /\S+@\S+\.\S+/;
        const emailLength = formData.email.length;
        const emailFormat = emailRegExp.test(formData.email);

        if (emailLength === 0) {
            setErrorMessage("Email address is required.");
            return;
        }

        if (!emailFormat) {
            setErrorMessage("Must be a valid email address.");
            return;
        }

        // password validation
        const passwordLength = formData.password.length;

        if (passwordLength === 0) {
            setErrorMessage("Password is required.");
            return;
        }

        // login
        try {
            const response = await client.post("", {
                email: formData.email,
                password: formData.password
            });
            if (response.data) {
                localStorage.setItem("tokens", JSON.stringify(response.data));
                navigate("/dashboard");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    setErrorMessage("Unauthorized access: User login prohibited to access the system.");
                }
                else if (error.response?.status === 401) {
                    setErrorMessage("Invalid credentials entered, please try again.");
                } else {
                    setErrorMessage("Please check your login credentials and try again.");
                }
            }
            console.error(error);
        }
    }
    return (
        <>
            {errorMessage && <Alert icon={<TriangleExclamationIcon />} className="p-3 mb-2" color="red">{errorMessage}</Alert>}
            <Card className="flex flex-col justify-center w-full h-full bg-white shadow-lg rounded">
                <div className="text-center flex flex-col gap-1 mb-2">
                    <Typography variant="h4">Health Watch</Typography>
                    <Typography variant="h6">Monitoring System</Typography>
                </div>
                <form onSubmit={handleOnSubmit} className="p-4 flex flex-col justify-center gap-3">
                    <Input
                        onChange={handleOnChange}
                        name="email"
                        type="email"
                        size="lg"
                        color="blue-gray"
                        variant="outlined"
                        label="Email address"
                    />
                    <Input
                        onChange={handleOnChange}
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
}

export default Login;