import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStores, updateStore } from '../services/coreServices';
import { useI18n } from '../i18n/i18n';
import { useTheme } from '../contexts/ThemeContext';
import SpriteIcons from '../components/SpriteIcons';
import CreateStoreModal from '../components/CreateStoreModal';
import EditStoreModal from '../components/EditStoreModal';

const StoreManagement = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [togglingStore, setTogglingStore] = useState(null);

  useEffect(() => {
    fetchStores();
  }, [refreshTrigger]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getStores();
      
      //console.log('API Response:', response); // Debug log
      
      if (response && response.success && response.data && response.data.data) {
        setStores(response.data.data);
      } else if (response && response.data) {
        // Fallback for different response structure
        setStores(response.data);
      } else {
        setStores([]);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      setError('Failed to fetch stores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStoreSuccess = () => {
    setShowCreateModal(false);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  const handleEditStore = (store) => {
    setSelectedStore(store);
    setShowEditModal(true);
  };

  const handleEditStoreSuccess = () => {
    setShowEditModal(false);
    setSelectedStore(null);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  const handleToggleStoreStatus = async (store) => {
    try {
      setTogglingStore(store._id);
      const updatedStore = {
        ...store,
        isActive: !store.isActive
      };
      
      await updateStore(store._id, updatedStore);
      setRefreshTrigger(prev => prev + 1); // Trigger refresh
    } catch (error) {
      console.error('Error toggling store status:', error);
    } finally {
      setTogglingStore(null);
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.phone?.toString().includes(searchTerm) ||
                         store.address?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address?.state?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || (statusFilter === 'active' ? store.isActive : !store.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-orange-400 dark:to-red-500 bg-clip-text text-transparent">
            Store Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all stores in the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <SpriteIcons name="store" className="w-5 h-5" />
          <span className="text-sm sm:text-base">Create New Store</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <SpriteIcons name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <SpriteIcons name="store" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          <span className="text-lg">All Stores ({filteredStores.length})</span>
        </div>
        
        {filteredStores.length === 0 ? (
          <div className="p-8 text-center">
            <SpriteIcons name="store" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No stores found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {searchTerm || statusFilter ? 'Try adjusting your filters' : 'No stores have been created yet'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                  <tr>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Store ID</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Name</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Email</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Phone</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Address</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Created</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.map((store) => (
                    <tr key={store._id || store.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                        {store._id ? store._id.slice(-8) : store.id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">
                        {store.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {store.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {store.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {store.address ? `${store.address.city}, ${store.address.state}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(store.isActive)}`}>
                            {store.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => handleToggleStoreStatus(store)}
                            disabled={togglingStore === store._id}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              store.isActive 
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50' 
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                            } ${togglingStore === store._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={store.isActive ? 'Disable Store' : 'Enable Store'}
                          >
                            {togglingStore === store._id ? '...' : (store.isActive ? 'Disable' : 'Enable')}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs">
                        {store.createdAt ? new Date(store.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button 
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors border border-blue-200 dark:border-blue-700"
                            title="Edit Store"
                            onClick={() => handleEditStore(store)}
                          >
                            <SpriteIcons name="edit" className="w-4 h-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button 
                            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors border border-red-200 dark:border-red-700"
                            title="Delete Store"
                          >
                            <SpriteIcons name="delete" className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredStores.map((store) => (
                <div key={store._id || store.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Header with Name and Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                        {store.name || 'N/A'}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(store.isActive)}`}>
                          {store.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => handleToggleStoreStatus(store)}
                          disabled={togglingStore === store._id}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            store.isActive 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50' 
                              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                          } ${togglingStore === store._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title={store.isActive ? 'Disable Store' : 'Enable Store'}
                        >
                          {togglingStore === store._id ? '...' : (store.isActive ? 'Disable' : 'Enable')}
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors border border-blue-200 dark:border-blue-700"
                        title="Edit Store"
                        onClick={() => handleEditStore(store)}
                      >
                        <SpriteIcons name="edit" className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button 
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors border border-red-200 dark:border-red-700"
                        title="Delete Store"
                      >
                        <SpriteIcons name="delete" className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Store Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="email" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{store.email || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="phone" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{store.phone || 'N/A'}</span>
                    </div>

                    <div className="flex items-start space-x-3">
                      <SpriteIcons name="location" className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>{store.address?.street || 'N/A'}</p>
                        <p>{store.address ? `${store.address.city}, ${store.address.state} - ${store.address.zipCode}` : 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="calendar" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created: {store.createdAt ? new Date(store.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Store ID */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                      ID: {store._id ? store._id.slice(-8) : store.id || 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create Store Modal */}
      {showCreateModal && (
        <CreateStoreModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateStoreSuccess}
        />
      )}

      {/* Edit Store Modal */}
      {showEditModal && selectedStore && (
        <EditStoreModal
          store={selectedStore}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStore(null);
          }}
          onSuccess={handleEditStoreSuccess}
        />
      )}
    </div>
  );
};

export default StoreManagement;
