import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, USER_ROLES, getStores, getStoreById, updateStore } from '../services/coreServices';

const StoresPage = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStores, setFilteredStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showStoreDetails, setShowStoreDetails] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [updating, setUpdating] = useState(false);

    const canViewStores = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(userRole);

    useEffect(() => {
        if (canViewStores) {
            fetchStores();
        } else {
            setLoading(false);
        }
    }, [canViewStores]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = stores.filter(store =>
                store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (store.contactInfo && store.contactInfo.email && store.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                store.storeCode.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStores(filtered);
        } else {
            setFilteredStores(stores);
        }
    }, [searchTerm, stores]);

    const fetchStores = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getStores();
            console.log('Stores API Response:', response);
            
            let storesData = [];
            
            if (response && response.success) {
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    storesData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    storesData = response.data;
                } else if (response.data && response.data.stores && Array.isArray(response.data.stores)) {
                    storesData = response.data.stores;
                }
            } else if (Array.isArray(response)) {
                storesData = response;
            } else if (response && response.stores && Array.isArray(response.stores)) {
                storesData = response.stores;
            } else {
                console.warn('Unexpected API response structure:', response);
                setStores([]);
                return;
            }
            
            setStores(storesData);
            setFilteredStores(storesData);
        } catch (error) {
            setError(error.message || 'Failed to fetch stores');
            console.error('Error fetching stores:', error);
            setStores([]);
            setFilteredStores([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Handle store details view
    const handleViewStore = async (storeId) => {
        try {
            setLoading(true);
            const storeDetails = await getStoreById(storeId);
            setSelectedStore(storeDetails);
            setShowStoreDetails(true);
        } catch (error) {
            setError('Failed to fetch store details');
            console.error('Error fetching store details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit store
    const handleEditStore = (store) => {
        setEditFormData({
            _id: store._id,
            companyName: store.companyName || 'Champaran Food Company',
            name: store.name,
            storeCode: store.storeCode,
            address: {
                street: store.address.street,
                city: store.address.city,
                state: store.address.state,
                zipCode: store.address.zipCode,
                country: store.address.country || 'India'
            },
            contactInfo: {
                phone: store.contactInfo.phone,
                email: store.contactInfo.email
            },
            isActive: store.isActive
        });
        setShowEditModal(true);
    };

    // Handle update store
    const handleUpdateStore = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const response = await updateStore(editFormData._id, editFormData);
            console.log('Store updated:', response);
            
            // Refresh stores list
            await fetchStores();
            setShowEditModal(false);
            setEditFormData({});
            setShowStoreDetails(false);
        } catch (error) {
            setError('Failed to update store');
            console.error('Error updating store:', error);
        } finally {
            setUpdating(false);
        }
    };

    // Handle toggle store status
    const handleToggleStoreStatus = async (storeId, currentStatus) => {
        try {
            setUpdating(true);
            const updatedData = { isActive: !currentStatus };
            const response = await updateStore(storeId, updatedData);
            console.log('Store status updated:', response);
            
            // Refresh stores list
            await fetchStores();
            
            // Update selected store if it's currently being viewed
            if (selectedStore && selectedStore._id === storeId) {
                setSelectedStore(prev => ({
                    ...prev,
                    isActive: !currentStatus
                }));
            }
        } catch (error) {
            setError('Failed to update store status');
            console.error('Error updating store status:', error);
        } finally {
            setUpdating(false);
        }
    };

    // Handle input change for edit form
    const handleEditInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setEditFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    if (!canViewStores) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Access Denied
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Only Super Admins and Admins can view stores.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (loading && stores.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Loading stores...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mb-4 flex items-center text-blue-600 dark:text-orange-400 hover:text-blue-700 dark:hover:text-orange-300 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>
                    
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                                Store Management
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage {stores.length} stores in the system
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search stores..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all w-full sm:w-64"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            {userRole === USER_ROLES.SUPER_ADMIN && (
                                <button
                                    onClick={() => navigate('/dashboard/create-store')}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Store
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 dark:text-red-400">{error}</p>
                            </div>
                            <button
                                onClick={fetchStores}
                                className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Stores Grid */}
                {filteredStores.length === 0 ? (
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {searchTerm ? 'No matching stores found' : 'No Stores Found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {searchTerm ? 'Try adjusting your search terms' : 'There are no stores in the system yet.'}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-6 py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        ) : userRole === USER_ROLES.SUPER_ADMIN && (
                            <button
                                onClick={() => navigate('/dashboard/create-store')}
                                className="px-6 py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors"
                            >
                                Create First Store
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {filteredStores.length} of {stores.length} stores
                                {searchTerm && ` for "${searchTerm}"`}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-sm text-blue-600 dark:text-orange-400 hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredStores.map((store) => (
                                <div
                                    key={store._id}
                                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                >
                                    {/* Store Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                {store.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                                                    {store.name}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${store.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <span className={`text-sm font-medium ${store.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                        {store.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Code: {store.storeCode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Store Details */}
                                    <div className="space-y-3 mb-4">
                                        {/* Address */}
                                        <div className="flex items-start">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <p className="font-medium">{store.address.street}</p>
                                                <p>{store.address.city}, {store.address.state} - {store.address.zipCode}</p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {store.contactInfo?.phone}
                                            </span>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {store.contactInfo?.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            Created: {formatDate(store.createdAt)}
                                        </span>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewStore(store._id)}
                                                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                            >
                                                View
                                            </button>
                                            
                                            {userRole === USER_ROLES.SUPER_ADMIN && (
                                                <>
                                                    <button
                                                        onClick={() => handleEditStore(store)}
                                                        className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleToggleStoreStatus(store._id, store.isActive)}
                                                        disabled={updating}
                                                        className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                                            store.isActive 
                                                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800' 
                                                                : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                                                        } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {updating ? '...' : (store.isActive ? 'Deactivate' : 'Activate')}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Store Details Modal */}
            {showStoreDetails && selectedStore && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Store Details
                                </h2>
                                <button
                                    onClick={() => setShowStoreDetails(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Store Header */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {selectedStore.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                            {selectedStore.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedStore.companyName}
                                        </p>
                                        <div className="flex items-center mt-1">
                                            <div className={`w-3 h-3 rounded-full mr-2 ${selectedStore.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <span className={`text-sm font-medium ${selectedStore.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {selectedStore.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                                                Code: {selectedStore.storeCode}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Store Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Contact Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-gray-600 dark:text-gray-400">{selectedStore.contactInfo?.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-gray-600 dark:text-gray-400">{selectedStore.contactInfo?.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Address</h4>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <div className="text-gray-600 dark:text-gray-400">
                                                <p>{selectedStore.address.street}</p>
                                                <p>{selectedStore.address.city}, {selectedStore.address.state}</p>
                                                <p>{selectedStore.address.zipCode}, {selectedStore.address.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Store Stats */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Store Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(selectedStore.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(selectedStore.updatedAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                            <p className={`font-semibold ${selectedStore.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {selectedStore.isActive ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Store Code</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{selectedStore.storeCode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                {userRole === USER_ROLES.SUPER_ADMIN && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setShowStoreDetails(false);
                                                handleEditStore(selectedStore);
                                            }}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Edit Store
                                        </button>
                                        <button
                                            onClick={() => handleToggleStoreStatus(selectedStore._id, selectedStore.isActive)}
                                            className={`px-4 py-2 rounded-lg transition-colors ${
                                                selectedStore.isActive 
                                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                            }`}
                                        >
                                            {selectedStore.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setShowStoreDetails(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Store Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Edit Store
                                </h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleUpdateStore} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Store Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editFormData.name || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Store Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="storeCode"
                                            value={editFormData.storeCode || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactInfo.phone"
                                            value={editFormData.contactInfo?.phone || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="contactInfo.email"
                                            value={editFormData.contactInfo?.email || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="isActive"
                                            value={editFormData.isActive ? 'true' : 'false'}
                                            onChange={(e) => setEditFormData({...editFormData, isActive: e.target.value === 'true'})}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={editFormData.address?.street || ''}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={editFormData.address?.city || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={editFormData.address?.state || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="address.zipCode"
                                            value={editFormData.address?.zipCode || ''}
                                            onChange={handleEditInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={editFormData.address?.country || 'India'}
                                        onChange={handleEditInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {updating ? 'Updating...' : 'Update Store'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoresPage;