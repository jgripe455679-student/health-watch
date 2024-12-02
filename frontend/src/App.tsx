import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import AuthProvider from "./utils/AuthProvider";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
