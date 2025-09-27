import React from 'react';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const ManagerHeader = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const userData = getUserData();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <SpriteIcons name="chart" className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>
            <p className="text-blue-100">Welcome back, {userData?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-blue-100">Team Performance</div>
          <div className="text-lg font-semibold">Excellent</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;
