import { useEffect, useRef, useState } from "react";
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
  const hasVerifyAuthRun = useRef(false);
  const hasVerifyAuthorizationRun = useRef(false);

  const encodeLoginInfo = (userData: AuthUser): string => {
    const jsonString = JSON.stringify(userData);
    const encodedString: string = btoa(jsonString);
    return encodedString;
  }

  const login = (userData: AuthUser) => {
    if (userData === null) {
      return;
    }
    setUser(userData);
    const encodedString: string = encodeLoginInfo(userData);
    sessionStorage.setItem("session_logininfo", encodedString);
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    setUsername("");
    sessionStorage.removeItem("session_logininfo");
  };

  const decodeSession = (uniqueId: string | null | undefined): AuthUser | undefined => {
    if (!uniqueId) {
      return;
    }
    const decodeJson = atob(uniqueId);
    const storedLoginInfo: AuthUser = JSON.parse(decodeJson);
    return storedLoginInfo;
  }

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const storedLoginInfo = sessionStorage.getItem("session_logininfo");
        const decodedSession: AuthUser | undefined = decodeSession(storedLoginInfo);
        if (decodedSession?.isLogged) {
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

    if (!hasVerifyAuthRun.current) {
      verifyAuthentication();
      hasVerifyAuthRun.current = true;
    }

  }, []);

  useEffect(() => {
    const verifyAuthorization = () => {
      try {
        const storedLoginInfo = sessionStorage.getItem("session_logininfo");
        const decodedSession: AuthUser | undefined = decodeSession(storedLoginInfo);
        if (currentUser) {
          if (decodedSession?.role === stripRolePrefix(currentUser.role)) {
            setUser(decodedSession);
          } else {
            logout();
          }
        }
      } catch (error) {
        logout();
        console.error("Error session mismatch detected: ", error);
      }
    }
    if (currentUser) {
      if (!hasVerifyAuthorizationRun.current) {
        verifyAuthorization()
        hasVerifyAuthorizationRun.current = true;
      }
    }
  }, [currentUser, stripRolePrefix, username])

  return (
    <authContext.Provider
      value={{ user, login, logout, username, setUsername }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
