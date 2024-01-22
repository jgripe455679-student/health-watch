import { FC, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../components/AuthLayout";
import MainLayout from "../components/MainLayout";
import NotFound from "../pages/NotFound";
import Users from "../pages/Users";
import { AuthContext } from "../components/AuthContext";
import { AuthContextType } from "../@types/auth";
import UnprotectedRoutes from "./UnprotectedRoutes";

const AppRouter: FC = () => {
    const { authStatus, updateAuthStatus } = useContext(AuthContext) as AuthContextType;
    useEffect(() => {
        const isUserLoggedIn = () => {
            const token = JSON.parse(localStorage.getItem("token") || "{}");
            const auth = sessionStorage.getItem("auth");
            const isAuthenticated = (auth === "true");
            if (token.access && isAuthenticated) {
                updateAuthStatus();
            }
        }
        isUserLoggedIn();
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={authStatus ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route element={<UnprotectedRoutes />}>
                    <Route element={<AuthLayout />}>
                        <Route
                            path="/login"
                            element={<Login />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;