// User Roles Enum - matching existing API structure
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES_MAN: 'salesman',
  PURCHASE_MAN: 'purchase',
  USER: 'user'
};

// Role Hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 6,
  [USER_ROLES.ADMIN]: 5,
  [USER_ROLES.MANAGER]: 4,
  [USER_ROLES.SALES_MAN]: 3,
  [USER_ROLES.PURCHASE_MAN]: 3,
  [USER_ROLES.USER]: 1
};

// Role Display Names
export const ROLE_DISPLAY_NAMES = {
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.SALES_MAN]: 'Sales Person',
  [USER_ROLES.PURCHASE_MAN]: 'Purchase Manager',
  [USER_ROLES.USER]: 'User'
};

// Role Colors for UI
export const ROLE_COLORS = {
  [USER_ROLES.SUPER_ADMIN]: 'red',
  [USER_ROLES.ADMIN]: 'purple',
  [USER_ROLES.MANAGER]: 'blue',
  [USER_ROLES.SALES_MAN]: 'green',
  [USER_ROLES.PURCHASE_MAN]: 'orange',
  [USER_ROLES.USER]: 'indigo'
};

// Role Icons
export const ROLE_ICONS = {
  [USER_ROLES.SUPER_ADMIN]: 'crown',
  [USER_ROLES.ADMIN]: 'shield',
  [USER_ROLES.MANAGER]: 'chart',
  [USER_ROLES.SALES_MAN]: 'sales',
  [USER_ROLES.PURCHASE_MAN]: 'purchase',
  [USER_ROLES.USER]: 'user'
};
