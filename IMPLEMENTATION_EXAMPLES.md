# Role-Based System Implementation Examples

## 🎯 Complete Implementation Guide

यह guide आपको दिखाएगा कि कैसे existing APIs के साथ role-based system को implement करना है।

## 📋 Current API Structure (जो आपके पास है)

```javascript
// Existing APIs in coreServices.jsx
export const login = async (emailId, password) => {
  // API: api/v1/user/login
};

export const createStore = async (storeData) => {
  // API: api/v1/store/create-store
};

export const getStores = async () => {
  // API: api/v1/store/all-store
};

export const getStoreById = async (storeId) => {
  // API: api/v1/store/get/${storeId}
};

export const updateStore = async (storeId, storeData) => {
  // API: api/v1/store/update/${storeId}
};

export const getUsers = async () => {
  // API: api/v1/user/users
};
```

## 🔧 Role-Based Implementation

### 1. Login Process with Role-Based Redirect

```javascript
// src/pages/Login.jsx
import { login, loginUser } from '../services/coreServices';
import loginRedirectService from '../services/loginRedirectService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = async (formData) => {
    try {
      // Use existing login API
      const response = await login(formData.email, formData.password);
      
      // Store user data using existing function
      loginUser(response.user, response.token);
      
      // Get role-based redirect
      const redirectInfo = loginRedirectService.handleLoginRedirect(response);
      
      // Navigate to appropriate dashboard
      navigate(redirectInfo.redirectUrl);
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    // Login form JSX
  );
};
```

### 2. Role-Based Dashboard Access

```javascript
// src/pages/RoleDashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../services/coreServices';
import permissionService from '../services/permissionService';

const RoleDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRole = getUserRole();
    const dashboardRoute = permissionService.getDashboardRoute(userRole);
    navigate(dashboardRoute);
  }, [navigate]);
  
  return <div>Redirecting to your dashboard...</div>;
};
```

### 3. Super Admin Dashboard Implementation

```javascript
// src/roles/super-admin/pages/SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllStores } from '../services/superAdminServices';
import { getUserData } from '../../../services/coreServices';

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Use existing APIs through role-specific services
      const [usersData, storesData] = await Promise.all([
        getAllUsers(), // Uses api/v1/user/users
        getAllStores() // Uses api/v1/store/all-store
      ]);
      
      setUsers(usersData);
      setStores(storesData);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1>Super Admin Dashboard</h1>
      <p>Welcome, {userData?.name}</p>
      
      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3>Total Users: {users.length}</h3>
          {/* Users list */}
        </div>
        <div>
          <h3>Total Stores: {stores.length}</h3>
          {/* Stores list */}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
```

### 4. Admin Dashboard with Store-Specific Data

```javascript
// src/roles/admin/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getStoreStats, getStoreUsers } from '../services/adminServices';
import { getUserData } from '../../../services/coreServices';

const AdminDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const [storeUsers, setStoreUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();
  
  useEffect(() => {
    if (userData?.storeId) {
      fetchStoreData(userData.storeId);
    }
  }, [userData]);
  
  const fetchStoreData = async (storeId) => {
    try {
      setLoading(true);
      
      // Get store-specific data
      const [storeStats, users] = await Promise.all([
        getStoreStats(storeId), // Uses api/v1/store/get/${storeId}
        getStoreUsers() // Uses api/v1/user/users
      ]);
      
      setStoreData(storeStats);
      setStoreUsers(users);
      
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1>Admin Dashboard - {storeData?.name}</h1>
      <p>Welcome, {userData?.name}</p>
      
      {/* Store-specific content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3>Store Users: {storeUsers.length}</h3>
        </div>
        <div>
          <h3>Store Status: {storeData?.status}</h3>
        </div>
        <div>
          <h3>Store Location: {storeData?.location}</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

### 5. Permission-Based Component Rendering

```javascript
// src/components/UserManagement.jsx
import React from 'react';
import { getUserRole } from '../services/coreServices';
import permissionService from '../services/permissionService';
import { USER_ROLES } from '../enums/userRoles';

