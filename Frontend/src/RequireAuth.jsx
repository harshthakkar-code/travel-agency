import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  // Read from localStorage (as shown in your screenshot)
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) {
    // Not logged in
    return <Navigate to="/admin/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Invalid role for route
    return <Navigate to="/" replace />;
  }
  // If everything is good, render children
  return children;
};

export default RequireAuth;
