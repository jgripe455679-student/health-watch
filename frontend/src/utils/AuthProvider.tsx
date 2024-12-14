import { createContext, useEffect, useState } from "react";
import { get } from "../api/apiClient";

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

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

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
            login(userData);
          }
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.error(error);
      }
    };

    verifyAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
