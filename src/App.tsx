import { Route, Routes } from "react-router-dom";

import "./App.css";

import DashboardPage from "./pages/DashboardPage";
import Header from "./common/components/Header";
import Login from "./features/authentication/components/Login";
import PrivateRoute from "./common/components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import Register from "./features/authentication/components/Register";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileForm from "./features/profile/ProfileForm/ProfileForm";

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
          <Route path="/profile-form" element={<ProfileForm />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
