import { NavLink } from 'react-router-dom';
import SpriteIcons from './SpriteIcons';
import { useI18n, Languages } from '../i18n/i18n';

const linkClass = ({ isActive }) =>
  `flex items-center px-3 py-2 rounded ${isActive ? 'bg-gray-200 font-medium' : 'hover:bg-gray-200'}`;

const SideMenu = ({ mobile = false }) => {
  const { t, lang, setLang } = useI18n();
  const menuItems = [
    { to: '/dashboard', icon: 'dashboard', label: t('dashboard.overview') },
    { to: '/orders', icon: 'orders', label: t('dashboard.orders') },
    { to: '/inventory', icon: 'inventory', label: t('dashboard.inventory') },
    { to: '/settings', icon: 'settings', label: t('dashboard.settings') }
  ];

  return (
    <aside className={`w-64 bg-gray-100 border-r border-gray-200 ${mobile ? '' : 'hidden md:block'}`}>
      <nav className="p-4 space-y-2">
        <div className="mb-2">
          <label className="text-xs text-gray-500 mr-2">{t('common.language')}</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="border border-gray-300 rounded-md text-sm px-2 py-1 w-full md:w-auto">
            <option value={Languages.EN}>EN</option>
            <option value={Languages.HI}>हिंदी</option>
            <option value={Languages.BN}>বাংলা</option>
            <option value={Languages.GU}>ગુજરાતી</option>
          </select>
        </div>
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <SpriteIcons name={item.icon} className="w-5 h-5 mr-3 text-gray-600" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideMenu;


