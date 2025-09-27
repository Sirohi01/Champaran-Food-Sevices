import SpriteIcons from '../components/SpriteIcons';
import { useI18n } from '../i18n/i18n';

const Dashboard = () => {
  const { t } = useI18n();
  
  const stats = [
    { label: t('dashboard.orders'), value: 128, delta: '+12% vs last week', icon: 'orders', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', darkBg: 'dark:bg-blue-900/20' },
    { label: t('dashboard.inventory'), value: 5320, delta: '+3% restocked', icon: 'inventory', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', darkBg: 'dark:bg-green-900/20' },
    { label: 'Revenue', value: '₹2.4L', delta: '+8% vs last week', icon: 'stats', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', darkBg: 'dark:bg-purple-900/20' }
  ];

  const recentOrders = [
    { id: 'ORD-1023', customer: 'Sharma Store', amount: '₹12,340', status: 'Shipped', date: '2025-09-20' },
    { id: 'ORD-1022', customer: 'Gupta Mart', amount: '₹8,120', status: 'Processing', date: '2025-09-19' },
    { id: 'ORD-1021', customer: 'RK SuperMart', amount: '₹21,560', status: 'Delivered', date: '2025-09-19' }
  ];

  const lowInventory = [
    { sku: 'RICE-25KG', name: 'Basmati Rice 25kg', stock: 14 },
    { sku: 'OIL-15L', name: 'Sunflower Oil 15L', stock: 22 },
    { sku: 'ATTA-50KG', name: 'Wheat Flour 50kg', stock: 9 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">{t('dashboard.overview')}</h1>
        <div className="text-sm text-blue-600 dark:text-orange-400 font-medium">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${s.bg} shadow-lg`}>
                <SpriteIcons name={s.icon} className="w-7 h-7" color={s.color.replace('text-', '')} />
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">{s.delta}</div>
            </div>
            <div className="text-sm text-blue-600 dark:text-orange-400 mb-2 font-medium">{s.label}</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="orders" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">{t('dashboard.recentOrders')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                <tr>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Order ID</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Customer</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Amount</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                  <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{o.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{o.customer}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{o.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        o.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        o.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                      }`}>{o.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700">
            <SpriteIcons name="warning" className="w-6 h-6 text-orange-600 dark:text-orange-500 mr-3" />
            <span className="text-lg">{t('dashboard.lowInventory')}</span>
          </div>
          <ul className="divide-y divide-blue-200 dark:divide-gray-700">
            {lowInventory.map((i) => (
              <li key={i.sku} className="px-6 py-4 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{i.name}</div>
                  <div className="text-xs text-blue-600 dark:text-orange-400 mt-1">SKU: {i.sku}</div>
                </div>
                <div className={`text-lg font-bold px-3 py-1 rounded-full ${i.stock < 15 ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30' : 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'}`}>{i.stock}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


