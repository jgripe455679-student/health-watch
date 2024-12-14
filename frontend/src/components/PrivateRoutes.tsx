import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes: React.FC = () => {
  const { user } = useAuth();
  return user?.isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
