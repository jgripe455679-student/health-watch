import { createContext } from "react";
import { UserContextProps } from "./UserProvider";

const userContext = createContext<UserContextProps | undefined>(undefined);

export default userContext;
