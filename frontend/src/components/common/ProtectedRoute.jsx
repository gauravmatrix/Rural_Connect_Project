import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import Loader from "./Loader";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, isReady, isAuthenticated } = useAuth();

  if (!isReady) return <Loader label="Preparing secure session..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
