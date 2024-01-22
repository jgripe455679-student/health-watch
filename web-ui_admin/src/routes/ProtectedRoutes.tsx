import { FC, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { AuthContextType } from "../@types/auth";

const ProtectedRoutes: FC = () => {
    const { authStatus } = useContext(AuthContext) as AuthContextType;
    return (
        authStatus ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoutes;