import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

/** Redirects to /admin/login if the session is not authenticated. */
const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default AdminGuard;
