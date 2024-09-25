import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_KEY, AUTH_KEY } from "../lib/client";
import useAuth from "../hooks/useAuth";

const UnprotectedRoutes: FC = () => {
  const { auth, setAuth } = useAuth();
  const link = `/${auth.defaultPath}`;

  useEffect(() => {
    const isUserLoggedIn = () => {
      const accessToken = localStorage.getItem(ACCESS_KEY);
      const user_auth = JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
      if (accessToken && !user_auth.isLoggedIn) {
        setAuth({
          ...auth,
          isLoggedIn: !auth.isLoggedIn,
          currentPath: "",
        });
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    };
    isUserLoggedIn();
  }, []);
  return auth.isLoggedIn ? <Navigate to={link} replace={true} /> : <Outlet />;
};

export default UnprotectedRoutes;
