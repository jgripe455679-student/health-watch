import { createContext } from "react";
import type { NewUserContextType } from "../@types/auth";

const NewUserContext = createContext<NewUserContextType | null>(null);

export default NewUserContext;