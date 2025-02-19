import React, { createContext } from "react";

export type AppUtilityContextProps = {
  formatLocalDateTime: (dateString: string) => string;
  stripRolePrefix: (role: string) => string;
  isMobileNumberValid: (mobileNumber: string) => boolean;
  isPasswordValid: (password: string) => boolean;
};

export const AppUtilityContext = createContext<
  AppUtilityContextProps | undefined
>(undefined);

const AppUtilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const formatLocalDateTime = (dateString: string | null) => {
    if (!dateString) {
      return "";
    }
    const dateTime = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return dateTime.toLocaleString("en-US", options);
  };
  const stripRolePrefix = (role: string): string => {
    return role.replace("ROLE_", "");
  };
  const isMobileNumberValid = (mobileNumber: string): boolean => {
    const mobileNumberPattern = /^09\d{9}$/;
    return mobileNumberPattern.test(mobileNumber);
  };
  const isPasswordValid = (password: string): boolean => {
    let isValid = true;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    const isLengthValid = password.length >= 8;
    if (!hasUpperCase || !hasNumber || !hasSymbol || !isLengthValid) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <AppUtilityContext.Provider
      value={{
        formatLocalDateTime,
        stripRolePrefix,
        isMobileNumberValid,
        isPasswordValid,
      }}
    >
      {children}
    </AppUtilityContext.Provider>
  );
};

export default AppUtilityProvider;
