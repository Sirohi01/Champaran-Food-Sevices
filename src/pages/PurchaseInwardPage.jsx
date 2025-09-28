import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, USER_ROLES, getPurchaseInwards } from '../services/coreServices';
const PurchaseInwardPage = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPurchases, setFilteredPurchases] = useState([]);

    const canViewPurchases = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole);

    useEffect(() => {
        if (canViewPurchases) {
            fetchPurchases();
        } else {
            setLoading(false);
        }
    }, [canViewPurchases]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = purchases.filter(purchase =>
                purchase.vendorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                purchase.storeId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                purchase.items?.some(item => 
                    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
                ) ||
                purchase.purchaseOrderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPurchases(filtered);
        } else {
            setFilteredPurchases(purchases);
        }
    }, [searchTerm, purchases]);

    const fetchPurchases = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getPurchaseInwards();
            console.log('Purchases API Response:', response);
            
            let purchasesData = [];
            
            if (response && response.success) {
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    purchasesData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    purchasesData = response.data;
                } else if (response.data && response.data.purchases && Array.isArray(response.data.purchases)) {
                    purchasesData = response.data.purchases;
                }
            } else if (Array.isArray(response)) {
                purchasesData = response;
            } else {
                console.warn('Unexpected API response structure:', response);
                setPurchases([]);
                return;
            }
            
            setPurchases(purchasesData);
            setFilteredPurchases(purchasesData);
        } catch (error) {
            setError(error.message || 'Failed to fetch purchase inwards');
            console.error('Error fetching purchases:', error);
            setPurchases([]);
            setFilteredPurchases([]);
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

    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => total + (item.quantityOrdered * item.rate), 0);
    };

    if (!canViewPurchases) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Access Denied
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Only Super Admins, Admins, and Purchase Managers can view purchase inwards.
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

    if (loading && purchases.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Loading purchase inwards...</p>
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
                                Purchase Inwards
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage {purchases.length} purchase inwards in the system
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search purchase inwards..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all w-full sm:w-64"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            {[USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole) && (
                                <button
                                    onClick={() => navigate('/dashboard/create-purchase-inward')}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Purchase Inward
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
                                onClick={fetchPurchases}
                                className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Purchases Grid */}
                {filteredPurchases.length === 0 ? (
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {searchTerm ? 'No matching purchase inwards found' : 'No Purchase Inwards Found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {searchTerm ? 'Try adjusting your search terms' : 'There are no purchase inwards in the system yet.'}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-6 py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        ) : [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole) && (
                            <button
                                onClick={() => navigate('/dashboard/create-purchase-inward')}
                                className="px-6 py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors"
                            >
                                Create First Purchase Inward
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {filteredPurchases.length} of {purchases.length} purchase inwards
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

                        <div className="grid grid-cols-1 gap-6">
                            {filteredPurchases.map((purchase) => (
                                <div
                                    key={purchase._id}
                                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Purchase Header */}
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                        <div className="flex items-center mb-4 lg:mb-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                    Purchase Order #{purchase.purchaseOrderNumber || 'N/A'}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Vendor: {purchase.vendorId?.name || 'N/A'}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Store: {purchase.storeId?.name || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(purchase.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Items</h4>
                                        <div className="space-y-2">
                                            {purchase.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    <div>
                                                        <p className="font-medium text-gray-800 dark:text-gray-200">{item.productName}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {item.quantityOrdered} {item.unit} × ₹{item.rate}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                        ₹{(item.quantityOrdered * item.rate).toLocaleString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center space-x-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                purchase.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : purchase.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            }`}>
                                                {purchase.status || 'draft'}
                                            </span>
                                        </div>
                                        
                                        <button
                                            onClick={() => navigate(`/dashboard/purchase-inwards/${purchase._id}`)}
                                            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PurchaseInwardPage;