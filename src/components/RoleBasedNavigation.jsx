import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpriteIcons from './SpriteIcons';
import { useI18n } from '../i18n/i18n';
import { useTheme } from '../contexts/ThemeContext';
import { getUserRole, USER_ROLES } from '../services/coreServices';

const RoleBasedNavigation = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const userRole = getUserRole();

  const getRoleNavigation = (role) => {
    const navigationItems = {
      [USER_ROLES.SUPER_ADMIN]: [
        { name: t('navigation.systemOverview'), icon: 'dashboard', path: '/dashboard/super-admin', color: 'red' },
        { name: t('navigation.userManagement'), icon: 'users', path: '/dashboard/user-management', color: 'blue' },
        { name: t('navigation.storeManagement'), icon: 'store', path: '/dashboard/store-management', color: 'green' },
        { name: t('navigation.systemSettings'), icon: 'settings', path: '/dashboard/settings', color: 'purple' },
        { name: t('navigation.auditLogs'), icon: 'logs', path: '/dashboard/audit-logs', color: 'orange' },
        { name: t('navigation.reports'), icon: 'report', path: '/dashboard/reports', color: 'indigo' }
      ],
      [USER_ROLES.ADMIN]: [
        { name: t('navigation.storeOverview'), icon: 'dashboard', path: '/dashboard/admin', color: 'purple' },
        { name: t('navigation.userManagement'), icon: 'users', path: '/dashboard/user-management', color: 'blue' },
        { name: t('navigation.storeManagement'), icon: 'store', path: '/dashboard/store-management', color: 'green' },
        { name: t('navigation.inventory'), icon: 'inventory', path: '/dashboard/inventory', color: 'orange' },
        { name: t('navigation.reports'), icon: 'report', path: '/dashboard/reports', color: 'indigo' }
      ],
      [USER_ROLES.MANAGER]: [
        { name: t('navigation.operations'), icon: 'dashboard', path: '/dashboard/manager', color: 'blue' },
        { name: t('navigation.teamPerformance'), icon: 'team', path: '/dashboard/team', color: 'green' },
        { name: t('navigation.salesReports'), icon: 'sales', path: '/dashboard/sales', color: 'purple' },
        { name: t('navigation.inventory'), icon: 'inventory', path: '/dashboard/inventory', color: 'orange' },
        { name: t('navigation.purchases'), icon: 'purchase', path: '/dashboard/purchases', color: 'red' }
      ],
      [USER_ROLES.SALES_MAN]: [
        { name: t('navigation.salesDashboard'), icon: 'dashboard', path: '/dashboard/salesman', color: 'green' },
        { name: t('navigation.customers'), icon: 'customers', path: '/dashboard/customers', color: 'blue' },
        { name: t('navigation.products'), icon: 'products', path: '/dashboard/products', color: 'purple' },
        { name: t('navigation.salesHistory'), icon: 'history', path: '/dashboard/sales-history', color: 'orange' },
        { name: t('navigation.targets'), icon: 'target', path: '/dashboard/targets', color: 'red' }
      ],
      [USER_ROLES.PURCHASE_MAN]: [
        { name: t('navigation.purchaseDashboard'), icon: 'dashboard', path: '/dashboard/purchase', color: 'orange' },
        { name: t('navigation.suppliers'), icon: 'suppliers', path: '/dashboard/suppliers', color: 'blue' },
        { name: t('navigation.inventoryNeeds'), icon: 'inventory', path: '/dashboard/inventory-needs', color: 'green' },
        { name: t('navigation.purchaseHistory'), icon: 'history', path: '/dashboard/purchase-history', color: 'purple' },
        { name: t('navigation.budget'), icon: 'budget', path: '/dashboard/budget', color: 'red' }
      ],
      [USER_ROLES.USER]: [
        { name: t('navigation.myDashboard'), icon: 'dashboard', path: '/dashboard/user', color: 'indigo' },
        { name: t('navigation.myOrders'), icon: 'orders', path: '/dashboard/orders', color: 'blue' },
        { name: t('navigation.products'), icon: 'products', path: '/dashboard/products', color: 'green' },
        { name: t('navigation.profile'), icon: 'profile', path: '/dashboard/profile', color: 'purple' },
        { name: t('navigation.support'), icon: 'support', path: '/dashboard/support', color: 'orange' }
      ]
    };

    return navigationItems[role] || navigationItems[USER_ROLES.USER];
  };

  const getRoleColor = (role) => {
    const roleColors = {
      [USER_ROLES.SUPER_ADMIN]: 'red',
      [USER_ROLES.ADMIN]: 'purple',
      [USER_ROLES.MANAGER]: 'blue',
      [USER_ROLES.SALES_MAN]: 'green',
      [USER_ROLES.PURCHASE_MAN]: 'orange',
      [USER_ROLES.USER]: 'indigo'
    };
    return roleColors[role] || 'gray';
  };

  const navigationItems = getRoleNavigation(userRole);
  const roleColor = getRoleColor(userRole);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <div className={`p-2 rounded-lg bg-${roleColor}-100 dark:bg-${roleColor}-900/30 mr-3`}>
            <SpriteIcons name="navigation" className={`w-5 h-5 text-${roleColor}-600 dark:text-${roleColor}-400`} />
          </div>
          Role-Based Navigation
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Quick access to features based on your role: <span className={`font-semibold text-${roleColor}-600 dark:text-${roleColor}-400`}>
            {userRole?.replace('_', ' ').toUpperCase()}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl hover:bg-${item.color}-100 dark:hover:bg-${item.color}-900/30 transition-all duration-300 hover:scale-105 group`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/30 group-hover:scale-110 transition-transform`}>
                <SpriteIcons name={item.icon} className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
              </div>
              <div className="text-left">
                <div className={`font-semibold text-${item.color}-800 dark:text-${item.color}-200 group-hover:text-${item.color}-900 dark:group-hover:text-${item.color}-100`}>
                  {item.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Click to navigate
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
        <div className="flex items-center space-x-2">
          <SpriteIcons name="info" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Current Role:</span> {userRole?.replace('_', ' ').toUpperCase()}
          </div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Navigation items are filtered based on your role permissions
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;