const UserManagement = () => {
  const userRole = getUserRole();
  
  // Check permissions
  const canManageUsers = permissionService.canManageUsers(userRole);
  const canDeleteUsers = permissionService.hasResourcePermission(
    userRole, 
    'users', 
    'delete'
  );
  
  if (!canManageUsers) {
    return <div>You don't have permission to manage users.</div>;
  }
  
  return (
    <div>
      <h1>User Management</h1>
      
      {/* Only show delete button if user has delete permission */}
      {canDeleteUsers && (
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete User
        </button>
      )}
      
      {/* User management content */}
    </div>
  );
};

export default UserManagement;
```

### 6. Dynamic Navigation Menu

```javascript
// src/components/SideMenu.jsx
import React from 'react';
import { getUserRole } from '../services/coreServices';
import permissionService from '../services/permissionService';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const userRole = getUserRole();
  const navigate = useNavigate();
  
  // Get role-specific navigation menu
  const menuItems = permissionService.getNavigationMenu(userRole);
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;
```

### 7. Store-Specific Access Control

```javascript
// src/components/StoreSelector.jsx
import React, { useState, useEffect } from 'react';
import { getUserRole, getUserData } from '../services/coreServices';
import permissionService from '../services/permissionService';
import { getStores } from '../services/coreServices';

