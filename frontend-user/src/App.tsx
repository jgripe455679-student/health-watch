import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import PrivateRoutes from "./components/PrivateRoutes";
import HealthRecord from "./pages/HealthRecord";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profiling from "./pages/Profiling";
import ResetPassword from "./pages/ResetPassword";
import AppUtilityProvider from "./utils/AppUtilityProvider";
import AuthProvider from "./utils/AuthProvider";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppUtilityProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/health-record" element={<HealthRecord />} />
              <Route path="/profiling" element={<Profiling />} />
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
