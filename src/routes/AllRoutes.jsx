import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Loading from '../components/Loading';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleBasedRoute from '../components/RoleBasedRoute';
import { isAuthenticated, getUserRole, DASHBOARD_ROUTES, USER_ROLES } from '../services/coreServices';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const RoleDashboard = lazy(() => import('../pages/RoleDashboard'));
const SuperAdminDashboard = lazy(() => import('../roles/super-admin/pages/SuperAdminDashboard'));
const AdminDashboard = lazy(() => import('../roles/admin/pages/AdminDashboard'));
const ManagerDashboard = lazy(() => import('../roles/manager/pages/ManagerDashboard'));
const SalesmanDashboard = lazy(() => import('../roles/salesman/pages/SalesmanDashboard'));
const PurchaseDashboard = lazy(() => import('../roles/purchase/pages/PurchaseDashboard'));
const UserDashboard = lazy(() => import('../roles/user/pages/UserDashboard'));
const CreateUser = lazy(() => import('../pages/CreateUser'));
const UserManagement = lazy(() => import('../pages/UserManagement'));
const CreateStore = lazy(() => import('../pages/CreateStore'));
const StoreManagement = lazy(() => import('../pages/StoreManagement'));
const StoresPage = lazy(() => import('../pages/StoresPage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const OffersPage = lazy(() => import('../pages/OffersPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const VendorPage = lazy(() => import('../pages/VendorPage'));
const CreateVendor = lazy(() => import('../pages/CreateVendor'));

const RoleBasedRedirect = () => {
  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      const dashboardPath = DASHBOARD_ROUTES[role] || '/dashboard/user';
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
                  
                  {/* Role-based dashboard routes with permission checks */}
                  <Route path="super-admin" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.SUPER_ADMIN}>
                      <SuperAdminDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="admin" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.ADMIN}>
                      <AdminDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="manager" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.MANAGER}>
                      <ManagerDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="salesman" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.SALES_MAN}>
                      <SalesmanDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="purchase" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.PURCHASE_MAN}>
                      <PurchaseDashboard />
                    </RoleBasedRoute>
                  } />
                  <Route path="user" element={
                    <RoleBasedRoute requiredRole={USER_ROLES.USER}>
                      <UserDashboard />
                    </RoleBasedRoute>
                  } />
              
              {/* User Management Routes */}
              <Route path="user-management" element={<UserManagement />} />
              <Route path="create-user" element={<CreateUser />} />
              
              {/* Store Management Routes */}
              <Route path="store-management" element={<StoreManagement />} />
              <Route path="stores" element={<StoresPage />} />
              <Route path="create-store" element={<CreateStore />} />
              
              {/* Staff Management Routes */}
              <Route path="staff-management" element={<CreateUser />} />
              <Route path="vendors" element={<VendorPage />} />
              <Route path="create-vendor" element={<CreateVendor />} />
              
              {/* Other Routes - You can create these components later */}
              <Route path="orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders Page</h1><p>Coming Soon...</p></div>} />
              <Route path="purchases" element={<div className="p-6"><h1 className="text-2xl font-bold">Purchases Page</h1><p>Coming Soon...</p></div>} />
              <Route path="operations" element={<div className="p-6"><h1 className="text-2xl font-bold">Operations Page</h1><p>Coming Soon...</p></div>} />
              <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports Page</h1><p>Coming Soon...</p></div>} />
              <Route path="profile" element={<div className="p-6"><h1 className="text-2xl font-bold">Profile Page</h1><p>Coming Soon...</p></div>} />
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