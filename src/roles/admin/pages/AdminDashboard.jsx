import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const AdminDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: '₹0',
    todaySales: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  
  // New states for store-specific graphs
  const [salesData, setSalesData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [staffData, setStaffData] = useState({});
  
  const userData = getUserData();
  const currentStore = userData?.store || 'Main Store'; // Current store from user data

  useEffect(() => {
    fetchDashboardData();
    fetchStoreGraphData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for specific store dashboard
      setStats({
        totalUsers: 45,
        totalProducts: 1280,
        totalRevenue: '₹2.8L',
        todaySales: 42
      });

      setRecentActivities([
        { 
          id: 'ACT-1001', 
          type: 'sale', 
          description: 'New sale completed - Order #ORD-7821', 
          amount: '₹2,450', 
          time: '2 hours ago',
          user: 'Rahul Verma'
        },
        { 
          id: 'ACT-1002', 
          type: 'product', 
          description: 'New product added - iPhone 14', 
          amount: '', 
          time: '4 hours ago',
          user: 'Priya Sharma'
        },
        { 
          id: 'ACT-1003', 
          type: 'customer', 
          description: 'New customer registered - Amit Kumar', 
          amount: '', 
          time: '6 hours ago',
          user: 'System'
        },
        { 
          id: 'ACT-1004', 
          type: 'sale', 
          description: 'Sale return processed - Order #ORD-7815', 
          amount: '₹-1,200', 
          time: '1 day ago',
          user: 'Neha Gupta'
        },
        { 
          id: 'ACT-1005', 
          type: 'stock', 
          description: 'Low stock alert - Samsung Galaxy S23', 
          amount: '', 
          time: '1 day ago',
          user: 'System'
        }
      ]);

      setSystemAlerts([
        { 
          type: 'warning', 
          message: t('dashboard.alerts.lowStock'), 
          priority: 'medium' 
        },
        { 
          type: 'info', 
          message: t('dashboard.alerts.newOrders'), 
          priority: 'low' 
        },
        { 
          type: 'error', 
          message: t('dashboard.alerts.systemUpdate'), 
          priority: 'high' 
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStoreGraphData = async () => {
    try {
      setGraphLoading(true);
      
      // Store-specific sales data
      setSalesData({
        todaySales: 42,
        weeklySales: 285,
        monthlyRevenue: '₹2.8L',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Daily Sales',
              data: [35, 42, 38, 45, 52, 48, 42],
              backgroundColor: '#4BC0C0'
            }
          ]
        }
      });

      // Store-specific inventory data
      setInventoryData({
        totalProducts: 1280,
        lowStockItems: 12,
        outOfStock: 3,
        chartData: {
          labels: ['In Stock', 'Low Stock', 'Out of Stock'],
          datasets: [
            {
              data: [1265, 12, 3],
              backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
            }
          ]
        },
        filteredData: [
          { status: 'In Stock', percentage: 98.8, count: 1265, color: '#4CAF50' },
          { status: 'Low Stock', percentage: 0.9, count: 12, color: '#FF9800' },
          { status: 'Out of Stock', percentage: 0.3, count: 3, color: '#F44336' }
        ]
      });

      setCustomerData({
        totalCustomers: 1245,
        newThisMonth: 45,
        returningCustomers: 320,
        data: {
          labels: ['New', 'Returning', 'Inactive'],
          datasets: [
            {
              data: [45, 320, 880],
              backgroundColor: ['#2196F3', '#4CAF50', '#9E9E9E']
            }
          ]
        }
      });

      // Store-specific staff data
      setStaffData({
        totalStaff: 15,
        activeToday: 8,
        performance: 87,
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Staff Performance',
              data: [75, 80, 82, 85, 87, 87],
              borderColor: '#FF6384',
              tension: 0.4
            }
          ]
        }
      });

    } catch (error) {
      console.error('Error fetching graph data:', error);
    } finally {
      setGraphLoading(false);
    }
  };

  const dashboardStats = [
    { 
      label: t('dashboard.storeUsers'), 
      value: stats.totalUsers, 
      delta: t('dashboard.activeToday'), 
      icon: 'users', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: t('dashboard.totalProducts'), 
      value: stats.totalProducts, 
      delta: t('dashboard.lowStockItems'), 
      icon: 'package', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: t('dashboard.monthlyRevenue'), 
      value: stats.totalRevenue, 
      delta: t('dashboard.revenueGrowth'), 
      icon: 'stats', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: t('dashboard.todaySales'), 
      value: stats.todaySales, 
      delta: t('dashboard.weeklySales'), 
      icon: 'sales', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
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
            {t('dashboard.adminTitle')} - {currentStore}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('dashboard.storeWelcome', { name: userData?.name, store: currentStore })}
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

      {/* Store Analytics Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sales Performance</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="min-h-[200px] mb-4">
            {/* Placeholder for Sales Chart */}
            <div className="w-full h-40 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{salesData.todaySales}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Today's Sales</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="sales" className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Today:</span>
              <div className="font-semibold text-xl ml-2 text-gray-800 dark:text-gray-200">
                {salesData.todaySales} sales
              </div>
            </div>
            <div className="flex items-center">
              <SpriteIcons name="rupee" className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
              <div className="font-semibold text-xl ml-2 text-gray-800 dark:text-gray-200">
                {salesData.monthlyRevenue}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Status Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Inventory Status</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 justify-items-center">
            <div className="w-full flex justify-center">
              {/* Placeholder for Inventory Chart */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-100 to-red-100 dark:from-green-900 dark:to-red-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{inventoryData.totalProducts}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
                </div>
              </div>
            </div>

            <div className="w-full">
              {inventoryData.filteredData?.map((item, index) => (
                <div key={index} className="grid grid-cols-3 items-center h-10 mb-2 text-sm">
                  <p className="flex items-center">
                    <div 
                      style={{ backgroundColor: item.color }} 
                      className="w-3 h-3 rounded-full mr-2"
                    ></div>
                    <span className="font-medium">{item.status}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-end">{item.percentage}%</p>
                  <p className="font-semibold text-end text-gray-800 dark:text-gray-200">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="warning" className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Low Stock:</span>
              <div className="font-semibold text-xl ml-2 text-gray-800 dark:text-gray-200">
                {inventoryData.lowStockItems} items
              </div>
            </div>
          </div>
        </div>

        {/* Customer Analytics Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Customer Analytics</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="min-h-[200px] mb-4">
            {/* Placeholder for Customer Chart */}
            <div className="w-full h-40 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{customerData.totalCustomers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Customers</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="user-plus" className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">New This Month:</span>
              <div className="font-semibold text-xl ml-2 text-gray-800 dark:text-gray-200">
                {customerData.newThisMonth}
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Staff Performance</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="min-h-[200px] mb-4">
            {/* Placeholder for Performance Chart */}
            <div className="w-full h-40 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{staffData.performance}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Performance</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="users" className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Active Staff:</span>
              <div className="font-semibold text-xl ml-2 text-gray-800 dark:text-gray-200">
                {staffData.activeToday}/{staffData.totalStaff}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="activity" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">{t('dashboard.recentActivities')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Activity ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Description</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">User</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">{activity.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{activity.description}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {activity.amount && (
                        <span className={activity.amount.startsWith('₹-') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                          {activity.amount}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{activity.user}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="warning" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">{t('dashboard.storeAlerts')}</span>
          </div>
          <ul className="divide-y divide-blue-200 dark:divide-gray-700">
            {systemAlerts.map((alert, index) => (
              <li key={index} className="px-6 py-4 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                    alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <SpriteIcons 
                      name={alert.type === 'error' ? 'error' : alert.type === 'warning' ? 'warning' : 'info'} 
                      className={`w-4 h-4 ${
                        alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                        alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                    <p className={`text-xs mt-1 font-semibold ${
                      alert.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                      alert.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {alert.priority}
                    </p>
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
          <SpriteIcons name="settings" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          {t('dashboard.storeQuickActions')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/dashboard/store-sales')}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="sales" className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.manageSales')}</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/store-inventory')}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="package" className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.manageInventory')}</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/store-customers')}
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="users" className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.manageCustomers')}</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/store-reports')}
            className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="report" className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.storeReports')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;