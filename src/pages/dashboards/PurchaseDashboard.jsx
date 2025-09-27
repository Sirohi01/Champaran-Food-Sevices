import { useState, useEffect } from 'react';
import SpriteIcons from '../../components/SpriteIcons';
import { useI18n } from '../../i18n/i18n';
import { useTheme } from '../../contexts/ThemeContext';
import { getUserData } from '../../services/coreServices';

const PurchaseDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalPurchases: '₹2.1L',
    ordersPlaced: 32,
    suppliersManaged: 15,
    costSavings: '₹18K'
  });
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for purchase manager dashboard
      setRecentPurchases([
        { id: 'PUR-1023', supplier: 'ABC Suppliers', amount: '₹25,340', items: 15, date: '2025-09-20', status: 'Delivered' },
        { id: 'PUR-1022', supplier: 'XYZ Distributors', amount: '₹18,120', items: 8, date: '2025-09-19', status: 'In Transit' },
        { id: 'PUR-1021', supplier: 'Global Traders', amount: '₹32,560', items: 20, date: '2025-09-18', status: 'Delivered' },
        { id: 'PUR-1020', supplier: 'Local Wholesale', amount: '₹12,890', items: 6, date: '2025-09-17', status: 'Pending' }
      ]);

      setTopSuppliers([
        { name: 'ABC Suppliers', totalOrders: '₹85,000', orders: 12, rating: 4.8, lastOrder: '2025-09-20' },
        { name: 'XYZ Distributors', totalOrders: '₹72,500', orders: 8, rating: 4.6, lastOrder: '2025-09-19' },
        { name: 'Global Traders', totalOrders: '₹68,200', orders: 15, rating: 4.7, lastOrder: '2025-09-18' }
      ]);

      setPendingOrders([
        { id: 'PUR-1025', supplier: 'New Supplier Co.', amount: '₹15,000', expectedDate: '2025-09-25' },
        { id: 'PUR-1024', supplier: 'Quick Delivery Ltd.', amount: '₹8,500', expectedDate: '2025-09-23' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: 'Total Purchases', 
      value: stats.totalPurchases, 
      delta: '+15% this month', 
      icon: 'orders', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Orders Placed', 
      value: stats.ordersPlaced, 
      delta: '+6 this week', 
      icon: 'purchase', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Suppliers Managed', 
      value: stats.suppliersManaged, 
      delta: '+2 new suppliers', 
      icon: 'suppliers', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: 'Cost Savings', 
      value: stats.costSavings, 
      delta: '12% saved vs budget', 
      icon: 'savings', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
  ];

  const purchaseGoals = [
    { goal: 'Monthly Purchase Budget', current: 210000, target: 250000, unit: '₹' },
    { goal: 'Cost Savings Target', current: 18000, target: 25000, unit: '₹' },
    { goal: 'Supplier Relationships', current: 15, target: 20, unit: '' }
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
            Purchase Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userData?.name}! Manage your procurement operations and supplier relationships.
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
        {/* Recent Purchases */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="purchase" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Recent Purchases</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Purchase ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Supplier</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{purchase.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{purchase.supplier}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">{purchase.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        purchase.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        purchase.status === 'In Transit' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Goals */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="target" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Purchase Goals</span>
          </div>
          <div className="p-6 space-y-6">
            {purchaseGoals.map((goal, index) => {
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

      {/* Suppliers and Pending Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Suppliers */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="suppliers" className="w-6 h-6 text-green-600 dark:text-green-500 mr-3" />
            <span className="text-lg">Top Suppliers</span>
          </div>
          <div className="p-6 space-y-4">
            {topSuppliers.map((supplier, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {supplier.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{supplier.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{supplier.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">{supplier.totalOrders}</p>
                    <div className="flex items-center space-x-1">
                      <SpriteIcons name="star" className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last Order: {supplier.lastOrder}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="pending" className="w-6 h-6 text-yellow-600 dark:text-yellow-500 mr-3" />
            <span className="text-lg">Pending Orders</span>
          </div>
          <div className="p-6 space-y-4">
            {pendingOrders.map((order, index) => (
              <div key={index} className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{order.id}</span>
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">{order.amount}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{order.supplier}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Expected: {order.expectedDate}</span>
                  <button className="text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors">
                    Follow Up
                  </button>
                </div>
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <SpriteIcons name="check" className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>No pending orders</p>
              </div>
            )}
          </div>
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
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">New Purchase</span>
          </button>
          <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <SpriteIcons name="suppliers" className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Manage Suppliers</span>
          </button>
          <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <SpriteIcons name="inventory" className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Check Inventory</span>
          </button>
          <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <SpriteIcons name="stats" className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Purchase Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDashboard;
