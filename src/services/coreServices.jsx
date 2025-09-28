import callApi from './apiServices';

// Simple toast notification function (alternative to antd message)
const showMessage = {
  error: (msg) => {
    console.error(msg);
    // TODO: Replace with a toast notification in production
    // alert(`Error: ${msg}`); // Removed blocking alert
  },
  success: (msg) => {
    console.log(msg);
    // You can replace this with any toast library or custom notification
  }
};

// Authentication token management
const TOKEN_KEY = 'token';
const USER_KEY = 'user_data';
const ROLE_KEY = 'user_role';

// User roles enum (matching backend)
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES_MAN: 'salesman',
  PURCHASE_MAN: 'purchase',
  USER: 'user'
};

// Role hierarchy for permission checking
const ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 6,
  [USER_ROLES.ADMIN]: 5,
  [USER_ROLES.MANAGER]: 4,
  [USER_ROLES.SALES_MAN]: 3,
  [USER_ROLES.PURCHASE_MAN]: 3,
  [USER_ROLES.USER]: 1
};

// Dashboard routes for each role
export const DASHBOARD_ROUTES = {
  [USER_ROLES.SUPER_ADMIN]: '/dashboard/super-admin',
  [USER_ROLES.ADMIN]: '/dashboard/admin',
  [USER_ROLES.MANAGER]: '/dashboard/manager',
  [USER_ROLES.SALES_MAN]: '/dashboard/salesman',
  [USER_ROLES.PURCHASE_MAN]: '/dashboard/purchase',
  [USER_ROLES.USER]: '/dashboard/user'
};

// Token Management
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
};

// User Data Management
export const getUserData = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const setUserData = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  localStorage.setItem(ROLE_KEY, userData.role);
};

export const getUserRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

// Authentication Status
export const isAuthenticated = () => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

// Role-based Authorization
export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};

export const hasMinimumRole = (minimumRole) => {
  const userRole = getUserRole();
  if (!userRole || !minimumRole) return false;
  
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[minimumRole] || 0;
  
  return userLevel >= requiredLevel;
};

export const canAccessResource = (resourceRoles = []) => {
  const userRole = getUserRole();
  if (!userRole) return false;
  
  // Super admin can access everything
  if (userRole === USER_ROLES.SUPER_ADMIN) return true;
  
  // Check if user role is in allowed roles
  return resourceRoles.includes(userRole);
};

// API Login Function
export const login = async (emailId, password) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/login",
      method: "POST",
      body: { email: emailId, password }
    });
    //console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    showMessage.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/vendor/create",
      method: "POST",
      body: vendorData,
    });
    showMessage.success("Vendor created successfully");
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to create vendor"
    );
    throw error;
  }
};  

export const getPurchaseInwards = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/inwards/get-all-purchase-order",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to fetch purchase inwards"
    );
    throw error;
  }
};

export const createPurchaseInward = async (purchaseData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/inwards/purchase",
      method: "POST",
      body: purchaseData,
    });
    showMessage.success("Purchase inward created successfully");
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to create purchase inward"
    );
    throw error;
  }
};


export const addPoStockIn = async (stockData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/add-po-in-store/stock-in",
      method: "POST",
      body: stockData,
    });
    showMessage.success("Stock-in successful");
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to stock-in"
    );
    throw error;
  }
};

export const getAllStocks = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/add-po-in-store/get-all-stocks",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to fetch stocks"
    );
    throw error;
  }
};

export const getVendors = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/vendor/all",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    showMessage.error(
      error.response?.data?.message || "Failed to fetch vendors"
    );
    throw error;
  }
};


export const createStore = async (storeData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/store/create-store",
      method: "POST", 
      body: storeData
    });
    
    if (response && response.success) {
      return response;
    } else {
      throw new Error(response.message || 'Failed to create store');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create store";
    showMessage.error(errorMessage);
    throw new Error(errorMessage);
  }
};
export const getStores = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/store/all-store",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    showMessage.error(error.response?.data?.message || "Failed to fetch stores");
    throw error;
  }
};

export const getStoreById = async (storeId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/store/get/${storeId}`,
      method: "GET"
    });
    return response.data;
  } catch (error) {
    showMessage.error(error.response?.data?.message || "Failed to fetch store");
    throw error;
  }
};

export const updateStore = async (storeId, storeData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/store/update/${storeId}`,
      method: "PATCH",
      body: storeData
    });
    return response.data;
  } catch (error) {
    showMessage.error(error.response?.data?.message || "Failed to update store");
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/users",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    showMessage.error(error.response?.data?.message || "Failed to fetch stores");
    throw error;
  }
};

// Login/Logout Functions
export const loginUser = (userData, token) => {
  setAuthToken(token);
  setUserData(userData);
  
  // Store login timestamp
  localStorage.setItem('login_timestamp', Date.now().toString());
  
  return true;
};

