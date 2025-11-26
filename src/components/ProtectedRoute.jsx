// components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userRole, allowedRoles, children }) => {
  if (!allowedRoles.includes(userRole)) {
    // redirect to home or not authorized page
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
