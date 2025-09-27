import { useState, useEffect } from 'react';
import SpriteIcons from '../../components/SpriteIcons';
import { useI18n } from '../../i18n/i18n';
import { useTheme } from '../../contexts/ThemeContext';
import { getUserData } from '../../services/coreServices';

const SalesmanDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalSales: '₹1.8L',
    ordersCompleted: 45,
    customersServed: 28,
    targetAchieved: 92
  });
  const [recentSales, setRecentSales] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for salesman dashboard
      setRecentSales([
        { id: 'SALE-1023', customer: 'Sharma Store', amount: '₹12,340', items: 8, date: '2025-09-20' },
        { id: 'SALE-1022', customer: 'Gupta Mart', amount: '₹8,120', items: 5, date: '2025-09-19' },
        { id: 'SALE-1021', customer: 'RK SuperMart', amount: '₹21,560', items: 12, date: '2025-09-19' },
        { id: 'SALE-1020', customer: 'Local Kirana', amount: '₹5,890', items: 3, date: '2025-09-18' }
      ]);

      setTopCustomers([
        { name: 'Sharma Store', totalPurchases: '₹45,000', orders: 12, lastOrder: '2025-09-20' },
        { name: 'RK SuperMart', totalPurchases: '₹38,500', orders: 8, lastOrder: '2025-09-19' },
        { name: 'Gupta Mart', totalPurchases: '₹32,200', orders: 15, lastOrder: '2025-09-18' }
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
      delta: '+22% this month', 
      icon: 'stats', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Orders Completed', 
      value: stats.ordersCompleted, 
      delta: '+8 this week', 
      icon: 'orders', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Customers Served', 
      value: stats.customersServed, 
      delta: '+5 new customers', 
      icon: 'customers', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: 'Target Achieved', 
      value: `${stats.targetAchieved}%`, 
      delta: '8% to go', 
      icon: 'target', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
  ];

  const salesGoals = [
    { goal: 'Monthly Sales Target', current: 180000, target: 200000, unit: '₹' },
    { goal: 'New Customers', current: 28, target: 35, unit: '' },
    { goal: 'Orders Completed', current: 45, target: 50, unit: '' }
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
            Sales Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userData?.name}! Track your sales performance and customer relationships.
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
        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="sales" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Recent Sales</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Sale ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Customer</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Items</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{sale.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{sale.customer}</td>
                    <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">{sale.amount}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{sale.items} items</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Goals */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="target" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Sales Goals</span>
          </div>
          <div className="p-6 space-y-6">
            {salesGoals.map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{goal.goal}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.unit}{goal.current.toLocaleString()} / {goal.unit}{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        percentage >= 100 ? 'bg-green-500' : 
                        percentage >= 75 ? 'bg-blue-500' : 
                        percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-1">
                    <span className={`text-xs font-semibold ${
                      percentage >= 100 ? 'text-green-600 dark:text-green-400' : 
                      percentage >= 75 ? 'text-blue-600 dark:text-blue-400' : 
                      percentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <SpriteIcons name="customers" className="w-6 h-6 text-green-600 dark:text-green-500 mr-3" />
          <span className="text-lg">Top Customers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {topCustomers.map((customer, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-semibold text-lg">
                    {customer.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{customer.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{customer.orders} orders</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Purchases:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{customer.totalPurchases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Order:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{customer.lastOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <SpriteIcons name="actions" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <SpriteIcons name="add" className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">New Sale</span>
          </button>
          <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <SpriteIcons name="customers" className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">View Customers</span>
          </button>
          <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <SpriteIcons name="inventory" className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Check Inventory</span>
          </button>
          <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <SpriteIcons name="stats" className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Sales Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesmanDashboard;
