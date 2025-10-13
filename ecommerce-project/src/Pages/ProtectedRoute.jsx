import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loader while AuthContext initializes
  if (loading) return <div>Loading...</div>;

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → redirect to appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    if (user.role === "admin")
      return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/" replace />; // normal user dashboard/home
  }

  // Correct user & role → allow access
  return children;
};

export default ProtectedRoute;
