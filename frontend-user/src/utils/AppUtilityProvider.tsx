import React from "react";
import appUtilityContext from "./appUtilityContext";

export type AppUtilityContextProps = {
  isMobileNumberValid: (mobileNumber: string) => boolean;
  formatLocalDateTime: (dateString: string) => string;
};

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
  const isMobileNumberValid = (mobileNumber: string): boolean => {
    const mobileNumberPattern = /^09\d{9}$/;
    return mobileNumberPattern.test(mobileNumber);
  };
  return (
    <appUtilityContext.Provider
      value={{ isMobileNumberValid, formatLocalDateTime }}
    >
      {children}
    </appUtilityContext.Provider>
  );
};

export default AppUtilityProvider;
