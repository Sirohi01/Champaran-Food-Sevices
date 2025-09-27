import { useState, useEffect } from 'react';
import SpriteIcons from '../../components/SpriteIcons';
import { useI18n } from '../../i18n/i18n';
import { useTheme } from '../../contexts/ThemeContext';
import callApi from '../../services/apiServices';
import { getUserData } from '../../services/coreServices';

const AdminDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    storeUsers: 0,
    storeRevenue: '₹0',
    totalOrders: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [storeUsers, setStoreUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users for this store
      try {
        const usersResponse = await callApi({
          endpoint: "api/v1/user/users",
          method: "GET"
        });
        if (usersResponse.data && usersResponse.data.data) {
          const storeFilteredUsers = usersResponse.data.data.filter(user => 
            user.storeId === userData.storeId && user.role !== 'admin'
          );
          setStats(prev => ({
            ...prev,
            storeUsers: storeFilteredUsers.length
          }));
          setStoreUsers(storeFilteredUsers.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }

      // Mock data for orders and revenue (implement actual APIs)
      setStats(prev => ({
        ...prev,
        storeRevenue: '₹8.5L',
        totalOrders: 156,
        pendingOrders: 12
      }));

      // Mock recent orders
      setRecentOrders([
        { id: 'ORD-1023', customer: 'Sharma Store', amount: '₹12,340', status: 'Shipped', date: '2025-09-20' },
        { id: 'ORD-1022', customer: 'Gupta Mart', amount: '₹8,120', status: 'Processing', date: '2025-09-19' },
        { id: 'ORD-1021', customer: 'RK SuperMart', amount: '₹21,560', status: 'Delivered', date: '2025-09-19' },
        { id: 'ORD-1020', customer: 'Local Kirana', amount: '₹5,890', status: 'Pending', date: '2025-09-18' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: 'Store Staff', 
      value: stats.storeUsers, 
      delta: '+2 new members', 
      icon: 'team', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Store Revenue', 
      value: stats.storeRevenue, 
      delta: '+15% vs last month', 
      icon: 'stats', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      delta: '+8% this week', 
      icon: 'orders', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: 'Pending Orders', 
      value: stats.pendingOrders, 
      delta: 'Needs attention', 
      icon: 'warning', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
  ];

  const tasksList = [
    { task: 'Review pending orders', priority: 'high', completed: false },
    { task: 'Update inventory levels', priority: 'medium', completed: false },
    { task: 'Staff performance review', priority: 'low', completed: true },
    { task: 'Monthly sales report', priority: 'medium', completed: false }
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {userData?.name}! Manage your store operations.
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
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="orders" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Recent Orders</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Order ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Customer</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{order.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{order.customer}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        order.status === 'Processing' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
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

        {/* Tasks & Reminders */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="tasks" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">Tasks & Reminders</span>
          </div>
          <ul className="divide-y divide-blue-200 dark:divide-gray-700">
            {tasksList.map((task, index) => (
              <li key={index} className="px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    readOnly
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {task.task}
                    </p>
                    <p className={`text-xs mt-1 font-semibold ${
                      task.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                      task.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {task.priority.toUpperCase()} PRIORITY
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Store Staff */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <SpriteIcons name="team" className="w-6 h-6 text-green-600 dark:text-green-500 mr-3" />
          <span className="text-lg">Store Staff</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {storeUsers.map((user) => (
            <div key={user._id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
