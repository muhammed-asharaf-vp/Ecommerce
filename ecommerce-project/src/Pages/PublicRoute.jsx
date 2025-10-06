// src/Component/PublicRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;