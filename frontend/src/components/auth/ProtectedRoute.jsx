import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

export default function ProtectedRoute({ children, allowedRoles = ['user', 'admin'] }) {
  const { isLoading, isAuthenticated, hasRole, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
        <div className="w-12 h-12 border-4 border-olympic-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasAccess = allowedRoles.some((role) => hasRole(role));

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return children;
}