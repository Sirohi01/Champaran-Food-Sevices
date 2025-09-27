import React from 'react';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const SalesmanHeader = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const userData = getUserData();

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-800 dark:to-green-900 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <SpriteIcons name="sales" className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sales Dashboard</h1>
            <p className="text-green-100">Welcome back, {userData?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-green-100">Today's Target</div>
          <div className="text-lg font-semibold">₹25,000</div>
        </div>
      </div>
    </div>
  );
};

export default SalesmanHeader;
