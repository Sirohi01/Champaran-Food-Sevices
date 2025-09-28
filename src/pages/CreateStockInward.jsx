import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, USER_ROLES, getStores, getVendors, getStoreById, getPurchaseInwards, addPoStockIn } from '../services/coreServices';
import { useAuth } from '../services/AuthContext.jsx';

const CreateStockInward = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const userRole = auth.role;
    const [formData, setFormData] = useState({
        purchaseOrderId: '',
        storeId: '',
        vendorId: '',
        invoiceNumber: '',
        notes: '',
        items: [
            {
                productId: '',
                quantityReceived: '',
                rate: '',
                batchNumber: ''
            }
        ]
    });
    const [vendors, setVendors] = useState([]);
    const [stores, setStores] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const canCreateStock = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(auth.role);

    const fetchData = useCallback(async () => {
        try {
            setFetchLoading(true);
            setError('');

            // Fetch vendors
            const vendorsResponse = await getVendors();
            let vendorsData = [];
            if (vendorsResponse && vendorsResponse.success) {
                if (vendorsResponse.data && vendorsResponse.data.data && Array.isArray(vendorsResponse.data.data)) {
                    vendorsData = vendorsResponse.data.data;
                } else if (Array.isArray(vendorsResponse.data)) {
                    vendorsData = vendorsResponse.data;
                }
            }
            setVendors(vendorsData);

            // Fetch purchase orders
            const poResponse = await getPurchaseInwards();
            let poData = [];
            if (poResponse?.success && poResponse.data) {
                if (poResponse.data.data && Array.isArray(poResponse.data.data)) {
                    poData = poResponse.data.data;
                } else if (Array.isArray(poResponse.data)) {
                    poData = poResponse.data;
                }
            }
            setPurchaseOrders(poData);

            // For ADMIN users, fetch only their assigned store
            if (auth.role === USER_ROLES.ADMIN) {
                let adminStoreId = auth.storeId;
                if (!adminStoreId) {
                    const userDataRaw = localStorage.getItem('user_data');
                    let userData = null;
                    try {
                        userData = userDataRaw ? JSON.parse(userDataRaw) : null;
                    } catch (e) {
                        userData = null;
                    }
                    adminStoreId = userData?.storeId;
                }
                if (adminStoreId) {
                    try {
                        const storeResponse = await getStoreById(adminStoreId);
                        if (storeResponse && storeResponse.success) {
                            const storeData = storeResponse.data?.data || storeResponse.data;
                            if (storeData) {
                                setStores([storeData]);
                                setFormData(prev => ({
                                    ...prev,
                                    storeId: adminStoreId
                                }));
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching admin store:', error);
                    }
                } else {
                    setError('No store assigned to your account');
                }
            } else {
                // For SUPER_ADMIN and PURCHASE_MAN, fetch all stores
                const storesResponse = await getStores();
                let storesData = [];
                if (storesResponse && storesResponse.success) {
                    if (storesResponse.data && storesResponse.data.data && Array.isArray(storesResponse.data.data)) {
                        storesData = storesResponse.data.data;
                    } else if (Array.isArray(storesResponse.data)) {
                        storesData = storesResponse.data;
                    }
                }
                setStores(storesData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data');
        } finally {
            setFetchLoading(false);
        }
    }, [auth.role, auth.storeId]);

    useEffect(() => {
        if (auth.role === USER_ROLES.ADMIN && auth.storeId) {
            setFormData(prev => ({
                ...prev,
                storeId: auth.storeId
            }));
        }
    }, [auth.role, auth.storeId]);

    useEffect(() => {
        if (canCreateStock) {
            fetchData();
        } else {
            setFetchLoading(false);
        }
    }, [canCreateStock, fetchData]);

    // When purchase order is selected, auto-fill vendor and items
    useEffect(() => {
        if (formData.purchaseOrderId) {
            const selectedPO = purchaseOrders.find(po => po._id === formData.purchaseOrderId);
            if (selectedPO) {
                setFormData(prev => ({
                    ...prev,
                    vendorId: selectedPO.vendorId?._id || selectedPO.vendorId,
                    items: selectedPO.items.map(item => ({
                        productId: item.productId?._id || item.productId,
                        quantityReceived: item.quantityOrdered || '',
                        rate: item.rate || '',
                        batchNumber: ''
                    }))
                }));
            }
        }
    }, [formData.purchaseOrderId, purchaseOrders]);

    if (!canCreateStock) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">
                        Access Denied
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        Only Super Admins, Admins, and Purchase Managers can create stock inwards.
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...formData.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'quantityReceived' || field === 'rate' ? Number(value) || '' : value
        };
        setFormData(prev => ({
            ...prev,
            items: updatedItems
        }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    productId: '',
                    quantityReceived: '',
                    rate: '',
                    batchNumber: ''
                }
            ]
        }));
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            const updatedItems = formData.items.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                items: updatedItems
            }));
        }
    };

    const calculateItemTotal = (quantity, rate) => {
        return (Number(quantity) || 0) * (Number(rate) || 0);
    };

    const calculateGrandTotal = () => {
        return formData.items.reduce((total, item) => {
            return total + calculateItemTotal(item.quantityReceived, item.rate);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation
        if (!formData.storeId || !formData.vendorId) {
            setError('Please select both store and vendor');
            setLoading(false);
            return;
        }

        if (formData.items.length === 0) {
            setError('Please add at least one item');
            setLoading(false);
            return;
        }

        // Validate all items
        for (let i = 0; i < formData.items.length; i++) {
            const item = formData.items[i];
            if (!item.productId || !item.quantityReceived || !item.rate) {
                setError(`Please fill all required fields for item ${i + 1}`);
                setLoading(false);
                return;
            }
        }

        try {
            const stockData = {
                purchaseOrderId: formData.purchaseOrderId || undefined,
                storeId: formData.storeId,
                vendorId: formData.vendorId,
                invoiceNumber: formData.invoiceNumber,
                notes: formData.notes,
                items: formData.items.map(item => ({
                    productId: item.productId,
                    quantityReceived: Number(item.quantityReceived),
                    rate: Number(item.rate),
                    batchNumber: item.batchNumber || undefined
                }))
            };

            console.log('Sending stock data:', stockData);

            const response = await addPoStockIn(stockData);
            console.log('Create stock response:', response);

            if (response && response.success) {
                setSuccess('Stock inward created successfully!');
                
                setTimeout(() => {
                    navigate('/dashboard/stock-inwards');
                }, 2000);
                
            } else {
                throw new Error(response?.message || 'Failed to create stock inward');
            }
        } catch (error) {
            console.error('Error creating stock:', error);
            
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message || 'Failed to create stock inward');
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Loading data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/dashboard/stock-inwards')}
                        className="mb-4 flex items-center text-blue-600 dark:text-orange-400 hover:text-blue-700 dark:hover:text-orange-300 transition-colors text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Stock Inwards
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                        Create Stock Inward
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
                        Create a new stock inward entry
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-4 md:p-8">
                    {error && (
                        <div className="mb-4 p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg md:rounded-xl">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 dark:text-red-400 text-sm md:text-base">{error}</p>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 md:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg md:rounded-xl">
                            <p className="text-green-700 dark:text-green-400 flex items-center text-sm md:text-base">
                                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {success} Redirecting to stock inwards page...
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        {/* Purchase Order Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                Purchase Order (Optional)
                            </label>
                            <select
                                name="purchaseOrderId"
                                value={formData.purchaseOrderId}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                            >
                                <option value="">Select Purchase Order (Optional)</option>
                                {purchaseOrders.map((po) => (
                                    <option key={po._id} value={po._id}>
                                        {po.poNumber || po.purchaseOrderNumber} - {po.vendorId?.name} - ₹{calculateGrandTotal(po.items)}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Selecting a purchase order will auto-fill vendor and items
                            </p>
                        </div>

                        {/* Store and Vendor Selection */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Store *
                                </label>
                                {auth.role === USER_ROLES.ADMIN ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={stores[0]?.storeName || stores[0]?.name || 'Loading...'}
                                            readOnly
                                            className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-not-allowed text-sm md:text-base"
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Your assigned store
                                        </p>
                                        <input type="hidden" name="storeId" value={formData.storeId} />
                                    </div>
                                ) : (
                                    <select
                                        name="storeId"
                                        value={formData.storeId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                                    >
                                        <option value="">Select Store</option>
                                        {stores.map((store) => (
                                            <option key={store._id} value={store._id}>
                                                {store.name} - {store.storeCode}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div> */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Vendor *
                                </label>
                                <select
                                    name="vendorId"
                                    value={formData.vendorId}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                                >
                                    <option value="">Select Vendor</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor._id} value={vendor._id}>
                                            {vendor.name} - {vendor.vendorCode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Invoice Number and Notes */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    value={formData.invoiceNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                                    placeholder="Enter invoice number"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                                    Notes
                                </label>
                                <input
                                    type="text"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                                    placeholder="Enter any notes"
                                />
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Received Items</h3>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="px-3 py-2 md:px-4 md:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center text-sm md:text-base"
                                >
                                    <svg className="w-4 h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Item
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-1 gap-3 p-3 md:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                        {/* Mobile View - Stacked */}
                                        <div className="md:hidden space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Product ID *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.productId}
                                                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent text-sm"
                                                    placeholder="Enter product ID"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Qty Received *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.quantityReceived}
                                                        onChange={(e) => handleItemChange(index, 'quantityReceived', e.target.value)}
                                                        required
                                                        min="1"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent text-sm"
                                                        placeholder="Qty"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Rate (₹) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.rate}
                                                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                                        required
                                                        min="0"
                                                        step="0.01"
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent text-sm"
                                                        placeholder="Rate"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Batch Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.batchNumber}
                                                    onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent text-sm"
                                                    placeholder="Enter batch number"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Total
                                                    </label>
                                                    <p className="px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-200 font-semibold text-sm">
                                                        ₹{calculateItemTotal(item.quantityReceived, item.rate).toLocaleString()}
                                                    </p>
                                                </div>

                                                {formData.items.length > 1 && (
                                                    <div className="flex items-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(index)}
                                                            className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop View - Grid */}
                                        <div className="hidden md:grid md:grid-cols-12 gap-3">
                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Product ID *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.productId}
                                                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Enter product ID"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Qty Received *
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.quantityReceived}
                                                    onChange={(e) => handleItemChange(index, 'quantityReceived', e.target.value)}
                                                    required
                                                    min="1"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Qty"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Rate (₹) *
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Rate"
                                                />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Batch Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.batchNumber}
                                                    onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Enter batch number"
                                                />
                                            </div>

                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Total
                                                </label>
                                                <p className="px-3 py-2 bg-gray-100 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-200 font-semibold text-sm">
                                                    ₹{calculateItemTotal(item.quantityReceived, item.rate).toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="md:col-span-1 flex items-end">
                                                {formData.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                                                        title="Remove Item"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Grand Total */}
                            <div className="mt-4 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">Grand Total</span>
                                    <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        ₹{calculateGrandTotal().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 md:pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard/stock-inwards')}
                                className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg md:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm md:text-base order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-orange-500 dark:to-red-600 text-white rounded-lg md:rounded-xl hover:from-purple-600 hover:to-pink-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base order-1 sm:order-2"
                            >
                                {loading ? 'Creating...' : 'Create Stock Inward'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStockInward;