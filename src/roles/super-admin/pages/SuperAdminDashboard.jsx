import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpriteIcons from '../../../components/SpriteIcons';
import { useI18n } from '../../../i18n/i18n';
import { useTheme } from '../../../contexts/ThemeContext';
import { getUserData } from '../../../services/coreServices';

const SuperAdminDashboard = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRevenue: '₹0',
    activeStaff: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  
  // New states for graphs
  const [storeAnalyticsData, setStoreAnalyticsData] = useState({});
  const [salesTrendsData, setSalesTrendsData] = useState({});
  const [engagementData, setEngagementData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
    fetchGraphData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for super admin dashboard
      setStats({
        totalUsers: 1245,
        totalStores: 42,
        totalRevenue: '₹15.2L',
        activeStaff: 86
      });

      setRecentUsers([
        { id: 'USR-1001', name: 'Amit Kumar', email: 'amit@example.com', role: 'admin', status: 'active' },
        { id: 'USR-1002', name: 'Priya Sharma', email: 'priya@example.com', role: 'manager', status: 'active' },
        { id: 'USR-1003', name: 'Rahul Verma', email: 'rahul@example.com', role: 'salesPerson', status: 'inactive' },
        { id: 'USR-1004', name: 'Neha Gupta', email: 'neha@example.com', role: 'purchaseManager', status: 'active' },
        { id: 'USR-1005', name: 'Vikram Singh', email: 'vikram@example.com', role: 'super_admin', status: 'active' }
      ]);

      setSystemAlerts([
        { 
          type: 'warning', 
          message: t('dashboard.alerts.serverMaintenance'), 
          priority: 'medium' 
        },
        { 
          type: 'info', 
          message: t('dashboard.alerts.newFeature'), 
          priority: 'low' 
        },
        { 
          type: 'error', 
          message: t('dashboard.alerts.syncIssue'), 
          priority: 'high' 
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGraphData = async () => {
    try {
      setGraphLoading(true);
      
      setStoreAnalyticsData({
        totalStores: 42,
        chartData: {
          labels: ['Electronics', 'Clothing', 'Grocery', 'Books'],
          datasets: [
            {
              data: [18, 12, 8, 4],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }
          ]
        },
        filteredData: [
          { name: 'Electronics', percentage: 43, count: 18, icon: '📱' },
          { name: 'Clothing', percentage: 29, count: 12, icon: '👕' },
          { name: 'Grocery', percentage: 19, count: 8, icon: '🛒' },
          { name: 'Books', percentage: 9, count: 4, icon: '📚' }
        ]
      });

      setSalesTrendsData({
        totalSales: '₹2,45,670',
        totalEarnings: '₹45,230',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Sales',
              data: [12000, 19000, 15000, 25000, 22000, 30000],
              backgroundColor: '#4BC0C0'
            },
            {
              label: 'Earnings',
              data: [5000, 7000, 5500, 9000, 8000, 11000],
              backgroundColor: '#FF6384'
            }
          ]
        }
      });

      setEngagementData({
        totalUsers: 1245,
        data: {
          labels: ['Active', 'Inactive', 'New'],
          datasets: [
            {
              data: [65, 25, 10],
              backgroundColor: ['#4CAF50', '#F44336', '#2196F3']
            }
          ]
        },
        filteredData: [
          { type: 'Active Users', percentage: 65, points: 809, color: '#4CAF50' },
          { type: 'Inactive Users', percentage: 25, points: 311, color: '#F44336' },
          { type: 'New Users', percentage: 10, points: 125, color: '#2196F3' }
        ]
      });

      setInventoryData({
        totalProducts: 5420,
        chartData: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Stock Added',
              data: [1200, 1900, 1500, 2500],
              borderColor: '#36A2EB',
              tension: 0.4
            },
            {
              label: 'Products Sold',
              data: [800, 1200, 1000, 2000],
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
      label: t('dashboard.totalUsers'), 
      value: stats.totalUsers, 
      delta: t('dashboard.newUsersWeek'), 
      icon: 'users', 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: t('dashboard.totalStores'), 
      value: stats.totalStores, 
      delta: t('dashboard.newStores'), 
      icon: 'store', 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: t('dashboard.totalRevenue'), 
      value: stats.totalRevenue, 
      delta: t('dashboard.revenueGrowth'), 
      icon: 'stats', 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
    { 
      label: t('dashboard.activeStaff'), 
      value: stats.activeStaff, 
      delta: t('dashboard.staffCount', { count: stats.activeStaff }), 
      icon: 'team', 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    }
  ];

  // Graph options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

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
            {t('dashboard.superAdminTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('dashboard.welcomeMessage', { name: userData?.name })}
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

      {/* Analytics Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Analytics Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Store Categories</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 justify-items-center">
            <div className="w-full flex justify-center">
              {/* Placeholder for Pie Chart */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{storeAnalyticsData.totalStores}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Stores</div>
                </div>
              </div>
            </div>

            <div className="w-full">
              {storeAnalyticsData.filteredData?.map((item, index) => (
                <div key={index} className="grid grid-cols-3 items-center h-10 mb-2 text-sm">
                  <p className="flex items-center">
                    <span className="text-lg mr-2">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-end">{item.percentage}%</p>
                  <p className="font-semibold text-end text-gray-800 dark:text-gray-200">{item.count}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-start items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="store" className="w-5 h-5 text-blue-600 dark:text-orange-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Total Stores :</span>
              <div className="font-semibold text-2xl ml-3 text-gray-800 dark:text-gray-200">
                {storeAnalyticsData.totalStores}
              </div>
            </div>
          </div>
        </div>

        {/* Sales and Trends Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Sales and Trends</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="min-h-[200px] mb-4">
            {/* Placeholder for Bar Chart */}
            <div className="w-full h-40 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{salesTrendsData.totalSales}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Month Sales</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="rupee" className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Total Sales :</span>
              <div className="font-semibold text-2xl ml-3 text-gray-800 dark:text-gray-200">
                {salesTrendsData.totalSales}
              </div>
            </div>

            <div className="flex items-center">
              <SpriteIcons name="rupee" className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Earnings :</span>
              <div className="font-semibold text-2xl ml-3 text-gray-800 dark:text-gray-200">
                {salesTrendsData.totalEarnings}
              </div>
            </div>
          </div>
        </div>

        {/* User Engagement Status Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6 max-h-[370px] relative">
          {graphLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 flex items-center justify-center z-10 rounded-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 border-b border-blue-200 dark:border-gray-700 pb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">User Engagement</h2>
            <div className="flex items-center space-x-2">
              <input 
                type="date"
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 justify-items-center">
            <div className="w-full flex justify-center items-center">
              {/* Placeholder for Doughnut Chart */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800 dark:text-gray-200">65%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                </div>
              </div>
            </div>

            <div className="w-full">
              {engagementData.filteredData?.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-5 items-center mb-2 text-sm">
                  <div className="flex items-center">
                    <div 
                      style={{ backgroundColor: item.color }} 
                      className="w-4 h-4 rounded-full mr-2"
                    ></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center justify-around">
                    <p className="text-gray-500 dark:text-gray-400">{item.percentage}%</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.points}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-start items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="users" className="w-5 h-5 text-blue-600 dark:text-orange-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Total Users :</span>
              <div className="font-semibold text-2xl ml-3 text-gray-800 dark:text-gray-200">
                {engagementData.totalUsers}
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

          <div className="min-h-[200px] mb-4">
            {/* Placeholder for Line Chart */}
            <div className="w-full h-40 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{inventoryData.totalProducts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Products</div>
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center mt-4 border-t border-blue-200 dark:border-gray-700 pt-2 gap-4">
            <div className="flex items-center">
              <SpriteIcons name="package" className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">Total Products :</span>
              <div className="font-semibold text-2xl ml-3 text-gray-800 dark:text-gray-200">
                {inventoryData.totalProducts}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="users" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">{t('dashboard.recentUsers')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">User ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">{t('common.name')}</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">{t('common.email')}</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">{t('common.role')}</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">{t('common.status')}</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">{user.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{user.name}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        user.role === 'super_admin' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        user.role === 'manager' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        user.role === 'salesPerson' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        user.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {user.status === 'active' ? t('common.active') : t('common.inactive')}
                      </span>
                    </td>
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
            <span className="text-lg">{t('dashboard.systemAlerts')}</span>
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
          {t('dashboard.quickActions')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/dashboard/user-management')}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="user-plus" className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.manageUsers')}</span>
          </button>
          <button 
            onClick={() => navigate('/dashboard/store-management')}
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex flex-col items-center"
          >
            <SpriteIcons name="store" className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.manageStores')}</span>
          </button>
          <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors flex flex-col items-center">
            <SpriteIcons name="report" className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.reports')}</span>
          </button>
          <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex flex-col items-center">
            <SpriteIcons name="settings" className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('dashboard.systemSettings')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;