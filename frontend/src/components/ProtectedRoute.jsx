import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute Component
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "user" or "admin"

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect unauthorized users to Home
  }

  return <Outlet />;
};

export default ProtectedRoute;
