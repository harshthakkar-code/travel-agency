import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Not authenticated - redirect to login with return path
  if (!role || !token) {
    return <Navigate 
      to="/admin/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // Role-based authorization check
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to appropriate page based on user role
    const redirectPath = role === 'admin' ? '/admin/dashboard' : '/tour-packages';
    return <Navigate to={redirectPath} replace />;
  }
  // If everything is good, render children
  return children;
};

export default RequireAuth;
