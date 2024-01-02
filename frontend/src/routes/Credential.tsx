import React, { FC, useState, useContext } from "react";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import axios from "axios";
import type { NewUser, NewUserContextType } from "../@types/auth";
import NewUserContext from "../components/AuthContext";

const Credential: FC = () => {
    const navigate = useNavigate();
    const { newUser, mergeData } = useContext(NewUserContext) as NewUserContextType;
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [formData, setFormData] = useState<NewUser>(newUser);
    const client = axios.create({
        baseURL: "http://localhost:8000/api/v1/users/"
    });

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value.trim();
        const inputName = event.target.name;
        const newUserInput = { ...formData, [inputName]: inputValue };
        setFormData(newUserInput);
    }

    const handleInputValidation = (event: any) => {
        const inputValue = event.target.value.trim();
        const inputName = event.target.name;

        // for email
        if (inputName === "email") {
            const emailRegExp = /\S+@\S+\.\S+/;
            const emailLength = inputValue.length;
            const emailFormat = emailRegExp.test(inputValue);

            let errorMessage = "";
            if (emailLength === 0) {
                errorMessage = "Email is required.";
            } else if (!emailFormat) {
                errorMessage = "Email must be in valid format."
            } else {
                errorMessage = "";
            }
            setEmailError(errorMessage);
        }

        // for password
        if (inputName === "password") {
            const upperCaseRegExp = /(?=.*?[A-Z])/;
            const lowerCaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = inputValue.length;
            const upperCasePassword = upperCaseRegExp.test(inputValue);
            const lowerCasePassword = lowerCaseRegExp.test(inputValue);
            const digitsPassword = digitsRegExp.test(inputValue);
            const specialCharPassword = specialCharRegExp.test(inputValue);
            const minLengthPassword = minLengthRegExp.test(inputValue);

            let errorMessage = "";
            if (passwordLength === 0) {
                errorMessage = "Password is required.";
            } else if (!upperCasePassword) {
                errorMessage = "Password must contain at least one uppercase letter.";
            } else if (!lowerCasePassword) {
                errorMessage = "Password must contain at least one lowercase letter.";
            } else if (!digitsPassword) {
                errorMessage = "Password must contain at least one digit.";
            } else if (!specialCharPassword) {
                errorMessage = "Password must contain at least one special character.";
            } else if (!minLengthPassword) {
                errorMessage = "Password must be at least 8 characters.";
            } else {
                errorMessage = "";
            }
            setPasswordError(errorMessage);
        }

        // for confirm password
        if (inputName === "re_password" || (inputName === "password" && formData.re_password.length > 0)) {
            if (formData.re_password !== formData.password) {
                setConfirmPasswordError("Passwords do not match.");
            } else {
                setConfirmPasswordError("");
            }
        }
    }

    // Form submits
    const handleOnSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        mergeData(formData);
        const user: NewUser = { ...formData };
        const path = `/signup/activate`;
        const data = await signUpUser(user);
        if (data) {
            navigate(path);
        }
    }

    const signUpUser = async (obj: NewUser): Promise<NewUser> => {
        try {
            const response = await client.post("", {
                email: obj.email,
                user_role: obj.user_role,
                password: obj.password,
                re_password: obj.re_password,
                first_name: obj.first_name,
                middle_name: obj.middle_name,
                last_name: obj.last_name,
                date_of_birth: obj.date_of_birth,
                sex: obj.sex,
                relationship_status: obj.relationship_status,
                phone_number: obj.phone_number,
                address_line_one: obj.address_line_one,
                address_line_two: obj.address_line_two,
                address_line_three: obj.address_line_three,
                province: obj.province,
                city: obj.city,
                barangay: obj.barangay,
                zip_code: obj.zip_code,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    return (
        <>
            <BackButton onClick={() => navigate(-1)} />
            <div className="w-4/5 h-full grid grid-cols-1 gap-2">
                <Typography variant="h6">Credential</Typography>
                <form onSubmit={handleOnSubmit} className="grid grid-cols-1 gap-3">
                    <Input onChange={handleInputChange} onKeyUp={handleInputValidation} value={formData.email} name="email" type="email" label="Email" size="md" variant="outlined" color={emailError !== "" ? "red" : "green"} required />
                    {emailError !== "" ? <Typography variant="small" color="red">{emailError}</Typography> : ""}
                    <Input onChange={handleInputChange} onKeyUp={handleInputValidation} value={formData.password} name="password" type="password" label="Password" size="md" variant="outlined" color={passwordError !== "" ? "red" : "green"} required />
                    {passwordError !== "" ? <Typography variant="small" color="red">{passwordError}</Typography> : ""}
                    <Input onChange={handleInputChange} onKeyUp={handleInputValidation} value={formData.re_password} name="re_password" type="password" label="Confirm password" size="md" variant="outlined" color={confirmPasswordError !== "" ? "red" : "green"} required />
                    {confirmPasswordError !== "" ? <Typography variant="small" color="red">{confirmPasswordError}</Typography> : ""}
                    <Button type="submit" className="w-1/3 place-self-end grid grid-cols-1 place-items-center rounded-full" size="sm" color="green">Sign up</Button>
                </form>
            </div>
        </>
    );
}

export default Credential;