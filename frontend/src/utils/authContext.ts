import { createContext } from "react";
import { AuthContextProps } from "./AuthProvider";

const authContext = createContext<AuthContextProps | undefined>(undefined);

export default authContext;