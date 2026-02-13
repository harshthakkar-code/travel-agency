import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const RequireAuth = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const userRole = localStorage.getItem("userRole"); // Still using localStorage for role for now

  if (loading) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  // Not authenticated
  if (!currentUser) {
    return <Navigate
      to="/admin/login"
      state={{ from: location }}
      replace
    />;
  }

  // Role-based authorization check
  if (allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect to appropriate page based on user role or home
      const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/';
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If everything is good, render children
  return children;
};

export default RequireAuth;

