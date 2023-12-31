import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { NewUser } from "../@types/auth";
import NewUserContext from "../components/AuthContext";

const initialState: NewUser = {
    user_role: "resident",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    sex: "",
    relationship_status: "",
    phone_number: "",
    address_line_one: "",
    address_line_two: "",
    address_line_three: "",
    province: "",
    city: "",
    barangay: "",
    zip_code: "",
    email: "",
    password: "",
    re_password: ""
}

const SignUp: FC = () => {
    const [newUser, setNewUser] = useState<NewUser>(initialState);

    const mergeData = (data: NewUser) => {
        setNewUser({ ...newUser, ...data })
    }

    return (
        <NewUserContext.Provider value={{ newUser, mergeData }}>
            <Outlet />
        </NewUserContext.Provider>
    );
}

export default SignUp;