const StoreSelector = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const userRole = getUserRole();
  const userData = getUserData();
  
  useEffect(() => {
    fetchStores();
  }, []);
  
  const fetchStores = async () => {
    try {
      const storesData = await getStores(); // Uses existing API
      
      // Filter stores based on user role and permissions
      const accessibleStores = storesData.filter(store => 
        permissionService.canAccessStore(userRole, store.id, userData?.storeId)
      );
      
      setStores(accessibleStores);
      
      // Auto-select if user has only one store
      if (accessibleStores.length === 1) {
        setSelectedStore(accessibleStores[0]);
      }
      
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };
  
  const handleStoreChange = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    setSelectedStore(store);
    
    // Redirect to store-specific dashboard
    const dashboardRoute = permissionService.getDashboardRoute(userRole);
    window.location.href = `${dashboardRoute}?storeId=${storeId}`;
  };
  
  return (
    <div className="p-4">
      <h3>Select Store</h3>
      <select 
        value={selectedStore?.id || ''} 
        onChange={(e) => handleStoreChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a store</option>
        {stores.map(store => (
          <option key={store.id} value={store.id}>
            {store.name} - {store.location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreSelector;
```

## 🚀 Adding New Features

### Example: Adding a New Role (Warehouse Manager)

#### Step 1: Update Enums
```javascript
// src/enums/userRoles.js
export const USER_ROLES = {
  // ... existing roles
  WAREHOUSE_MANAGER: 'warehouse_manager'
};

export const ROLE_HIERARCHY = {
  // ... existing hierarchy
  [USER_ROLES.WAREHOUSE_MANAGER]: 3
};
```

#### Step 2: Add API Services
```javascript
// src/roles/warehouse-manager/services/warehouseServices.js
import callApi from '../../../services/apiServices';

export const getWarehouseInventory = async (warehouseId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/warehouse/inventory/${warehouseId}`,
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouse inventory:', error);
    throw error;
  }
};

export const updateInventory = async (warehouseId, inventoryData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/warehouse/update-inventory/${warehouseId}`,
      method: "PUT",
      body: inventoryData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
};
```

#### Step 3: Create Dashboard Component
```javascript
// src/roles/warehouse-manager/pages/WarehouseDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getWarehouseInventory } from '../services/warehouseServices';
import { getUserData } from '../../../services/coreServices';

const WarehouseDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();
  
  useEffect(() => {
    if (userData?.warehouseId) {
      fetchInventory(userData.warehouseId);
    }
  }, [userData]);
  
  const fetchInventory = async (warehouseId) => {
    try {
      setLoading(true);
      const inventoryData = await getWarehouseInventory(warehouseId);
      setInventory(inventoryData);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1>Warehouse Dashboard</h1>
      <p>Welcome, {userData?.name}</p>
      
      {/* Inventory management content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inventory.map(item => (
          <div key={item.id} className="p-4 border rounded">
            <h3>{item.name}</h3>
            <p>Stock: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseDashboard;
```

## 🔍 Testing the Implementation

### 1. Test Login Flow
```javascript
// Test different role logins
const testLoginFlow = async () => {
  const testUsers = [
    { email: 'superadmin@test.com', password: 'password', expectedRole: 'super_admin' },
    { email: 'admin@test.com', password: 'password', expectedRole: 'admin' },
    { email: 'manager@test.com', password: 'password', expectedRole: 'manager' },
    { email: 'salesman@test.com', password: 'password', expectedRole: 'salesman' },
    { email: 'purchase@test.com', password: 'password', expectedRole: 'purchase' },
    { email: 'user@test.com', password: 'password', expectedRole: 'user' }
  ];
  
  for (const user of testUsers) {
    try {
      const response = await login(user.email, user.password);
      //console.log(`Login successful for ${user.expectedRole}:`, response);
      
      // Test redirect
      const redirectInfo = loginRedirectService.handleLoginRedirect(response);
      //console.log(`Redirect URL: ${redirectInfo.redirectUrl}`);
      
    } catch (error) {
      console.error(`Login failed for ${user.expectedRole}:`, error);
    }
  }
};
```

### 2. Test Permission System
```javascript
// Test permission checks
const testPermissions = () => {
  const roles = ['super_admin', 'admin', 'manager', 'salesman', 'purchase', 'user'];
  
  roles.forEach(role => {
    //console.log(`\nTesting permissions for ${role}:`);
    //console.log('Can manage users:', permissionService.canManageUsers(role));
    //console.log('Can manage stores:', permissionService.canManageStores(role));
    //console.log('Can view reports:', permissionService.canViewReports(role));
    //console.log('Can manage sales:', permissionService.canManageSales(role));
    //console.log('Can manage purchases:', permissionService.canManagePurchases(role));
  });
};
```

## 📚 Best Practices

### 1. Always Use Existing APIs
```javascript
// ✅ Good - Use existing API structure
export const getStoreUsers = async () => {
  const response = await callApi({
    endpoint: "api/v1/user/users", // Existing API
    method: "GET"
  });
  return response.data;
};

// ❌ Bad - Don't create new API endpoints unnecessarily
export const getStoreUsers = async () => {
  const response = await callApi({
    endpoint: "api/v1/admin/store-users", // New API
    method: "GET"
  });
  return response.data;
};
```

### 2. Role-Based Data Filtering
```javascript
// Filter data based on user role and permissions
const getFilteredData = (allData, userRole, userStoreId) => {
  if (userRole === 'super_admin') {
    return allData; // Super admin sees everything
  }
  
  // Other roles see only their store's data
  return allData.filter(item => item.storeId === userStoreId);
};
```

### 3. Consistent Error Handling
```javascript
// Use consistent error handling across all services
export const fetchData = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/data",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Show user-friendly error message
    throw new Error('Failed to fetch data. Please try again.');
  }
};
```

## 🎉 Complete System Ready!

अब आपका role-based system completely ready है with:

✅ **Existing API integration** - सभी existing APIs का use हो रहा है  
✅ **Role-based routing** - हर role को अपना dashboard मिलता है  
✅ **Permission system** - Proper access control  
✅ **Store-specific access** - Admin को अपने store का data दिखता है  
✅ **Scalable architecture** - आसानी से नए roles add कर सकते हैं  
✅ **Complete documentation** - सब कुछ properly documented है  

अब आप easily नए features add कर सकते हैं और system को extend कर सकते हैं! 🚀
