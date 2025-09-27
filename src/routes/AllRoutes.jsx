import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Loading from '../components/Loading';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { isAuthenticated, getUserRole, DASHBOARD_ROUTES } from '../services/coreServices';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const RoleDashboard = lazy(() => import('../pages/RoleDashboard'));
const SuperAdminDashboard = lazy(() => import('../pages/dashboards/SuperAdminDashboard'));
const AdminDashboard = lazy(() => import('../pages/dashboards/AdminDashboard'));
const ManagerDashboard = lazy(() => import('../pages/dashboards/ManagerDashboard'));
const SalesmanDashboard = lazy(() => import('../pages/dashboards/SalesmanDashboard'));
const PurchaseDashboard = lazy(() => import('../pages/dashboards/PurchaseDashboard'));
const UserDashboard = lazy(() => import('../pages/dashboards/UserDashboard'));
const CreateUser = lazy(() => import('../pages/CreateUser'));
const CreateStore = lazy(() => import('../pages/CreateStore'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const OffersPage = lazy(() => import('../pages/OffersPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

// Component to handle role-based redirection
const RoleBasedRedirect = () => {
  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      const dashboardPath = DASHBOARD_ROUTES[role] || '/dashboard';
      window.location.href = dashboardPath;
    } else {
      window.location.href = '/login';
    }
  }, []);

  return <Loading fullScreen />;
};

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            {/* Root dashboard route - will redirect to role-specific dashboard */}
            <Route path="dashboard" element={<RoleDashboard />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Dashboard />} />
              <Route path="super-admin" element={<SuperAdminDashboard />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="manager" element={<ManagerDashboard />} />
              <Route path="salesman" element={<SalesmanDashboard />} />
              <Route path="purchase" element={<PurchaseDashboard />} />
              <Route path="user" element={<UserDashboard />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route path="create-store" element={<CreateStore />} />
            </Route>
            
            {/* Catch-all route for any unknown dashboard paths */}
            <Route path="*" element={<RoleBasedRedirect />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;


