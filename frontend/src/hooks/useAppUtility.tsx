import { useContext } from "react";
import {
    AppUtilityContext,
    AppUtilityContextProps,
} from "../utils/AppUtilityProvider";

export const useAppUtility: () => AppUtilityContextProps = () => {
  const context: AppUtilityContextProps | undefined =
    useContext(AppUtilityContext);
  if (!context) {
    throw new Error("useAppUtility must be used within an AppUtilityProvider");
  }
  return context;
};
