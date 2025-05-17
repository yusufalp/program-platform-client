import { Route, Routes } from "react-router-dom";

import "./App.css";

import DashboardPage from "./pages/dashboard";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
