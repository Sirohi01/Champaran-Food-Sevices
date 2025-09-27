# Role-Based System Implementation Guide

## 🎯 Overview

This guide explains how to implement and extend the role-based system in Champaran Food Services. The system is designed to be scalable, maintainable, and easy to extend.

## 📁 File Structure

```
src/
├── enums/                          # All enums and constants
│   ├── userRoles.js               # User role definitions
│   ├── pageRoutes.js              # Page route definitions
│   ├── permissions.js             # Permission system
│   └── navigation.js              # Navigation menus
├── services/                       # Business logic services
│   ├── permissionService.js       # Permission checking
│   ├── loginRedirectService.js   # Login redirect logic
│   └── coreServices.jsx          # Core authentication
├── components/                      # UI components
│   ├── RoleBasedRoute.jsx         # Route protection
│   └── RoleBasedNavigation.jsx    # Dynamic navigation
└── roles/                          # Role-specific code
    ├── super-admin/
    ├── admin/
    ├── manager/
    ├── salesman/
    ├── purchase/
    └── user/
```

## 🔧 Core Components

### 1. Enums System

#### User Roles (`src/enums/userRoles.js`)
```javascript
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALESMAN: 'salesman',
  PURCHASE_MANAGER: 'purchase_manager',
  USER: 'user'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 6,
  [USER_ROLES.ADMIN]: 5,
  [USER_ROLES.MANAGER]: 4,
  [USER_ROLES.SALESMAN]: 3,
  [USER_ROLES.PURCHASE_MANAGER]: 3,
  [USER_ROLES.USER]: 1
};
```

#### Page Routes (`src/enums/pageRoutes.js`)
```javascript
export const PAGE_ROUTES = {
  // Dashboard Routes
  SUPER_ADMIN_DASHBOARD: '/dashboard/super-admin',
  ADMIN_DASHBOARD: '/dashboard/admin',
  MANAGER_DASHBOARD: '/dashboard/manager',
  SALESMAN_DASHBOARD: '/dashboard/salesman',
  PURCHASE_DASHBOARD: '/dashboard/purchase',
  USER_DASHBOARD: '/dashboard/user',
  
  // Management Routes
  USER_MANAGEMENT: '/dashboard/user-management',
  STORE_MANAGEMENT: '/dashboard/store-management',
  // ... more routes
};
```

#### Permissions (`src/enums/permissions.js`)
```javascript
export const RESOURCE_TYPES = {
  USERS: 'users',
  STORES: 'stores',
  INVENTORY: 'inventory',
  SALES: 'sales',
  PURCHASES: 'purchases',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  SUPPLIERS: 'suppliers'
};

export const PERMISSION_TYPES = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin'
};
```

### 2. Permission Service

#### Basic Usage
```javascript
import permissionService from '../services/permissionService';
import { USER_ROLES } from '../enums/userRoles';
import { RESOURCE_TYPES, PERMISSION_TYPES } from '../enums/permissions';

// Check if user has page access
const hasAccess = permissionService.hasPageAccess(userRole, '/dashboard/admin');

// Check resource permissions
const canManageUsers = permissionService.hasResourcePermission(
  userRole, 
  RESOURCE_TYPES.USERS, 
  PERMISSION_TYPES.WRITE
);

// Check role hierarchy
const isAdmin = permissionService.hasMinimumRole(userRole, USER_ROLES.ADMIN);
```

#### Advanced Usage
```javascript
// Get all accessible pages for a role
const accessiblePages = permissionService.getAccessiblePages(userRole);

// Get role permissions
const permissions = permissionService.getRolePermissions(userRole);

// Check store access
const canAccessStore = permissionService.canAccessStore(
  userRole, 
  storeId, 
  userStoreId
);

// Get navigation menu
const menuItems = permissionService.getNavigationMenu(userRole, userStoreId);
```

### 3. Route Protection

#### Basic Route Protection
```javascript
import RoleBasedRoute from '../components/RoleBasedRoute';
import { USER_ROLES } from '../enums/userRoles';

// Protect route for specific role
<Route path="/dashboard/admin" element={
  <RoleBasedRoute requiredRole={USER_ROLES.ADMIN}>
    <AdminDashboard />
  </RoleBasedRoute>
} />
```

#### Permission-Based Protection
```javascript
import { RESOURCE_TYPES, PERMISSION_TYPES } from '../enums/permissions';

// Protect route with specific permissions
<Route path="/dashboard/user-management" element={
  <RoleBasedRoute requiredPermissions={[
    `${RESOURCE_TYPES.USERS}:${PERMISSION_TYPES.WRITE}`
  ]}>
    <UserManagement />
  </RoleBasedRoute>
} />
```

