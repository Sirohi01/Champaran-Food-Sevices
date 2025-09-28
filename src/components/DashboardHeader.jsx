import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';
import { getUserData, getRoleDisplayName } from '../services/coreServices';

const DashboardHeader = ({ onToggleSidebar, onLogout }) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const userData = getUserData();

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-blue-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 sticky top-0 z-50 shadow-lg dark:shadow-gray-900/50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={onToggleSidebar} className="md:hidden mr-1 sm:mr-2 p-1.5 sm:p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
            <span className="block w-4 sm:w-5 h-0.5 bg-blue-600 dark:bg-gray-400 mb-1"></span>
            <span className="block w-4 sm:w-5 h-0.5 bg-blue-600 dark:bg-gray-400 mb-1"></span>
            <span className="block w-4 sm:w-5 h-0.5 bg-blue-600 dark:bg-gray-400"></span>
          </button>
          <button onClick={() => navigate(-1)} className="md:hidden mr-1 sm:mr-2 p-1.5 sm:p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors" aria-label="Go back">
            <span className="inline-block rotate-180 text-blue-600 dark:text-gray-400 text-sm sm:text-base">➜</span>
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg text-sm sm:text-base">CF</div>
          <div className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-200 hidden xs:block">Dashboard</div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Info */}
          {userData && (
            <div className="flex items-center space-x-1.5 sm:space-x-3 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-gray-800 rounded-xl max-w-[200px] sm:max-w-none">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs sm:text-sm hidden sm:block">
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[100px] sm:max-w-none">{userData.name}</div>
                <div className="text-xs text-blue-600 dark:text-orange-400 truncate">{getRoleDisplayName(userData.role)}</div>
              </div>
              {/* Mobile: Show only on very small screens */}
              <div className="text-xs sm:hidden">
                <div className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[60px]">{userData.name}</div>
              </div>
            </div>
          )}
          
          {/* Theme Toggle */}
          {/* <button 
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button> */}
          
          {/* Logout Button */}
          <button onClick={onLogout} className="text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 dark:from-orange-500 dark:to-red-600 dark:hover:from-orange-600 dark:hover:to-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md whitespace-nowrap">
            {t('common.logout')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;