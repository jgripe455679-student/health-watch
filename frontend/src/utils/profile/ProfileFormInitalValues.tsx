import { ProfileFormValues } from "./types";

const getEmptyProfileFormValues = (): ProfileFormValues => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dateOfBirth: "",
    age: null,
    gender: "",
    maritalStatus: "",
    address: "",
    mobileNumber: "",
    educationalBackground: "",
    occupation: "",
  };
};

export default getEmptyProfileFormValues;
