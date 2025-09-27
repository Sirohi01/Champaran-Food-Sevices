import { useState, useEffect } from 'react';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const UserDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    myOrders: 8,
    totalSpent: '₹45K',
    activeOrders: 2,
    completedOrders: 6
  });
  const [myOrders, setMyOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for user dashboard
      setMyOrders([
        { id: 'ORD-1023', items: 'Rice, Oil, Flour', amount: '₹12,340', status: 'Delivered', date: '2025-09-20' },
        { id: 'ORD-1022', items: 'Spices, Lentils', amount: '₹8,120', status: 'In Transit', date: '2025-09-19' },
        { id: 'ORD-1021', items: 'Vegetables, Fruits', amount: '₹5,560', status: 'Processing', date: '2025-09-18' },
        { id: 'ORD-1020', items: 'Dairy Products', amount: '₹3,890', status: 'Delivered', date: '2025-09-17' }
      ]);

      setNotifications([
        { type: 'success', message: 'Your order ORD-1023 has been delivered successfully', time: '2 hours ago' },
        { type: 'info', message: 'New products available in Rice category', time: '1 day ago' },
        { type: 'warning', message: 'Order ORD-1021 is delayed by 1 day', time: '2 days ago' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: 'My Orders', 
      value: stats.myOrders, 
      delta: '+2 this month', 
      icon: 'orders', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Total Spent', 
      value: stats.totalSpent, 
      delta: 'This year', 
      icon: 'money', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Active Orders', 
      value: stats.activeOrders, 
      delta: 'In progress', 
      icon: 'pending', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    },
    { 
      label: 'Completed Orders', 
      value: stats.completedOrders, 
      delta: 'Successfully delivered', 
      icon: 'check', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    }
  ];

  const quickActions = [
    { name: 'Browse Products', icon: 'products', color: 'blue' },
    { name: 'Track Orders', icon: 'track', color: 'green' },
    { name: 'My Profile', icon: 'profile', color: 'purple' },
    { name: 'Support', icon: 'support', color: 'orange' }
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
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userData?.name}! Here's your order summary and account overview.
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
        {/* My Orders */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="orders" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">My Recent Orders</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Order ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Items</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{order.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{order.items}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        order.status === 'In Transit' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="notifications" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Notifications</span>
          </div>
          <ul className="divide-y divide-blue-200 dark:divide-gray-700">
            {notifications.map((notification, index) => (
              <li key={index} className="px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <SpriteIcons 
                      name={notification.type === 'success' ? 'check' : notification.type === 'warning' ? 'warning' : 'info'} 
                      className={`w-4 h-4 ${
                        notification.type === 'success' ? 'text-green-600 dark:text-green-400' :
                        notification.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <SpriteIcons name="actions" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button key={index} className={`p-4 bg-${action.color}-50 dark:bg-${action.color}-900/20 rounded-xl hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-colors`}>
              <SpriteIcons name={action.icon} className={`w-8 h-8 text-${action.color}-600 dark:text-${action.color}-400 mx-auto mb-2`} />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <SpriteIcons name="profile" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          Account Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                  {userData?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{userData?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.email}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹45,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
