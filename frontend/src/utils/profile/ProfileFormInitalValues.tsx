import { ProfileFormValues } from "./types";

const getEmptyProfileFormValues = (): ProfileFormValues => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    address: "",
    mobileNumber: "",
    occupation: "",
    educationalBackground: "",
    householdSize: null,
    incomeBracket: "",
  };
};

export default getEmptyProfileFormValues;
