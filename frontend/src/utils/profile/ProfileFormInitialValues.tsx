import { ProfileFormValues } from "./types";

const getEmptyProfileFormValues = (): ProfileFormValues => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    maritalStatus: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",
    educationalBackground: "",
    occupation: "",
  };
};

export default getEmptyProfileFormValues;
