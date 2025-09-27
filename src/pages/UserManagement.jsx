import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, USER_ROLES, getRoleDisplayName } from '../services/coreServices';
import { useI18n } from '../i18n/i18n';
import { useTheme } from '../contexts/ThemeContext';
import SpriteIcons from '../components/SpriteIcons';
import CreateUserModal from '../components/CreateUserModal';

const UserManagement = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getUsers();
      
      console.log('API Response:', response); // Debug log
      
      if (response && response.success && response.data && response.data.data) {
        setUsers(response.data.data);
      } else if (response && response.data) {
        // Fallback for different response structure
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUserSuccess = () => {
    setShowCreateModal(false);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.toString().includes(searchTerm);
    
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case USER_ROLES.ADMIN:
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
      case USER_ROLES.MANAGER:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case USER_ROLES.SALES_MAN:
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case USER_ROLES.PURCHASE_MAN:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case USER_ROLES.USER:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  };

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: USER_ROLES.SUPER_ADMIN, label: 'Super Admin' },
    { value: USER_ROLES.ADMIN, label: 'Admin' },
    { value: USER_ROLES.MANAGER, label: 'Manager' },
    { value: USER_ROLES.SALES_MAN, label: 'Sales Person' },
    { value: USER_ROLES.PURCHASE_MAN, label: 'Purchase Manager' },
    { value: USER_ROLES.USER, label: 'User' }
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
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all users in the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <SpriteIcons name="user-plus" className="w-5 h-5" />
          <span className="text-sm sm:text-base">Create New User</span>
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl border border-blue-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-blue-200 dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-200 flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <SpriteIcons name="users" className="w-6 h-6 text-blue-600 dark:text-orange-500 mr-3" />
          <span className="text-lg">All Users ({filteredUsers.length})</span>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <SpriteIcons name="users" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No users found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {searchTerm || roleFilter ? 'Try adjusting your filters' : 'No users have been created yet'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-blue-50/80 dark:bg-gray-700/80">
                  <tr>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">User ID</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Name</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Email</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Phone</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Role</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Status</th>
                    <th className="text-left px-6 py-4 text-blue-700 dark:text-orange-400 font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id || user.id} className="border-t border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                        {user._id ? user._id.slice(-8) : user.id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">
                        {user.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {user.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {user.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                          {getRoleDisplayName(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadgeColor('active')}`}>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredUsers.map((user) => (
                <div key={user._id || user.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Header with Name and Role */}
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                      {user.name || 'N/A'}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getRoleBadgeColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </div>

                  {/* User Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="email" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{user.email || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="phone" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{user.phone || 'N/A'}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="store" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.storeId ? `Store ID: ${user.storeId.slice(-8)}` : 'No Store Assigned'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="calendar" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <SpriteIcons name="check-circle" className="w-4 h-4 text-gray-400" />
                      <span className={`text-sm font-semibold ${getStatusBadgeColor('active')}`}>
                        Active
                      </span>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                      ID: {user._id ? user._id.slice(-8) : user.id || 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateUserSuccess}
        />
      )}
    </div>
  );
};

export default UserManagement;
