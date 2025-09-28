import { NavLink } from 'react-router-dom';
import SpriteIcons from './SpriteIcons';
import { useI18n, Languages } from '../i18n/i18n';
import { getUserRole, USER_ROLES } from '../services/coreServices';

const SideMenu = ({ mobile = false }) => {
  const { t, lang, setLang } = useI18n();
  const userRole = getUserRole();
  
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white shadow-lg transform scale-105' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-orange-400 hover:scale-105'
    }`;

  const getMenuItems = () => {
    const baseItems = [
      { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' }
    ];

    if (userRole === USER_ROLES.SUPER_ADMIN) {
      return [
        ...baseItems,
        { to: '/dashboard/user-management', icon: 'users', label: 'User Management' },
        { to: '/dashboard/stores', icon: 'store', label: 'All Stores' },
        // { to: '/dashboard/reports', icon: 'reports', label: 'Reports' },
        // { to: '/dashboard/orders', icon: 'orders', label: 'Orders' },
        // { to: '/dashboard/inventory', icon: 'inventory', label: 'Inventory' }
      ];
    }

    if (userRole === USER_ROLES.ADMIN) {
      return [
        ...baseItems,
        //{ to: '/dashboard/stores', icon: 'store', label: 'All Stores' },
        // { to: '/dashboard/staff-management', icon: 'users', label: 'Staff Management' },
        // { to: '/dashboard/orders', icon: 'orders', label: 'Orders' },
        { to: '/dashboard/vendors', icon: 'vendors', label: 'Vendor Management' },
        { to: '/dashboard/purchase-inwards', icon: 'purchase', label: 'Purchase In Ward' },
        { to: '/dashboard/stock-inwards', icon: 'stock', label: 'Stock In Ward' },
      ];
    }

    if (userRole === USER_ROLES.MANAGER) {
      return [
        ...baseItems,
        { to: '/dashboard/operations', icon: 'operations', label: 'Operations' },
        { to: '/dashboard/reports', icon: 'reports', label: 'Reports' },
        // { to: '/dashboard/inventory', icon: 'inventory', label: 'Inventory' }
      ];
    }

    if (userRole === USER_ROLES.SALES_MAN) {
      return [
        ...baseItems,
        // { to: '/dashboard/orders', icon: 'orders', label: 'Orders' },
        // { to: '/dashboard/inventory', icon: 'inventory', label: 'Inventory' },
        { to: '/dashboard/profile', icon: 'profile', label: 'Profile' }
      ];
    }

    if (userRole === USER_ROLES.PURCHASE_MAN) {
      return [
        ...baseItems,
        { to: '/dashboard/purchases', icon: 'orders', label: 'Purchases' },
        // { to: '/dashboard/inventory', icon: 'inventory', label: 'Inventory' },
        { to: '/dashboard/profile', icon: 'profile', label: 'Profile' }
      ];
    }

    // Default for USER role
    return [
      ...baseItems,
      { to: '/dashboard/orders', icon: 'orders', label: 'Orders' },
      { to: '/dashboard/profile', icon: 'profile', label: 'Profile' }
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-blue-200 dark:border-gray-700 transition-all duration-300 ${mobile ? '' : 'hidden md:block'}`}>
      <nav className="p-6 space-y-3">
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600">
          <label className="text-xs font-medium text-blue-700 dark:text-orange-400 mb-2 block">{t('common.language')}</label>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)} 
            className="w-full border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value={Languages.EN}>English</option>
            <option value={Languages.HI}>हिंदी</option>
            <option value={Languages.BN}>বাংলা</option>
            <option value={Languages.GU}>ગુજરાતી</option>
          </select>
        </div>
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <SpriteIcons name={item.icon} className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideMenu;