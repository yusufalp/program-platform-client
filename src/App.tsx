import { Route, Routes } from "react-router-dom";

import "./App.css";

import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ApplicationPage from "./pages/ApplicationPage";

import PrivateRoute from "./common/components/PrivateRoute";

import Header from "./common/components/Header";
import Login from "./features/authentication/components/Login";
import Register from "./features/authentication/components/Register";
import ProfileForm from "./features/profile/ProfileForm/ProfileForm";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/:userId" element={<DashboardPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/application/:userId" element={<ApplicationPage />} />
          <Route path="/profile-form" element={<ProfileForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
