import { useContext } from "react";
import { UserContextProps } from "../utils/user/UserProvider";
import userContext from "../utils/user/userContext";

export const useUserManagement: () => UserContextProps = () => {
  const context: UserContextProps | undefined = useContext(userContext);
  if (!context) {
    throw new Error("useUserManagement must be within an UserProvider");
  }
  return context;
};
