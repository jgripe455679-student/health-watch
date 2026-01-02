import { useContext } from "react";
import { ProfileContextProps } from "../utils/profile/ProfileProvider";
import profileContext from "../utils/profile/profileContext";

export const useProfiling: () => ProfileContextProps = () => {
  const context: ProfileContextProps | undefined = useContext(profileContext);
  if (!context) {
    throw new Error("useProfiling must be within an ProfileProvider");
  }
  return context;
};
