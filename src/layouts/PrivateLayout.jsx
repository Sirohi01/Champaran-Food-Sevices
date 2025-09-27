import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import SideMenu from '../components/SideMenu';
import { useI18n } from '../i18n/i18n';
import { useTheme } from '../contexts/ThemeContext';
import { logoutUser } from '../services/coreServices';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();
  const { isDark } = useTheme();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <DashboardHeader onToggleSidebar={() => setMobileOpen(!mobileOpen)} onLogout={handleLogout} />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 p-6 bg-transparent text-gray-800 dark:text-gray-200">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-r border-blue-200 dark:border-gray-700">
            <div className="p-4 border-b border-blue-200 dark:border-gray-700 flex items-center justify-between">
              <div className="font-semibold text-gray-800 dark:text-gray-200">{t('common.menu')}</div>
              <button 
                className="text-sm px-3 py-1.5 bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-gray-300 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors" 
                onClick={() => setMobileOpen(false)}
              >
                {t('common.close')}
              </button>
            </div>
            <div onClick={() => setMobileOpen(false)}>
              <SideMenu mobile={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateLayout;


