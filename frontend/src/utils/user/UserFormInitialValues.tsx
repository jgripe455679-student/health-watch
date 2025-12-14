import { UserFormValues } from "./types";

const getEmptyUserFormValues = (): UserFormValues => {
  return {
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
};

export default getEmptyUserFormValues;
