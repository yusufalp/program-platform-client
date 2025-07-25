import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { getTokenExpiration } from "../../lib/getTokenExpiration";

export default function PrivateRoute() {
  const { token, logout } = useAuth();

  const tokenExpiration = token ? getTokenExpiration(token) : null;

  if (!token || !tokenExpiration || Date.now() > tokenExpiration) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
