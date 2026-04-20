import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import PrivateRoutes from "./components/PrivateRoutes";
import ProfilingLayout from "./layouts/ProfilingLayout";
import UserManagementLayout from "./layouts/UserManagementLayout";
import Dashboard from "./pages/Dashboard";
import HealthRecord from "./pages/HealthRecord";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/profiling/EditProfile";
import NewProfile from "./pages/profiling/NewProfile";
import Profiling from "./pages/profiling/Profiling";
import Reports from "./pages/Reports";
import ResetPassword from "./pages/ResetPassword";
import EditUser from "./pages/user-management/EditUser";
import NewUser from "./pages/user-management/NewUser";
import UserManagement from "./pages/user-management/UserManagement";
import AppUtilityProvider from "./utils/AppUtilityProvider";
import AuthProvider from "./utils/AuthProvider";
import HealthConditionsProvider from "./utils/HealthConditionsProvider";
import ProfileProvider from "./utils/profile/ProfileProvider";
import UserProvider from "./utils/user/UserProvider";
import ViewProfile from "./pages/profiling/ViewProfile";

const App: React.FC = () => {
  return (
    <Router>
      <AppUtilityProvider>
        <AuthProvider>
          <UserProvider>
            <ProfileProvider>
              <Routes>
                <Route
                  element={
                    <HealthConditionsProvider>
                      <PrivateRoutes />
                    </HealthConditionsProvider>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/user-management"
                    element={<UserManagementLayout />}
                  >
                    <Route index element={<UserManagement />} />
                    <Route path="new" element={<NewUser />} />
                    <Route path="edit/:id" element={<EditUser />} />
                  </Route>
                  <Route path="/profiling" element={<ProfilingLayout />}>
                    <Route index element={<Profiling />} />
                    <Route path="new" element={<NewProfile />} />
                    <Route path="edit/:id" element={<EditProfile />} />
                    <Route path="view/:id" element={<ViewProfile />} />
                  </Route>
                  <Route path="/health-record" element={<HealthRecord />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
                <Route path="/" element={<Loader />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProfileProvider>
          </UserProvider>
        </AuthProvider>
      </AppUtilityProvider>
    </Router>
  );
};

export default App;
