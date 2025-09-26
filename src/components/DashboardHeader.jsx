import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../i18n/i18n';

const DashboardHeader = ({ onToggleSidebar, onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useI18n();

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-blue-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 sticky top-0 z-50 shadow-lg dark:shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onToggleSidebar} className="md:hidden mr-2 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
            <span className="block w-5 h-0.5 bg-blue-600 dark:bg-gray-400 mb-1"></span>
            <span className="block w-5 h-0.5 bg-blue-600 dark:bg-gray-400 mb-1"></span>
            <span className="block w-5 h-0.5 bg-blue-600 dark:bg-gray-400"></span>
          </button>
          <button onClick={() => navigate(-1)} className="md:hidden mr-2 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors" aria-label="Go back">
            <span className="inline-block rotate-180 text-blue-600 dark:text-gray-400">➜</span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">CF</div>
          <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">Dashboard</div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onLogout} className="text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 dark:from-orange-500 dark:to-red-600 dark:hover:from-orange-600 dark:hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md">
            {t('common.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;


