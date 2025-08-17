import { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import authContext from "./authContext";

type AuthUser = {
  isLogged: boolean;
  role: string;
};

export type AuthContextProps = {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  username: string;
  setUsername: (username: string) => void;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [username, setUsername] = useState<string>("");

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setUsername("");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "{}") {
          const userData: AuthUser = JSON.parse(storedUser);
          const response = await get("auth/info");
          if (response.status === 200) {
            const { role } = userData;
            if (role !== "ADMIN") {
              logout();
            }
            login(userData);
          }
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.error("Error fetching user authentication data", error);
      }
    };

    verifyAuthentication();
  }, []);

  return (
    <authContext.Provider
      value={{ user, login, logout, username, setUsername }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
