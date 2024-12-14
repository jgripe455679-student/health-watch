import React, { createContext } from "react";

export type AppUtilityContextProps = {
  formatLocalDateTime: (dateString: string) => string;
  stripRolePrefix: (role: string) => string;
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
  return (
    <AppUtilityContext.Provider
      value={{ formatLocalDateTime, stripRolePrefix }}
    >
      {children}
    </AppUtilityContext.Provider>
  );
};

export default AppUtilityProvider;
