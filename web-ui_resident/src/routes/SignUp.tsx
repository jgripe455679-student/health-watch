import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { NewUser, PSGC } from "../@types/auth";
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
    const [newUserProvinces, setNewUserProvinces] = useState<PSGC[]>([]);
    const [newUserCities, setNewUserCities] = useState<PSGC[]>([]);
    const [newUserBarangays, setNewUserBarangays] = useState<PSGC[]>([]);

    const populateNewUser = (data: NewUser) => {
        setNewUser({ ...newUser, ...data });
    }

    const populateProvinces = (data: Array<PSGC>) => {
        setNewUserProvinces(data);
    }

    const populateCities = (data: Array<PSGC>) => {
        setNewUserCities(data);
    }

    const populateBarangays = (data: Array<PSGC>) => {
        setNewUserBarangays(data);
    }

    return (
        <NewUserContext.Provider value={{ newUser, populateNewUser, newUserProvinces, populateProvinces, newUserCities, populateCities, newUserBarangays, populateBarangays }}>
            <Outlet />
        </NewUserContext.Provider>
    );
}

export default SignUp;