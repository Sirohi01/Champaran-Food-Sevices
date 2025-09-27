import { useState, useEffect } from 'react';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const ManagerDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalSales: '₹3.2L',
    totalPurchases: '₹1.8L',
    inventory: 2450,
    profit: '₹1.4L'
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for manager dashboard
      setRecentTransactions([
        { id: 'TXN-1023', type: 'Sale', customer: 'Sharma Store', amount: '₹12,340', date: '2025-09-20' },
        { id: 'TXN-1022', type: 'Purchase', supplier: 'ABC Suppliers', amount: '₹8,120', date: '2025-09-19' },
        { id: 'TXN-1021', type: 'Sale', customer: 'RK SuperMart', amount: '₹21,560', date: '2025-09-19' },
        { id: 'TXN-1020', type: 'Purchase', supplier: 'XYZ Distributors', amount: '₹15,890', date: '2025-09-18' }
      ]);

      setInventoryAlerts([
        { sku: 'RICE-25KG', name: 'Basmati Rice 25kg', stock: 14, reorderLevel: 20 },
        { sku: 'OIL-15L', name: 'Sunflower Oil 15L', stock: 22, reorderLevel: 30 },
        { sku: 'ATTA-50KG', name: 'Wheat Flour 50kg', stock: 9, reorderLevel: 15 }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: 'Total Sales', 
      value: stats.totalSales, 
      delta: '+18% vs last month', 
      icon: 'stats', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Total Purchases', 
      value: stats.totalPurchases, 
      delta: '+12% vs last month', 
      icon: 'orders', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Inventory Items', 
      value: stats.inventory, 
      delta: '95% in stock', 
      icon: 'inventory', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: 'Net Profit', 
      value: stats.profit, 
      delta: '+25% vs last month', 
      icon: 'profit', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
  ];

  const teamPerformance = [
    { name: 'Raj Kumar', role: 'Sales Person', sales: '₹85K', target: '₹80K', performance: 106 },
    { name: 'Priya Sharma', role: 'Purchase Manager', savings: '₹12K', target: '₹10K', performance: 120 },
    { name: 'Amit Singh', role: 'Sales Person', sales: '₹72K', target: '₹80K', performance: 90 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">
            Manager Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userData?.name}! Monitor your store operations and team performance.
          </p>
        </div>
        <div className="text-sm text-blue-600 dark:text-orange-400 font-medium">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.bg} shadow-lg`}>
                <SpriteIcons name={stat.icon} className="w-7 h-7" color={stat.color.replace('text-', '')} />
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                {stat.delta}
              </div>
            </div>
            <div className="text-sm text-blue-600 dark:text-orange-400 mb-2 font-medium">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="transactions" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Recent Transactions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Transaction ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Type</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Party</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{txn.id}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        txn.type === 'Sale' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {txn.customer || txn.supplier}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{txn.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="warning" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Low Stock Alerts</span>
          </div>
          <ul className="divide-y divide-blue-200 dark:divide-gray-700">
            {inventoryAlerts.map((item) => (
              <li key={item.sku} className="px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</div>
                    <div className="text-xs text-blue-600 dark:text-orange-400 mt-1">SKU: {item.sku}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Reorder Level: {item.reorderLevel}
                    </div>
                  </div>
                  <div className={`text-lg font-bold px-3 py-1 rounded-full ${
                    item.stock < item.reorderLevel ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30' : 
                    'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
                  }`}>
                    {item.stock}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <SpriteIcons name="team" className="w-6 h-6 text-green-600 dark:text-green-500 mr-3" />
          <span className="text-lg">Team Performance</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {teamPerformance.map((member, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {member.sales ? 'Sales' : 'Savings'}:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {member.sales || member.savings}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Target:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{member.target}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Performance:</span>
                  <span className={`font-semibold ${
                    member.performance >= 100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {member.performance}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      member.performance >= 100 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(member.performance, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
