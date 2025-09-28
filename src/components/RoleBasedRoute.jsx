import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, DASHBOARD_ROUTES, USER_ROLES } from '../services/coreServices';

const RoleBasedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();

  // Super admin can access everything
  if (userRole === USER_ROLES.SUPER_ADMIN) {
    return children;
  }

  // Check if user has the required role
  if (userRole !== requiredRole) {
    // Redirect to user's dashboard
    const dashboardPath = DASHBOARD_ROUTES[userRole] || '/dashboard/user';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default RoleBasedRoute;