export const logoutUser = () => {
  removeAuthToken();
  localStorage.removeItem('login_timestamp');
  
  // Redirect to login page
  window.location.href = '/login';
};

// Session Management
export const isSessionExpired = () => {
  const loginTimestamp = localStorage.getItem('login_timestamp');
  if (!loginTimestamp) return true;
  
  const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const currentTime = Date.now();
  const sessionAge = currentTime - parseInt(loginTimestamp);
  
  return sessionAge > sessionDuration;
};

export const refreshSession = () => {
  if (isAuthenticated() && !isSessionExpired()) {
    localStorage.setItem('login_timestamp', Date.now().toString());
    return true;
  }
  return false;
};

// Route Protection
export const getRedirectPath = (userRole) => {
  return DASHBOARD_ROUTES[userRole] || '/dashboard/user';
};

export const shouldRedirectToDashboard = () => {
  if (isAuthenticated() && !isSessionExpired()) {
    const userRole = getUserRole();
    return getRedirectPath(userRole);
  }
  return null;
};

// Permission Helpers
export const canManageUsers = () => {
  return hasMinimumRole(USER_ROLES.ADMIN);
};

export const canManageStores = () => {
  return hasMinimumRole(USER_ROLES.ADMIN);
};

export const canViewReports = () => {
  return hasMinimumRole(USER_ROLES.MANAGER);
};

export const canManageSales = () => {
  const userRole = getUserRole();
  return [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.SALES_MAN].includes(userRole);
};

export const canManagePurchases = () => {
  const userRole = getUserRole();
  return [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.PURCHASE_MAN].includes(userRole);
};

// Utility Functions
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
    [USER_ROLES.ADMIN]: 'Admin',
    [USER_ROLES.MANAGER]: 'Manager',
    [USER_ROLES.SALES_MAN]: 'Sales Person',
    [USER_ROLES.PURCHASE_MAN]: 'Purchase Manager',
    [USER_ROLES.USER]: 'User'
  };
  
  return roleNames[role] || 'Unknown Role';
};

export const getAvailableRoutes = (userRole) => {
  const routes = {
    [USER_ROLES.SUPER_ADMIN]: [
      '/dashboard/super-admin',
      '/users',
      '/stores',
      '/reports',
      '/settings',
      '/audit-logs'
    ],
    [USER_ROLES.ADMIN]: [
      '/dashboard/admin',
      '/users',
      '/stores',
      '/reports',
      '/settings'
    ],
    [USER_ROLES.MANAGER]: [
      '/dashboard/manager',
      '/reports',
      '/inventory',
      '/sales',
      '/purchases'
    ],
    [USER_ROLES.SALES_MAN]: [
      '/dashboard/salesman',
      '/sales',
      '/customers',
      '/inventory'
    ],
    [USER_ROLES.PURCHASE_MAN]: [
      '/dashboard/purchase',
      '/purchases',
      '/suppliers',
      '/inventory'
    ],
    [USER_ROLES.USER]: [
      '/dashboard/user',
      '/profile'
    ]
  };
  
  return routes[userRole] || routes[USER_ROLES.USER];
};

// Error Handling
export const handleAuthError = (error) => {
  console.error('Authentication error:', error);
  
  if (error.response?.status === 401) {
    logoutUser();
    return 'Session expired. Please login again.';
  }
  
  return error.message || 'Authentication failed';
};

// Local Storage Cleanup
export const clearAllUserData = () => {
  const keysToRemove = [TOKEN_KEY, USER_KEY, ROLE_KEY, 'login_timestamp'];
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Development helpers
export const isDevelopment = () => {
  return import.meta.env.MODE === 'development';
};

export const logUserInfo = () => {
  if (isDevelopment()) {
    console.log('User Info:', 
    {
      isAuthenticated: isAuthenticated(),
      userData: getUserData(),
      role: getUserRole(),
      token: getAuthToken() ? 'Present' : 'Not Present',
      sessionExpired: isSessionExpired()
    });
  }
};

export default {
  // Token management
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  
  // User data management
  getUserData,
  setUserData,
  getUserRole,
  
  // Authentication
  isAuthenticated,
  loginUser,
  logoutUser,
  
  // Authorization
  hasRole,
  hasMinimumRole,
  canAccessResource,
  
  // Session management
  isSessionExpired,
  refreshSession,
  
  // Route management
  getRedirectPath,
  shouldRedirectToDashboard,
  
  // Permission helpers
  canManageUsers,
  canManageStores,
  canViewReports,
  canManageSales,
  canManagePurchases,
  
  // Utilities
  getRoleDisplayName,
  getAvailableRoutes,
  handleAuthError,
  clearAllUserData,
  logUserInfo,
  
  // Constants
  USER_ROLES,
  DASHBOARD_ROUTES
};
