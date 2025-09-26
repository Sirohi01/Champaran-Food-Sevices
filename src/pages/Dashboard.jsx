import SpriteIcons from '../components/SpriteIcons';
import { useI18n } from '../i18n/i18n';

const Dashboard = () => {
  const stats = [
    { label: 'Orders', value: 128, delta: '+12% vs last week', icon: 'orders', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Inventory Items', value: 5320, delta: '+3% restocked', icon: 'inventory', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Revenue', value: '₹2.4L', delta: '+8% vs last week', icon: 'stats', color: 'text-purple-600', bg: 'bg-purple-50' }
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

  const { t } = useI18n();
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{t('dashboard.overview')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${s.bg}`}>
                <SpriteIcons name={s.icon} className="w-6 h-6" color={s.color.replace('text-', '')} />
              </div>
              <div className="text-xs text-green-600 font-medium">{s.delta}</div>
            </div>
            <div className="text-sm text-gray-500 mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b font-semibold flex items-center">
            <SpriteIcons name="orders" className="w-5 h-5 text-blue-600 mr-2" />
            {t('dashboard.recentOrders')}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Order ID</th>
                  <th className="text-left px-4 py-2">Customer</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-2 font-medium">{o.id}</td>
                    <td className="px-4 py-2">{o.customer}</td>
                    <td className="px-4 py-2">{o.amount}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        o.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>{o.status}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 border-b font-semibold flex items-center">
            <SpriteIcons name="warning" className="w-5 h-5 text-orange-600 mr-2" />
            {t('dashboard.lowInventory')}
          </div>
          <ul className="divide-y">
            {lowInventory.map((i) => (
              <li key={i.sku} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-gray-500">SKU: {i.sku}</div>
                </div>
                <div className={`text-sm font-semibold ${i.stock < 15 ? 'text-red-600' : 'text-yellow-700'}`}>{i.stock}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


