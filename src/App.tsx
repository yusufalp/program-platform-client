import { Route, Routes } from "react-router-dom";

import "./App.css";

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

function App() {
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
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
