import { createContext } from "react";
import { AppUtilityContextProps } from "./AppUtilityProvider";

const appUtilityContext = createContext<AppUtilityContextProps | undefined>(undefined);

export default appUtilityContext