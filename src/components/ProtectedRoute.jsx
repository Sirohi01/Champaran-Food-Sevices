import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isSessionExpired, logoutUser } from '../services/coreServices';

const ProtectedRoute = () => {
  // Check if user is authenticated and session is not expired
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if session has expired
  if (isSessionExpired()) {
    logoutUser();
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;


