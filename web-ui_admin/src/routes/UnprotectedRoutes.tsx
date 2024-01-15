import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Login from "../pages/Login";

const UnprotectedRoutes: FC = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default UnprotectedRoutes;