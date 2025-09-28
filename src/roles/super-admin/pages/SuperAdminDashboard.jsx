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
    activeStaff: 0,
    todayOrders: 0,
    inventoryValue: '₹0'
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userData = getUserData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Grocery store specific mock data
      setStats({
        totalUsers: 1245,
        totalStores: 42,
        totalRevenue: '₹15.2L',
        activeStaff: 86,
        todayOrders: 234,
        inventoryValue: '₹28.7L'
      });

      setRecentUsers([
        { id: 'USR-1001', name: 'Amit Kumar', email: 'amit@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15', store: 'Fresh Mart' },
        { id: 'USR-1002', name: 'Priya Sharma', email: 'priya@example.com', role: 'manager', status: 'active', joinDate: '2024-01-10', store: 'Super Grocery' },
        { id: 'USR-1003', name: 'Rahul Verma', email: 'rahul@example.com', role: 'salesPerson', status: 'inactive', joinDate: '2024-01-05', store: 'Daily Needs' },
        { id: 'USR-1004', name: 'Neha Gupta', email: 'neha@example.com', role: 'purchaseManager', status: 'active', joinDate: '2024-01-01', store: 'Quick Buy' },
        { id: 'USR-1005', name: 'Vikram Singh', email: 'vikram@example.com', role: 'super_admin', status: 'active', joinDate: '2023-12-28', store: 'All Stores' }
      ]);

      setSystemAlerts([
        { 
          type: 'warning', 
          message: 'Low stock alert: Rice and pulses running low in 3 stores', 
          priority: 'high',
          time: '30 minutes ago',
          store: 'Fresh Mart'
        },
        { 
          type: 'info', 
          message: 'New vendor added: Fresh Vegetables Supplier', 
          priority: 'medium',
          time: '2 hours ago',
          store: 'All Stores'
        },
        { 
          type: 'error', 
          message: 'Payment gateway issue in Delhi stores', 
          priority: 'high',
          time: '1 hour ago',
          store: 'Delhi Branch'
        },
        { 
          type: 'success', 
          message: 'Monthly sales target achieved 3 days early', 
          priority: 'low',
          time: '5 hours ago',
          store: 'All Stores'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sales data for charts
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Grocery Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.6,
      },
      {
        label: 'Fresh Produce',
        data: [5000, 7000, 5500, 9000, 8000, 11000, 10000],
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.6,
      }
    ]
  };

  const inventoryData = {
    labels: ['Grains', 'Dairy', 'Vegetables', 'Fruits', 'Beverages', 'Snacks'],
    datasets: [{
      data: [25, 20, 15, 18, 12, 10],
      backgroundColor: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const revenueTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [12, 19, 15, 25, 22, 30],
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

  const storePerformanceData = {
    labels: ['Store A', 'Store B', 'Store C', 'Store D', 'Store E'],
    datasets: [{
      data: [85, 70, 90, 60, 75],
      backgroundColor: [
        '#FF9F40', '#FF6384', '#36A2EB', '#4BC0C0', '#9966FF'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const dashboardStats = [
    { 
      label: 'Total Customers', 
      value: '1,245', 
      delta: '+45 this week', 
      icon: 'users', 
      color: 'text-blue-600', 
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30',
      border: 'border-l-4 border-blue-500',
      trend: 'up'
    },
    { 
      label: 'Total Stores', 
      value: '42', 
      delta: '+2 new stores', 
      icon: 'store', 
      color: 'text-green-600', 
      bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30',
      border: 'border-l-4 border-green-500',
      trend: 'up'
    },
    { 
      label: 'Today\'s Orders', 
      value: '234', 
      delta: '+12% from yesterday', 
      icon: 'shopping-cart', 
      color: 'text-purple-600', 
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30',
      border: 'border-l-4 border-purple-500',
      trend: 'up'
    },
    { 
      label: 'Inventory Value', 
      value: '₹28.7L', 
      delta: '₹1.2L added', 
      icon: 'package', 
      color: 'text-orange-600', 
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30',
      border: 'border-l-4 border-orange-500',
      trend: 'up'
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹15.2L', 
      delta: '+15.3% growth', 
      icon: 'rupee', 
      color: 'text-teal-600', 
      bg: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30',
      border: 'border-l-4 border-teal-500',
      trend: 'up'
    },
    { 
      label: 'Active Staff', 
      value: '86', 
      delta: 'Currently working', 
      icon: 'team', 
      color: 'text-red-600', 
      bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30',
      border: 'border-l-4 border-red-500',
      trend: 'stable'
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
    const maxValue = Math.max(...data.datasets[0].data, ...data.datasets[1].data);
    return (
      <div className="flex items-end justify-between h-48 gap-2 p-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="flex items-end justify-center gap-1 h-32 w-full">
              {data.datasets.map((dataset, dsIndex) => (
                <div
                  key={dsIndex}
                  className="flex-1 relative group"
                  style={{ height: '100%' }}
                >
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:scale-105 relative"
                    style={{ 
                      height: `${(dataset.data[index] / maxValue) * 100}%`,
                      backgroundColor: dataset.backgroundColor,
                      border: `2px solid ${dataset.borderColor}`
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₹{dataset.data[index].toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{total}%</div>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Grocery Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                <SpriteIcons name="store" className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                Champaran Food Store
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-green-600 dark:text-green-400">{userData?.name}</span>! Here's your store overview.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg border border-white/20">
            <div className="text-green-600 dark:text-green-400 font-semibold text-lg">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Today's Summary Ready</div>
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
              <div className="text-sm text-green-600 dark:text-green-400 mb-1 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{stat.value}</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    stat.icon === 'users' ? 'bg-blue-500' :
                    stat.icon === 'store' ? 'bg-green-500' :
                    stat.icon === 'shopping-cart' ? 'bg-purple-500' :
                    stat.icon === 'package' ? 'bg-orange-500' :
                    stat.icon === 'rupee' ? 'bg-teal-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/[^0-9]/g, '')) / 1500) * 100)}%` }}
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
              <p className="text-gray-600 dark:text-gray-400">Grocery vs Fresh Produce</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Grocery</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Fresh</span>
              </div>
            </div>
          </div>
          {renderBarChart(salesData)}
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">📦 Inventory Distribution</h2>
              <p className="text-gray-600 dark:text-gray-400">By product category</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {renderPieChart(inventoryData, 140)}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {inventoryData.labels.map((label, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: inventoryData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-auto">
                    {inventoryData.datasets[0].data[index]}%
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
              <p className="text-gray-600 dark:text-gray-400">Monthly growth</p>
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
              +15.3%
            </span>
          </div>
          {renderLineChart(revenueTrendData)}
        </div>

        {/* Store Performance */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">🏪 Store Performance</h2>
              <p className="text-gray-600 dark:text-gray-400">Efficiency score</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {renderPieChart(storePerformanceData, 120)}
            <div className="space-y-3 flex-1">
              {storePerformanceData.labels.map((label, index) => (
                <div key={index} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: storePerformanceData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${storePerformanceData.datasets[0].data[index]}%`,
                          backgroundColor: storePerformanceData.datasets[0].backgroundColor[index]
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8">
                      {storePerformanceData.datasets[0].data[index]}%
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
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SpriteIcons name="activity" className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Store Activity</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Staff Member</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Store</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Role</th>
                  <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{user.store}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'super_admin' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        user.role === 'manager' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      }`}>
                        {user.role.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        ● {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                    alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    alert.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <span className={`text-sm ${
                      alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                      alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      alert.type === 'success' ? 'text-green-600 dark:text-green-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {alert.type === 'error' ? '⚠️' : alert.type === 'warning' ? '🔔' : alert.type === 'success' ? '✅' : 'ℹ️'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.store}</span>
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

export default SuperAdminDashboard;