### 4. Login Redirect System

#### Basic Implementation
```javascript
import loginRedirectService from '../services/loginRedirectService';

// Handle login redirect
const handleLogin = async (loginData) => {
  const response = await loginAPI(loginData);
  const redirectInfo = loginRedirectService.handleLoginRedirect(
    response, 
    intendedPath
  );
  
  // Redirect to appropriate dashboard
  navigate(redirectInfo.redirectUrl);
};
```

#### Store-Specific Redirects
```javascript
// For store-specific roles
const redirectInfo = loginRedirectService.handleLoginRedirect(response);

if (redirectInfo.isStoreSpecific) {
  // Show store selection or redirect to store dashboard
  const storeUrl = loginRedirectService.getStoreDashboardUrl(
    redirectInfo.userRole, 
    redirectInfo.storeId
  );
  navigate(storeUrl);
}
```

## 🚀 Adding New Features

### 1. Adding a New Role

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

export const ROLE_COLORS = {
  // ... existing colors
  [USER_ROLES.WAREHOUSE_MANAGER]: 'teal'
};
```

#### Step 2: Add Permissions
```javascript
// src/enums/permissions.js
export const ROLE_PERMISSIONS = {
  // ... existing permissions
  [USER_ROLES.WAREHOUSE_MANAGER]: {
    [RESOURCE_TYPES.INVENTORY]: [PERMISSION_TYPES.READ, PERMISSION_TYPES.WRITE],
    [RESOURCE_TYPES.REPORTS]: [PERMISSION_TYPES.READ],
    [RESOURCE_TYPES.STORES]: [PERMISSION_TYPES.READ]
  }
};
```

#### Step 3: Add Navigation Menu
```javascript
// src/enums/navigation.js
export const ROLE_NAVIGATION_MENUS = {
  // ... existing menus
  [USER_ROLES.WAREHOUSE_MANAGER]: [
    {
      name: 'Warehouse Dashboard',
      icon: 'warehouse',
      path: '/dashboard/warehouse',
      color: 'teal',
      permissions: [RESOURCE_TYPES.INVENTORY]
    }
    // ... more menu items
  ]
};
```

#### Step 4: Create Role Components
```javascript
// src/roles/warehouse-manager/pages/WarehouseDashboard.jsx
import React from 'react';

const WarehouseDashboard = () => {
  return (
    <div>
      <h1>Warehouse Dashboard</h1>
      {/* Warehouse-specific content */}
    </div>
  );
};

export default WarehouseDashboard;
```

#### Step 5: Add Route Protection
```javascript
// src/routes/AllRoutes.jsx
<Route path="warehouse" element={
  <RoleBasedRoute requiredRole={USER_ROLES.WAREHOUSE_MANAGER}>
    <WarehouseDashboard />
  </RoleBasedRoute>
} />
```

### 2. Adding New Permissions

#### Step 1: Add Resource Type
```javascript
// src/enums/permissions.js
export const RESOURCE_TYPES = {
  // ... existing resources
  ANALYTICS: 'analytics'
};
```

#### Step 2: Add Permission Type
```javascript
export const PERMISSION_TYPES = {
  // ... existing permissions
  EXPORT: 'export'
};
```

#### Step 3: Update Role Permissions
```javascript
export const ROLE_PERMISSIONS = {
  [USER_ROLES.MANAGER]: {
    // ... existing permissions
    [RESOURCE_TYPES.ANALYTICS]: [PERMISSION_TYPES.READ, PERMISSION_TYPES.EXPORT]
  }
};
```

#### Step 4: Use in Components
```javascript
// Check permission in component
const canExportAnalytics = permissionService.hasResourcePermission(
  userRole, 
  RESOURCE_TYPES.ANALYTICS, 
  PERMISSION_TYPES.EXPORT
);

// Show/hide export button based on permission
{canExportAnalytics && (
  <button onClick={handleExport}>Export Analytics</button>
)}
```

### 3. Adding New Pages

#### Step 1: Add Route to Enums
```javascript
// src/enums/pageRoutes.js
export const PAGE_ROUTES = {
  // ... existing routes
  ANALYTICS_DASHBOARD: '/dashboard/analytics'
};
```

#### Step 2: Add Page Access Permissions
```javascript
// src/enums/permissions.js
export const PAGE_ACCESS_PERMISSIONS = {
  // ... existing permissions
  [PAGE_ROUTES.ANALYTICS_DASHBOARD]: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER]
};
```

#### Step 3: Create Page Component
```javascript
// src/pages/AnalyticsDashboard.jsx
import React from 'react';
import RoleBasedRoute from '../components/RoleBasedRoute';
import { USER_ROLES } from '../enums/userRoles';

