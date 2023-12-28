import React, { FC, useState, useEffect, useReducer } from "react";
import BackButton from "../components/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Input, Select, Option, Button } from "@material-tailwind/react";

type AddressState = {
    address_line_one: string;
    address_line_two: string;
    address_line_three: string;
    province: string;
    city: string;
    barangay: string;
    zip_code: number;
}

type AddressAction = {
    type: string;
    pay_load: string | any;
}

const initialState: AddressState = {
    address_line_one: "",
    address_line_two: "",
    address_line_three: "",
    province: "",
    city: "",
    barangay: "",
    zip_code: 0,
}

type AddressValidityState = {
    address_line_one_error: boolean;
    province_error: boolean;
    city_error: boolean;
    barangay_error: boolean;
    zip_code_error: boolean;
}

type AddressValidityAction = {
    type: string;
    pay_load: string | any;
}

const initialValidityState: AddressValidityState = {
    address_line_one_error: false,
    province_error: false,
    city_error: false,
    barangay_error: false,
    zip_code_error: false,
}

const formAddressReducer = (state: AddressState, action: AddressAction): AddressState => {
    switch (action.type) {
        case "UPDATE_ADDRESS_LINE_ONE":
            return {
                ...state, address_line_one: action.pay_load,
            }
        case "UPDATE_ADDRESS_LINE_TWO":
            return {
                ...state, address_line_two: action.pay_load,
            }
        case "UPDATE_ADDRESS_LINE_THREE":
            return {
                ...state, address_line_two: action.pay_load,
            }
        case "UPDATE_PROVINCE":
            return {
                ...state, province: action.pay_load,
            }
        case "UPDATE_CITY":
            return {
                ...state, city: action.pay_load,
            }
        case "UPDATE_BARANGAY":
            return {
                ...state, barangay: action.pay_load,
            }
        case "UPDATE_ZIP_CODE":
            return {
                ...state, zip_code: action.pay_load,
            }
        default:
            return state;
    }
}

const formAddressValidityReducer = (state: AddressValidityState, action: AddressValidityAction): AddressValidityState => {
    switch (action.type) {
        case "VALIDATE_ADDRESS_LINE_ONE":
            return {
                ...state,
                ...({ address_line_one_error: action.pay_load.address_line_one.length > 0 ? false : true }),
            }
        case "VALIDATE_ADDRESS_LINE_TWO":
            return {
                ...state,
                ...({ address_line_two_error: action.pay_load.address_line_two.length > 0 ? false : true }),
            }
        case "VALIDATE_ADDRESS_LINE_THREE":
            return {
                ...state,
                ...({ address_line_three_error: action.pay_load.address_line_three.length > 0 ? false : true }),
            }
        case "VALIDATE_PROVINCE":
            return {
                ...state,
                ...({ province_error: action.pay_load.province.length > 0 ? false : true }),
            }
        case "VALIDATE_CITY":
            return {
                ...state,
                ...({ city_error: action.pay_load.city.length > 0 ? false : true }),
            }
        case "VALIDATE_BARANGAY":
            return {
                ...state,
                ...({ barangay_error: action.pay_load.barangay.length > 0 ? false : true }),
            }
        case "VALIDATE_ZIP_CODE":
            const regEx = /^\d{4}$/;
            return {
                ...state,
                ...({ zip_code_error: action.pay_load.zip_code.length > 0 && regEx.test(action.pay_load.zip_code) ? false : true }),
            }
        default:
            return state;
    }
}

