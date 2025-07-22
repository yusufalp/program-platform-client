import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface RoleProtectedProps {
  allowed: string[];
  redirectTo?: string;
}

export default function RoleProtected({
  allowed,
  redirectTo = "/dashboard",
}: RoleProtectedProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowed.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
