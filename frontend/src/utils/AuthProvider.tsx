import { useEffect, useState } from "react";
import { get } from "../api/apiClient";
import authContext from "./authContext";
import { useAppUtility } from "../hooks/useAppUtility";

interface UserLogged {
  username: string;
  role: string;
  permissions: string[];
}

type AuthUser = UserLogged & {
  isLogged: boolean;
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
  const [currentUser, setCurrentUser] = useState<UserLogged | null>(null);
  const { stripRolePrefix } = useAppUtility();

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    setUsername("");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser == null) {
          return;
        }
        if (storedUser && storedUser !== "{}") {
          const response = await get("auth/info");
          if (response.status === 200) {
            setCurrentUser(response.data as UserLogged);
          }
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.error("Error fetching user authentication data | ", error);
      }
    };

    const isResourceOwner = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser == null) {
          return;
        }
        if (currentUser) {
          const userData: AuthUser = JSON.parse(storedUser);
          const { role } = userData;
          if (role === stripRolePrefix(currentUser.role)) {
            login(userData);
          } else {
            logout();
          }
        }
      } catch (error) {
        logout();
        console.error("Error session mismatch detected: ", error);
      }
    }

    verifyAuthentication();
    isResourceOwner();
  }, [currentUser, stripRolePrefix]);

  return (
    <authContext.Provider
      value={{ user, login, logout, username, setUsername }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
