import React from 'react';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const PurchaseHeader = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const userData = getUserData();

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-800 dark:to-orange-900 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <SpriteIcons name="purchase" className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Purchase Dashboard</h1>
            <p className="text-orange-100">Welcome back, {userData?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-orange-100">Monthly Budget</div>
          <div className="text-lg font-semibold">₹2.5L</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHeader;
