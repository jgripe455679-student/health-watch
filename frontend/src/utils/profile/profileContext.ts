import { createContext } from "react";
import { ProfileContextProps } from "./ProfileProvider";

const profileContext = createContext<ProfileContextProps | undefined>(
  undefined,
);

export default profileContext;
