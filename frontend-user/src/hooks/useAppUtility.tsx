import { useContext } from "react";
import { AppUtilityContextProps } from "../utils/AppUtilityProvider";
import appUtilityContext from "../utils/appUtilityContext";

export const useAppUtility: () => AppUtilityContextProps = () => {
  const context: AppUtilityContextProps | undefined =
    useContext(appUtilityContext);
  if (!context) {
    throw new Error("useAppUtility must be used within an AppUtilityProvider");
  }
  return context;
};
