// src/ProtectedRoute.jsx
import { useAuthenticationStatus } from "@nhost/react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