const Address: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [formAddressData, setFormAddressData] = useReducer(formAddressReducer, initialState);
    const [formAddressValidityData, setFormAddressValidityData] = useReducer(formAddressValidityReducer, initialValidityState);
    useEffect(() => {
        // Fetch the data (provinces)
        fetch("https://psgc.gitlab.io/api/regions/110000000/provinces/")
            .then(response => response.json())
            .then(data => setProvinces(data))
            .catch(error => console.error(error))
    }, []);
    const handleOnSelectedProvince = (code: any) => {
        // Fetch the data (cities)
        fetch(`https://psgc.gitlab.io/api/provinces/${code}/cities/`)
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.error(error));
    }
    const handleOnSelectedCity = (code: any) => {
        // Fetch the data (barangays)
        fetch(`https://psgc.gitlab.io/api/cities/${code}/barangays/`)
            .then(response => response.json())
            .then(data => setBarangays(data))
            .catch(error => console.error(error));
    }
    const onButtonPress = (event: React.FormEvent) => {
        event.preventDefault();
        const path = `/signup/credential`;
        navigate(path, { state: { ...location.state, ...formAddressData } });
    }
    return (
        <>
            <BackButton onClick={() => navigate(-1)} />
            <div className="w-4/5 h-full grid grid-cols-1 gap-2">
                <Typography className="mt-8" variant="h6">Address</Typography>
                <form onSubmit={onButtonPress} className="grid grid-cols-1 gap-3">
                    <Input id="address_line_one" color={formAddressValidityData.address_line_one_error ? "red" : "green"} onChange={(e) => setFormAddressData({ type: "UPDATE_ADDRESS_LINE_ONE", pay_load: e.target.value.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_ADDRESS_LINE_ONE", pay_load: formAddressData })} type="text" label="Address line 1" size="md" variant="outlined" required />
                    <Input id="address_line_two" color="green" onChange={(e) => setFormAddressData({ type: "UPDATE_ADDRESS_LINE_TWO", pay_load: e.target.value.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_ADDRESS_LINE_TWO", pay_load: formAddressData })} type="text" label="Address line 2" size="md" variant="outlined" />
                    <Input id="address_line_three" color="green" onChange={(e) => setFormAddressData({ type: "UPDATE_ADDRESS_LINE_THREE", pay_load: e.target.value.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_ADDRESS_LINE_THREE", pay_load: formAddressData })} type="text" label="Address line 3" size="md" variant="outlined" />
                    <Select id="province" color={formAddressValidityData.province_error ? "red" : "green"} onChange={(e) => setFormAddressData({ type: "UPDATE_PROVINCE", pay_load: e?.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_PROVINCE", pay_load: formAddressData })} size="md" label="Select a province" aria-required selected={(element) => {
                        if (element) {
                            const selectedValue = element.props["data-id"];
                            handleOnSelectedProvince(selectedValue);
                            return element.props.value;
                        }
                    }}>
                        {provinces.length > 0 ? provinces.map((province: any) => {
                            return <Option key={province.code} data-id={province.code} value={province.name}>{province.name}</Option>
                        }) : <Option disabled>Provinces not found</Option>}
                    </Select>
                    <Select id="city" color={formAddressValidityData.city_error ? "red" : "green"} onChange={(e) => setFormAddressData({ type: "UPDATE_CITY", pay_load: e?.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_CITY", pay_load: formAddressData })} size="md" label="Select a city" aria-required selected={(element) => {
                        if (element) {
                            const selectedValue = element.props["data-id"];
                            handleOnSelectedCity(selectedValue);
                            return element.props.value;
                        }
                    }}>
                        {cities.length > 0 ? cities.map((city: any) => {
                            return <Option key={city.code} data-id={city.code} value={city.name}>{city.name}</Option>
                        }) : <Option disabled>Cities not found</Option>}
                    </Select>
                    <Select id="barangay" color={formAddressValidityData.barangay_error ? "red" : "green"} onChange={(e) => setFormAddressData({ type: "UPDATE_BARANGAY", pay_load: e?.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_BARANGAY", pay_load: formAddressData })} size="md" label="Select a barangay" aria-required>
                        {barangays.length > 0 ? barangays.map((barangay: any) => {
                            return <Option key={barangay.code} value={barangay.name}>{barangay.name}</Option>
                        }) : <Option disabled>Barangays not found</Option>}
                    </Select>
                    <Input id="zip_code" color={formAddressValidityData.zip_code_error ? "red" : "green"} onChange={(e) => setFormAddressData({ type: "UPDATE_ZIP_CODE", pay_load: e.target.value.trim().toLowerCase() })} onBlur={() => setFormAddressValidityData({ type: "VALIDATE_ZIP_CODE", pay_load: formAddressData })} type="text" label="Zip code" size="md" variant="outlined" required />
                    <Button disabled={formAddressValidityData.address_line_one_error === true || formAddressValidityData.province_error === true || formAddressValidityData.city_error === true || formAddressValidityData.barangay_error === true || formAddressValidityData.zip_code_error === true} type="submit" className="w-1/4 place-self-end grid grid-cols-1 place-items-center rounded-full" size="sm" color="green">Next</Button>
                </form>
            </div>
        </>
    );
}

export default Address;