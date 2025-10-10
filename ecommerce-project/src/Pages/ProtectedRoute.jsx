// // src/Component/ProtectedRoute.jsx
// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" replace />;
//   }

  

//   return children;
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // 🚫 Not logged in → redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚷 Logged in but not allowed (wrong role)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // 🚪 Logged in user visiting login/signup → send to home
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

