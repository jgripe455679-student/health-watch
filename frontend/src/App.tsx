import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import HealthRecord from "./pages/HealthRecord";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profiling from "./pages/Profiling";
import Reports from "./pages/Reports";
import ResetPassword from "./pages/ResetPassword";
import UserManagement from "./pages/UserManagement";
import AppUtilityProvider from "./utils/AppUtilityProvider";
import AuthProvider from "./utils/AuthProvider";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppUtilityProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/profiling" element={<Profiling />} />
              <Route path="/health-record" element={<HealthRecord />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/" element={<Loader />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppUtilityProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
