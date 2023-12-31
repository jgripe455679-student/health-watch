import { FC, FormEvent, useContext, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Typography, Select, Option } from "@material-tailwind/react";
import type { NewUser, NewUserContextType } from "../@types/auth";
import NewUserContext from "../components/AuthContext";

type BasicAction = {
    type: string;
    pay_load: string | any;
}

type BasicValidityState = {
    first_name_error: boolean;
    middle_name_error: boolean;
    last_name_error: boolean;
    date_of_birth_error: boolean;
    sex_error: boolean;
    relationship_status_error: boolean;
    phone_number_error: boolean;
}


type BasicValidityAction = {
    type: string;
    pay_load: string | any;
}

const initialValidityState: BasicValidityState = {
    first_name_error: false,
    middle_name_error: false,
    last_name_error: false,
    date_of_birth_error: false,
    sex_error: false,
    relationship_status_error: false,
    phone_number_error: false,
}

const formBasicReducer = (state: NewUser, action: BasicAction): NewUser => {
    switch (action.type) {
        case "UPDATE_FIRST_NAME":
            return {
                ...state, first_name: action.pay_load,
            }
        case "UPDATE_MIDDLE_NAME":
            return {
                ...state, middle_name: action.pay_load,
            }
        case "UPDATE_LAST_NAME":
            return {
                ...state, last_name: action.pay_load,
            }
        case "UPDATE_DATE_OF_BIRTH":
            return {
                ...state, date_of_birth: action.pay_load,
            }
        case "UPDATE_SEX":
            return {
                ...state, sex: action.pay_load,
            }
        case "UPDATE_RELATIONSHIP_STATUS":
            return {
                ...state, relationship_status: action.pay_load,
            }
        case "UPDATE_PHONE_NUMBER":
            return {
                ...state, phone_number: action.pay_load,
            }
        default:
            return state;
    }
}

const formBasicValidityReducer = (state: BasicValidityState, action: BasicValidityAction): BasicValidityState => {
    switch (action.type) {
        case "VALIDATE_FIRST_NAME":
            return {
                ...state,
                ...({ first_name_error: action.pay_load.first_name.length > 0 ? false : true }),
            }
        case "VALIDATE_MIDDLE_NAME":
            return {
                ...state,
                ...({ middle_name_error: action.pay_load.middle_name.length > 0 ? false : true }),
            }
        case "VALIDATE_LAST_NAME":
            return {
                ...state,
                ...({ last_name_error: action.pay_load.last_name.length > 0 ? false : true }),
            }
        case "VALIDATE_DATE_OF_BIRTH":
            return {
                ...state,
                ...({ date_of_birth_error: action.pay_load.date_of_birth.length > 0 ? false : true }),
            }
        case "VALIDATE_SEX":
            return {
                ...state,
                ...({ sex_error: action.pay_load.sex.length > 0 ? false : true }),
            }
        case "VALIDATE_RELATIONSHIP_STATUS":
            return {
                ...state,
                ...({ relationship_status_error: action.pay_load.relationship_status.length > 0 ? false : true }),
            }
        case "VALIDATE_PHONE_NUMBER":
            const regEx = /^09\d{9}$/;
            return {
                ...state,
                ...({ phone_number_error: action.pay_load.phone_number.length > 0 && regEx.test(action.pay_load.phone_number) ? false : true }),
            }
        default:
            return state;
    }
}

const Basic: FC = () => {
    const navigate = useNavigate();
    const { newUser, mergeData } = useContext(NewUserContext) as NewUserContextType;
    const [formBasicData, setFormBasicData] = useReducer(formBasicReducer, newUser);
    const [formBasicValidityData, setFormBasicValidityData] = useReducer(formBasicValidityReducer, initialValidityState);
    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const path = `/signup/address`;
        mergeData(formBasicData);
        navigate(path);
    }
    return (
        <>
            <Link className="!absolute top-0 left-0 mt-4 ml-3 text-green-900 hover:underline" to="/signin">Back to Sign in</Link>
            <div className="w-4/5 h-full grid grid-cols-1 gap-2">
                <Typography className="mt-8" variant="h6">Basic Information</Typography>
                <form onSubmit={handleOnSubmit} className="grid grid-cols-1 gap-3">
                    <Input id="first_name" color={formBasicValidityData.first_name_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_FIRST_NAME", pay_load: e.target.value })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_FIRST_NAME", pay_load: formBasicData })} value={formBasicData.first_name} variant="outlined" label="First name" type="text" size="md" required />
                    <Input id="middle_name" color={formBasicValidityData.middle_name_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_MIDDLE_NAME", pay_load: e.target.value })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_MIDDLE_NAME", pay_load: formBasicData })} value={formBasicData.middle_name} variant="outlined" label="Middle name" type="text" size="md" required />
                    <Input id="last_name" color={formBasicValidityData.last_name_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_LAST_NAME", pay_load: e.target.value })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_LAST_NAME", pay_load: formBasicData })} value={formBasicData.last_name} variant="outlined" label="Last name" type="text" size="md" required />
                    <Input id="date_of_birth" color={formBasicValidityData.date_of_birth_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_DATE_OF_BIRTH", pay_load: e.target.value })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_DATE_OF_BIRTH", pay_load: formBasicData })} value={formBasicData.date_of_birth} variant="outlined" label="Date of birth" type="date" size="md" required />
                    <Select id="sex" color={formBasicValidityData.sex_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_SEX", pay_load: e })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_SEX", pay_load: formBasicData })} value={formBasicData.sex} size="md" label="Sex" aria-required>
                        <Option value="m">Male</Option>
                        <Option value="f">Female</Option>
                        <Option value="r">Rather not say</Option>
                    </Select>
                    <Select id="relationship_status" color={formBasicValidityData.relationship_status_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_RELATIONSHIP_STATUS", pay_load: e })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_RELATIONSHIP_STATUS", pay_load: formBasicData })} value={formBasicData.relationship_status} size="md" label="Relationship status" aria-required>
                        <Option value="single">Single</Option>
                        <Option value="in a relationship">In a relationship</Option>
                        <Option value="engaged">Engaged</Option>
                        <Option value="married">Married</Option>
                        <Option value="it's complicated">It's complicated</Option>
                        <Option value="in an open relationship">In an open relationship</Option>
                        <Option value="widowed">Widowed</Option>
                        <Option value="rather not say">Rather not say</Option>
                    </Select>
                    <Input id="phone_number" color={formBasicValidityData.phone_number_error ? "red" : "green"} onChange={(e) => setFormBasicData({ type: "UPDATE_PHONE_NUMBER", pay_load: e.target.value })} onBlur={() => setFormBasicValidityData({ type: "VALIDATE_PHONE_NUMBER", pay_load: formBasicData })} value={formBasicData.phone_number} variant="outlined" label="Mobile Number (09XXXXXXXXX)" size="md" required />
                    <Button disabled={formBasicValidityData.first_name_error === true || formBasicValidityData.middle_name_error === true || formBasicValidityData.last_name_error === true || formBasicValidityData.date_of_birth_error || formBasicValidityData.sex_error || formBasicValidityData.relationship_status_error || formBasicValidityData.phone_number_error} type="submit" className="w-1/4 place-self-end grid grid-cols-1 place-items-center rounded-full" size="sm" color="green">Next</Button>
                </form>
            </div>
        </>
    );
}

export default Basic;
