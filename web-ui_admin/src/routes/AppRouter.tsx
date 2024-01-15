import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../components/AuthLayout";
import MainLayout from "../components/MainLayout";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route
                        path="/login"
                        element={<Login />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={<Error />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;