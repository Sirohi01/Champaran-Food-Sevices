import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  getUserData, 
  getUserRole, 
  logoutUser, 
  DASHBOARD_ROUTES, 
  isAuthenticated, 
  isSessionExpired,
  isDevelopment
} from '../services/coreServices';
import Loading from '../components/Loading';

const RoleDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check authentication and session status
        if (!isAuthenticated()) {
          if (isDevelopment()) {
            console.log('Not authenticated, redirecting to login');
          }
          navigate('/login', { 
            state: { from: location.pathname },
            replace: true 
          });
          return;
        }

        // Check if session is expired
        if (isSessionExpired()) {
          if (isDevelopment()) {
            console.log('Session expired, logging out');
          }
          logoutUser();
          navigate('/login', { 
            state: { from: location.pathname, sessionExpired: true },
            replace: true 
          });
          return;
        }

        const role = getUserRole();
        const user = getUserData();
        
        if (!role || !user) {
          if (isDevelopment()) {
            console.log('No role or user data found, logging out');
          }
          logoutUser();
          navigate('/login', { 
            state: { from: location.pathname, authError: true },
            replace: true 
          });
          return;
        }

        // Get the current path and the path we should be on
        const currentPath = location.pathname;
        const roleDashboardPath = DASHBOARD_ROUTES[role] || '/dashboard';
        
        // Only redirect if we're not already on a valid dashboard path
        if (!currentPath.startsWith(roleDashboardPath)) {
          if (isDevelopment()) {
            console.log(`Redirecting to role-specific dashboard: ${roleDashboardPath}`);
          }
          navigate(roleDashboardPath, { replace: true });
          return;
        }
        
        // If we get here, we're on the correct dashboard
        setLoading(false);
      } catch (err) {
        console.error('Error in RoleDashboard:', err);
        setError('An error occurred while loading the dashboard');
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [navigate, location.pathname]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-4"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              logoutUser();
              navigate('/login');
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading fullScreen />;
  }

  // Render the nested routes
  return <Outlet />;
};

export default RoleDashboard;
