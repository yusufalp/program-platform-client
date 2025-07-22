import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import { useAuth } from "./hooks/useAuth";
import { getTokenExpiration } from "./lib/getTokenExpiration";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ApplicationPage from "./pages/ApplicationPage";
import NotFoundPage from "./pages/NotFoundPage";

import PrivateRoute from "./common/components/PrivateRoute";
import Header from "./common/components/Header";

import Login from "./features/authentication/components/Login";
import Register from "./features/authentication/components/Register";
import ProfileForm from "./features/profile/ProfileForm/ProfileForm";
import ApplicationForm from "./features/application/ApplicationForm/ApplicationForm";
import Attendance from "./features/attendance/components/Attendance";
import RoleProtected from "./common/components/RoleProtected";
import CohortList from "./features/cohort/components/CohortList";
import CohortDetails from "./features/cohort/components/CohortDetails";

function App() {
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      const tokenExpiration = getTokenExpiration(token);

      if (!tokenExpiration || Date.now() > tokenExpiration) {
        logout();
      }
    }
  }, [logout, token]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile-form" element={<ProfileForm />} />

            <Route element={<RoleProtected allowed={["applicant"]} />}>
              <Route path="/application" element={<ApplicationPage />} />
              <Route path="/application-form" element={<ApplicationForm />} />
            </Route>

            <Route element={<RoleProtected allowed={["admin", "mentor"]} />}>
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/cohorts" element={<CohortList />} />
              <Route path="/cohorts/:cohortId" element={<CohortDetails />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