const AnalyticsDashboard = () => {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {/* Analytics content */}
    </div>
  );
};

export default AnalyticsDashboard;
```

#### Step 4: Add to Routes
```javascript
// src/routes/AllRoutes.jsx
<Route path="analytics" element={
  <RoleBasedRoute requiredPermissions={[
    `${RESOURCE_TYPES.ANALYTICS}:${PERMISSION_TYPES.READ}`
  ]}>
    <AnalyticsDashboard />
  </RoleBasedRoute>
} />
```

## 🔍 Best Practices

### 1. Enum Organization
- **Keep enums separate** by functionality
- **Use descriptive names** for constants
- **Group related constants** together
- **Add comments** for complex logic

### 2. Permission Design
- **Start with broad permissions** and narrow down
- **Use resource-based permissions** for flexibility
- **Consider role hierarchy** when designing permissions
- **Test permission combinations** thoroughly

### 3. Component Structure
- **Keep role-specific components** in their folders
- **Use shared components** for common functionality
- **Implement proper error handling** for permission failures
- **Provide fallback UI** for unauthorized access

### 4. Service Layer
- **Keep business logic** in services
- **Use singleton pattern** for services
- **Implement proper error handling**
- **Add logging** for permission checks

## 🧪 Testing the System

### 1. Permission Testing
```javascript
// Test permission service
describe('PermissionService', () => {
  test('should allow super admin to access all pages', () => {
    const hasAccess = permissionService.hasPageAccess(
      USER_ROLES.SUPER_ADMIN, 
      '/dashboard/admin'
    );
    expect(hasAccess).toBe(true);
  });
  
  test('should deny user access to admin pages', () => {
    const hasAccess = permissionService.hasPageAccess(
      USER_ROLES.USER, 
      '/dashboard/admin'
    );
    expect(hasAccess).toBe(false);
  });
});
```

### 2. Route Protection Testing
```javascript
// Test route protection
describe('RoleBasedRoute', () => {
  test('should redirect unauthorized users', () => {
    render(
      <RoleBasedRoute requiredRole={USER_ROLES.ADMIN}>
        <AdminDashboard />
      </RoleBasedRoute>
    );
    
    // Should redirect to user dashboard
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/user');
  });
});
```

### 3. Navigation Testing
```javascript
// Test navigation menu
describe('Navigation Menu', () => {
  test('should show correct menu for admin role', () => {
    const menuItems = permissionService.getNavigationMenu(USER_ROLES.ADMIN);
    expect(menuItems).toContainEqual(
      expect.objectContaining({
        name: 'Store Overview',
        path: '/dashboard/admin'
      })
    );
  });
});
```

## 📚 Common Patterns

### 1. Conditional Rendering
```javascript
// Show/hide components based on permissions
const canManageUsers = permissionService.canManageUsers(userRole);
const canViewReports = permissionService.canViewReports(userRole);

return (
  <div>
    {canManageUsers && <UserManagementButton />}
    {canViewReports && <ReportsButton />}
  </div>
);
```

### 2. Role-Based Styling
```javascript
// Apply role-specific styling
const getRoleColor = (role) => ROLE_COLORS[role] || 'gray';
const roleColor = getRoleColor(userRole);

return (
  <div className={`bg-${roleColor}-100 border-${roleColor}-500`}>
    {/* Role-specific content */}
  </div>
);
```

### 3. Store-Specific Logic
```javascript
// Handle store-specific permissions
const canAccessStore = permissionService.canAccessStore(
  userRole, 
  storeId, 
  userStoreId
);

if (!canAccessStore) {
  return <UnauthorizedAccess />;
}
```

## 🚀 Future Enhancements

### 1. Dynamic Permissions
- **Database-driven permissions** for flexibility
- **User-specific permissions** beyond role-based
- **Time-based permissions** for temporary access
- **Location-based permissions** for security

### 2. Advanced Features
- **Permission inheritance** for complex hierarchies
- **Conditional permissions** based on data
- **Audit logging** for permission changes
- **Permission analytics** for usage tracking

### 3. Performance Optimizations
- **Permission caching** for better performance
- **Lazy loading** for role-specific components
- **Bundle splitting** by role
- **CDN optimization** for static assets

## 📞 Support

For questions or issues with the role-based system:

1. **Check the enums** for correct role/permission definitions
2. **Verify service imports** are correct
3. **Test permissions** in isolation
4. **Check console logs** for permission errors
5. **Review documentation** for implementation patterns

---

This guide provides a comprehensive overview of the role-based system implementation. Follow the patterns and examples to extend the system according to your needs.
