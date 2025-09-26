import { Navigate, Outlet } from 'react-router-dom';

// Simple placeholder auth. Replace with real auth logic later.
const useAuth = () => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
  return { isAuthenticated: stored === 'true' };
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;


