import { useContext } from "react";
import { AuthContextProps } from "../utils/AuthProvider";
import authContext from "../utils/authContext";

export const useAuth: () => AuthContextProps = () => {
  const context: AuthContextProps | undefined = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
