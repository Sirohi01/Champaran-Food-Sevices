import { NavLink } from 'react-router-dom';
import SpriteIcons from './SpriteIcons';
import { useI18n, Languages } from '../i18n/i18n';
import { useTheme } from '../contexts/ThemeContext';

const SideMenu = ({ mobile = false }) => {
  const { t, lang, setLang } = useI18n();
  const { isDark } = useTheme();
  
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white shadow-lg transform scale-105' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-orange-400 hover:scale-105'
    }`;
  const menuItems = [
    { to: '/dashboard', icon: 'dashboard', label: t('dashboard.overview') },
    { to: '/orders', icon: 'orders', label: t('dashboard.orders') },
    { to: '/inventory', icon: 'inventory', label: t('dashboard.inventory') },
    { to: '/settings', icon: 'settings', label: t('dashboard.settings') }
  ];

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


