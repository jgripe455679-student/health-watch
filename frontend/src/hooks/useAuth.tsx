import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../utils/AuthProvider";

export const useAuth: () => AuthContextProps = () => {
  const context: AuthContextProps | undefined = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
