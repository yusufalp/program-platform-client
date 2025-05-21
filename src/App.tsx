import { Route, Routes } from "react-router-dom";

import "./App.css";

import CreateProfile from "./components/profile/CreateProfile";
import DashboardPage from "./pages/dashboard";
import Header from "./components/shared/Header";
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/profile";
import Register from "./components/authentication/Register";
import NotFoundPage from "./pages/notFound";

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
          <Route path="/create-profile" element={<CreateProfile />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
