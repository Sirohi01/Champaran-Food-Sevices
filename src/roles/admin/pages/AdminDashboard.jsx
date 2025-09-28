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
    todaySales: 0,
    activeCustomers: 0,
    lowStockItems: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userData = getUserData();
  const currentStore = userData?.store || 'Main Store';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for specific store dashboard
      setStats({
        totalUsers: 45,
        totalProducts: 1280,
        totalRevenue: '₹2.8L',
        todaySales: 42,
        activeCustomers: 156,
        lowStockItems: 12
      });

      setRecentActivities([
        { 
          id: 'ACT-1001', 
          type: 'sale', 
          description: 'New sale completed - Order #ORD-7821', 
          amount: '₹2,450', 
          time: '2 hours ago',
          user: 'Rahul Verma',
          icon: '💰'
        },
        { 
          id: 'ACT-1002', 
          type: 'product', 
          description: 'New product added - iPhone 14', 
          amount: '', 
          time: '4 hours ago',
          user: 'Priya Sharma',
          icon: '📦'
        },
        { 
          id: 'ACT-1003', 
          type: 'customer', 
          description: 'New customer registered - Amit Kumar', 
          amount: '', 
          time: '6 hours ago',
          user: 'System',
          icon: '👤'
        },
        { 
          id: 'ACT-1004', 
          type: 'sale', 
          description: 'Sale return processed - Order #ORD-7815', 
          amount: '₹-1,200', 
          time: '1 day ago',
          user: 'Neha Gupta',
          icon: '🔄'
        },
        { 
          id: 'ACT-1005', 
          type: 'stock', 
          description: 'Low stock alert - Samsung Galaxy S23', 
          amount: '', 
          time: '1 day ago',
          user: 'System',
          icon: '⚠️'
        }
      ]);

      setSystemAlerts([
        { 
          type: 'warning', 
          message: 'Low stock alert: Rice and pulses running low', 
          priority: 'high',
          time: '30 minutes ago',
          icon: '⚠️'
        },
        { 
          type: 'info', 
          message: '5 new orders pending processing', 
          priority: 'medium',
          time: '2 hours ago',
          icon: '📦'
        },
        { 
          type: 'success', 
          message: 'Store performance target achieved', 
          priority: 'low',
          time: '5 hours ago',
          icon: '✅'
        },
        { 
          type: 'error', 
          message: 'Payment gateway connectivity issue', 
          priority: 'high',
          time: '1 hour ago',
          icon: '❌'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charts data
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [35, 42, 38, 45, 52, 48, 42],
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.6,
      }
    ]
  };

  const inventoryData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [{
      data: [1265, 12, 3],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const customerData = {
    labels: ['New', 'Returning', 'Inactive'],
    datasets: [{
      data: [45, 320, 880],
      backgroundColor: ['#3B82F6', '#10B981', '#6B7280'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [1.8, 2.2, 2.5, 2.3, 2.7, 2.8],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8B5CF6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6
    }]
  };

  const dashboardStats = [
    { 
      label: 'Store Staff', 
      value: '45', 
      delta: '8 active today', 
      icon: 'users', 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      border: 'border-l-4 border-blue-500',
      trend: 'up'
    },
    { 
      label: 'Total Products', 
      value: '1,280', 
      delta: '12 low stock', 
      icon: 'package', 
      color: 'text-green-600', 
      bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
      border: 'border-l-4 border-green-500',
      trend: 'stable'
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹2.8L', 
      delta: '+15.3% growth', 
      icon: 'rupee', 
      color: 'text-purple-600', 
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
      border: 'border-l-4 border-purple-500',
      trend: 'up'
    },
    { 
      label: 'Today\'s Sales', 
      value: '42', 
      delta: '₹68,420 revenue', 
      icon: 'shopping-cart', 
      color: 'text-orange-600', 
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
      border: 'border-l-4 border-orange-500',
      trend: 'up'
    },
    { 
      label: 'Active Customers', 
      value: '156', 
      delta: '45 new this month', 
      icon: 'users', 
      color: 'text-teal-600', 
      bg: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30',
      border: 'border-l-4 border-teal-500',
      trend: 'up'
    },
    { 
      label: 'Low Stock Items', 
      value: '12', 
      delta: '3 out of stock', 
      icon: 'warning', 
      color: 'text-red-600', 
      bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30',
      border: 'border-l-4 border-red-500',
      trend: 'down'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderBarChart = (data) => {
    const maxValue = Math.max(...data.datasets[0].data);
    return (
      <div className="flex items-end justify-between h-48 gap-2 p-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="flex items-end justify-center w-full">
              <div
                className="w-3/4 relative group"
                style={{ height: '100%' }}
              >
                <div
                  className="w-full rounded-t-lg transition-all duration-500 hover:scale-105 relative"
                  style={{ 
                    height: `${(data.datasets[0].data[index] / maxValue) * 100}%`,
                    backgroundColor: data.datasets[0].backgroundColor,
                    border: `2px solid ${data.datasets[0].borderColor}`
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.datasets[0].data[index]}
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = (data, size = 120) => {
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
    let cumulativePercent = 0;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.datasets[0].data.map((value, index) => {
            const percentage = (value / total) * 100;
            const percent = percentage / 100;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L ${size/2} ${size/2}`,
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={data.datasets[0].backgroundColor[index]}
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{total}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
    );
  };

  const renderLineChart = (data) => {
    const maxValue = Math.max(...data.datasets[0].data);
    return (
      <div className="relative h-48 p-4">
        <svg width="100%" height="100%" viewBox="0 0 400 160" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent, index) => (
            <line
              key={index}
              x1="0"
              y1={percent * 1.6}
              x2="400"
              y2={percent * 1.6}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

          {/* Area fill */}
          <path
            d={getAreaPath(data.datasets[0].data, maxValue, 400, 160)}
            fill={data.datasets[0].backgroundColor}
            opacity="0.3"
          />

          {/* Line */}
          <path
            d={getLinePath(data.datasets[0].data, maxValue, 400, 160)}
            stroke={data.datasets[0].borderColor}
            strokeWidth="3"
            fill="none"
            className="animate-draw"
          />

          {/* Points */}
          {data.datasets[0].data.map((value, index) => {
            const x = (index / (data.labels.length - 1)) * 400;
            const y = 160 - (value / maxValue) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="6"
                fill={data.datasets[0].pointBackgroundColor}
                stroke={data.datasets[0].pointBorderColor}
                strokeWidth="2"
                className="transition-all duration-300 hover:r-8"
              />
            );
          })}

          {/* Labels */}
          {data.labels.map((label, index) => {
            const x = (index / (data.labels.length - 1)) * 400;
            return (
              <text
                key={index}
                x={x}
                y="155"
                textAnchor="middle"
                fontSize="12"
                fill="#6B7280"
                className="font-medium"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  // Helper functions for chart rendering
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [50 + x * 40, 50 + y * 40];
  };

  const getLinePath = (data, maxValue, width, height) => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const getAreaPath = (data, maxValue, width, height) => {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / maxValue) * height;
      return `${x},${y}`;
    });
    return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Store Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <SpriteIcons name="store" className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {currentStore} Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{userData?.name}</span>! Here's your store performance.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg border border-white/20">
            <div className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Store Performance</div>
          </div>
        </div>
      </div>

      {/* Stats Grid - 3x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`${stat.bg} backdrop-blur-md rounded-2xl ${stat.border} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 p-6 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg`}>
                <SpriteIcons name={stat.icon} className="w-6 h-6" color={stat.color.replace('text-', '')} />
              </div>
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md ${getTrendColor(stat.trend)}`}>
                {getTrendIcon(stat.trend)} {stat.delta}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{stat.value}</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    stat.icon === 'users' ? 'bg-blue-500' :
                    stat.icon === 'package' ? 'bg-green-500' :
                    stat.icon === 'rupee' ? 'bg-purple-500' :
                    stat.icon === 'shopping-cart' ? 'bg-orange-500' :
                    stat.icon === 'warning' ? 'bg-red-500' : 'bg-teal-500'
                  }`}
                  style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/[^0-9]/g, '')) / 150) * 2)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">📊 Weekly Sales</h2>
              <p className="text-gray-600 dark:text-gray-400">Daily sales performance</p>
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
              +12.5%
            </span>
          </div>
          {renderBarChart(salesData)}
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">📦 Inventory Status</h2>
              <p className="text-gray-600 dark:text-gray-400">Stock levels overview</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {renderPieChart(inventoryData, 140)}
            <div className="grid grid-cols-1 gap-3 flex-1">
              {inventoryData.labels.map((label, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: inventoryData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
                    {inventoryData.datasets[0].data[index]} items
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">💰 Revenue Trend</h2>
              <p className="text-gray-600 dark:text-gray-400">Monthly growth (in Lakhs)</p>
            </div>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-semibold">
              +15.3%
            </span>
          </div>
          {renderLineChart(revenueData)}
        </div>

        {/* Customer Analytics */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">👥 Customer Analytics</h2>
              <p className="text-gray-600 dark:text-gray-400">Customer distribution</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {renderPieChart(customerData, 120)}
            <div className="space-y-3 flex-1">
              {customerData.labels.map((label, index) => (
                <div key={index} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: customerData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {customerData.datasets[0].data[index]} customers
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="xl:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SpriteIcons name="activity" className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Activities</span>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{activity.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{activity.description}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">By {activity.user}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <div className={`font-semibold ${
                        activity.amount.startsWith('₹-') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                      }`}>
                        {activity.amount}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Alerts */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SpriteIcons name="warning" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Store Alerts</span>
              </div>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">4</span>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{alert.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {alert.priority}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;