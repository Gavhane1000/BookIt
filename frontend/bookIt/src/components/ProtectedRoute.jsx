// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem("access");

  if (!accessToken) {
    // 🚨 No token, redirect to login
    return <Navigate to="/" replace />;
  }

  // ✅ Token exists, render the protected component
  return children;
}
