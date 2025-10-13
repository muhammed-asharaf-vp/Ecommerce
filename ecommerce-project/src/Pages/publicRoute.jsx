import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // Only redirect admin users
  if (user?.role === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  // Normal users and visitors can access public page
  return children;
};

export default PublicRoute;
