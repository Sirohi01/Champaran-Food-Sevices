import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, USER_ROLES, getPurchaseInwards } from '../services/coreServices';

const PurchaseInwardPage = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);

    const canViewPurchases = useMemo(() => 
        [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole),
        [userRole]
    );

    const fetchPurchases = useCallback(async () => {
        if (!canViewPurchases) return;

        try {
            setLoading(true);
            setError('');
            const response = await getPurchaseInwards();
            console.log('Purchases API Response:', response);
           
            let purchasesData = [];
           
            if (response?.success && response.data) {
                // Handle nested data structure from API response
                if (response.data.data && Array.isArray(response.data.data)) {
                    purchasesData = response.data.data;
                } else if (Array.isArray(response.data)) {
                    purchasesData = response.data;
                }
            } else if (Array.isArray(response)) {
                purchasesData = response;
            } else {
                console.warn('Unexpected API response structure:', response);
                setPurchases([]);
                return;
            }
           
            setPurchases(purchasesData);
        } catch (error) {
            setError(error.message || 'Failed to fetch purchase inwards');
            console.error('Error fetching purchases:', error);
            setPurchases([]);
        } finally {
            setLoading(false);
        }
    }, [canViewPurchases]);

    useEffect(() => {
        fetchPurchases();
    }, [fetchPurchases]);

    const filteredPurchases = useMemo(() => {
        if (!searchTerm) return purchases;

        return purchases.filter(purchase =>
            purchase.vendorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.storeId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.items?.some(item =>
                item.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            purchase.poNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.purchaseOrderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, purchases]);

    const formatDate = useCallback((dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }, []);

    const calculateTotalAmount = useCallback((items) => {
        return items.reduce((total, item) => total + (item.quantityOrdered * item.rate), 0);
    }, []);

    const handleViewDetails = useCallback((purchase) => {
        setSelectedPurchase(purchase);
        setShowDetailView(true);
    }, []);

    const getStatusBadge = useCallback((status) => {
        const statusLower = (status || 'draft').toLowerCase();
        const statusConfig = {
            completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };
       
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[statusLower] || statusConfig.draft}`}>
                {statusLower.toUpperCase()}
            </span>
        );
    }, []);

    const getProductName = useCallback((item) => {
        return item.productId?.name || item.productName || 'Unknown Product';
    }, []);

    const getProductUnit = useCallback((item) => {
        return item.productId?.unit || item.unit || 'N/A';
    }, []);

    const getPurchaseOrderNumber = useCallback((purchase) => {
        return purchase.poNumber || purchase.purchaseOrderNumber || 'N/A';
    }, []);

    // Mobile Card View Component
    const PurchaseCard = useCallback(({ purchase }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                        {getPurchaseOrderNumber(purchase)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(purchase.createdAt)}
                    </p>
                </div>
                {getStatusBadge(purchase.status)}
            </div>

            {/* Vendor Info */}
            <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">Vendor</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                    {purchase.vendorId?.name || 'N/A'}
                </p>
            </div>

            {/* Items Preview */}
            <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Items</p>
                <div className="space-y-1">
                    {purchase.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-900 dark:text-gray-100 truncate flex-1 mr-2">
                                {getProductName(item)}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                {item.quantityOrdered} {getProductUnit(item)}
                            </span>
                        </div>
                    ))}
                    {purchase.items.length > 2 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{purchase.items.length - 2} more items
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                    <p className="font-bold text-green-600 dark:text-green-400 text-lg">
                        ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                    </p>
                </div>
                <button
                    onClick={() => handleViewDetails(purchase)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    ), [formatDate, getStatusBadge, calculateTotalAmount, handleViewDetails, getProductName, getProductUnit, getPurchaseOrderNumber]);

    // Detail View Modal Component
    const DetailView = useCallback(({ purchase, onClose }) => {
        const handlePrint = useCallback(() => {
            const printContent = document.getElementById('print-content');
            const originalContents = document.body.innerHTML;
            
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }, []);

        return (
            <>
                {/* Print Content */}
                <div id="print-content" className="hidden">
                    <div className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {/* Company Header */}
                        <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">PURCHASE ORDER</h1>
                            <p className="text-gray-600">Purchase Inward Document</p>
                        </div>

                        {/* Order Information */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Purchase Order Number</label>
                                    <p className="text-lg font-mono bg-gray-50 p-2 rounded border">
                                        {getPurchaseOrderNumber(purchase)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Order Date</label>
                                    <p className="text-lg bg-gray-50 p-2 rounded border">
                                        {formatDate(purchase.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Status</label>
                                    <p className="text-lg bg-gray-50 p-2 rounded border capitalize">
                                        {purchase.status?.toLowerCase()}
                                    </p>
                                </div>
                            </div>
                           
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Vendor</label>
                                    <p className="text-lg bg-gray-50 p-2 rounded border">
                                        {purchase.vendorId?.name || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Vendor Code</label>
                                    <p className="text-lg bg-gray-50 p-2 rounded border">
                                        {purchase.vendorId?.vendorCode || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700">Total Amount</label>
                                    <p className="text-2xl font-bold text-green-600 bg-gray-50 p-2 rounded border">
                                        ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                            <table className="w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-sm">S.No.</th>
                                        <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-sm">Product Name</th>
                                        <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-sm">Quantity</th>
                                        <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-sm">Unit</th>
                                        <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-sm">Rate</th>
                                        <th className="border border-gray-300 px-3 py-2 text-right font-semibold text-sm">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchase.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-3 py-2 text-center text-sm">{index + 1}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-sm">{getProductName(item)}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-center text-sm">{item.quantityOrdered}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-center text-sm">{getProductUnit(item)}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-right text-sm">₹{item.rate.toLocaleString()}</td>
                                            <td className="border border-gray-300 px-3 py-2 text-right text-sm font-semibold">
                                                ₹{(item.quantityOrdered * item.rate).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-100">
                                    <tr>
                                        <td colSpan="5" className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                                            Grand Total:
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg text-green-600">
                                            ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Additional Information */}
                        <div className="grid grid-cols-2 gap-6 border-t pt-6 text-sm">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Order ID</h4>
                                <p className="font-mono text-gray-600">{purchase._id}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-1">Last Updated</h4>
                                <p className="text-gray-600">
                                    {purchase.updatedAt ? formatDate(purchase.updatedAt) : formatDate(purchase.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Purchase Order Details
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Order Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Purchase Order Number</label>
                                        <p className="text-lg font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded border">
                                            {getPurchaseOrderNumber(purchase)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Order Date</label>
                                        <p className="text-lg bg-gray-50 dark:bg-gray-700 p-2 rounded border">
                                            {formatDate(purchase.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(purchase.status)}
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Vendor</label>
                                        <p className="text-lg bg-gray-50 dark:bg-gray-700 p-2 rounded border">
                                            {purchase.vendorId?.name || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Vendor Code</label>
                                        <p className="text-lg bg-gray-50 dark:bg-gray-700 p-2 rounded border">
                                            {purchase.vendorId?.vendorCode || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Total Amount</label>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 bg-gray-50 dark:bg-gray-700 p-2 rounded border">
                                            ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Items</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-300 dark:border-gray-600">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-sm">S.No.</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-sm">Product Name</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-sm">Quantity</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center font-semibold text-sm">Unit</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-semibold text-sm">Rate</th>
                                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-semibold text-sm">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchase.items.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm">{index + 1}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">{getProductName(item)}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm">{item.quantityOrdered}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm">{getProductUnit(item)}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-sm">₹{item.rate.toLocaleString()}</td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-sm font-semibold">
                                                        ₹{(item.quantityOrdered * item.rate).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <td colSpan="5" className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-bold text-sm">
                                                    Grand Total:
                                                </td>
                                                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-bold text-lg text-green-600 dark:text-green-400">
                                                    ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6 text-sm">
                                <div>
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Order ID</h4>
                                    <p className="font-mono text-gray-600 dark:text-gray-400">{purchase._id}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Updated</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {purchase.updatedAt ? formatDate(purchase.updatedAt) : formatDate(purchase.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-xl">
                            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                                <button
                                    onClick={handlePrint}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }, [formatDate, calculateTotalAmount, getStatusBadge, getProductName, getProductUnit, getPurchaseOrderNumber]);

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mb-4 flex items-center text-blue-600 dark:text-orange-400 hover:text-blue-700 dark:hover:text-orange-300 transition-colors text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>
                   
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
                                Purchase Inwards
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                                Manage {purchases.length} purchase inwards in the system
                            </p>
                        </div>
                       
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search purchase inwards..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all w-full sm:w-64 text-sm sm:text-base"
                                />
                                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                           
                            {[USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole) && (
                                <button
                                    onClick={() => navigate('/dashboard/create-purchase-inward')}
                                    className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
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
                                <p className="text-red-700 dark:text-red-400 text-sm sm:text-base">{error}</p>
                            </div>
                            <button
                                onClick={fetchPurchases}
                                className="px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-xs sm:text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Purchases List/Table */}
                {filteredPurchases.length === 0 ? (
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-8 sm:p-12 text-center">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {searchTerm ? 'No matching purchase inwards found' : 'No Purchase Inwards Found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">
                            {searchTerm ? 'Try adjusting your search terms' : 'There are no purchase inwards in the system yet.'}
                        </p>
                        {searchTerm ? (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors text-sm sm:text-base"
                            >
                                Clear Search
                            </button>
                        ) : [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole) && (
                            <button
                                onClick={() => navigate('/dashboard/create-purchase-inward')}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors text-sm sm:text-base"
                            >
                                Create First Purchase Inward
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-4 flex justify-between items-center">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                Showing {filteredPurchases.length} of {purchases.length} purchase inwards
                                {searchTerm && ` for "${searchTerm}"`}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-xs sm:text-sm text-blue-600 dark:text-orange-400 hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>

                        {/* Mobile Card View */}
                        <div className="block lg:hidden space-y-4">
                            {filteredPurchases.map((purchase) => (
                                <PurchaseCard key={purchase._id} purchase={purchase} />
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Purchase Order #</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Vendor</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                            <th className="px-6 py-4 text-right text-sm font-semibold">Total Amount</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredPurchases.map((purchase) => (
                                            <tr key={purchase._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {getPurchaseOrderNumber(purchase)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                                        {purchase.vendorId?.name || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                                        {formatDate(purchase.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                                        ₹{calculateTotalAmount(purchase.items).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {getStatusBadge(purchase.status)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleViewDetails(purchase)}
                                                        className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                                    >
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Detail View Modal */}
                {showDetailView && selectedPurchase && (
                    <DetailView
                        purchase={selectedPurchase}
                        onClose={() => {
                            setShowDetailView(false);
                            setSelectedPurchase(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PurchaseInwardPage;