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
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const verifyAuthentication = async () => {
      try {
        const response = await get("auth/info");
        if (response.status === 200) {
          console.log(response.data);
          const userData: AuthUser = JSON.parse(storedUser || "{}");
          login(userData);
        }
      } catch (error) {
        logout();
        console.error(error);
      }
    };
    if (storedUser) {
      verifyAuthentication();
    }
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
