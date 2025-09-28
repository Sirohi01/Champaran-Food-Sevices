import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, USER_ROLES, getVendors } from '../services/coreServices';
const VendorPage = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showVendorDetails, setShowVendorDetails] = useState(false);
    // const [showEditModal, setShowEditModal] = useState(false);
    // const [editFormData, setEditFormData] = useState({});
    // const [updating, setUpdating] = useState(false);

    const canViewVendors = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole);

    useEffect(() => {
        if (canViewVendors) {
            fetchVendors();
        } else {
            setLoading(false);
        }
    }, [canViewVendors]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = vendors.filter(vendor =>
                vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (vendor.contactInfo && vendor.contactInfo.email && vendor.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                vendor.vendorCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (vendor.contactInfo && vendor.contactInfo.contactPerson && vendor.contactInfo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredVendors(filtered);
        } else {
            setFilteredVendors(vendors);
        }
    }, [searchTerm, vendors]);

    const fetchVendors = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getVendors();
            let vendorsData = [];
            
            if (response && response.success) {
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    vendorsData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    vendorsData = response.data;
                } else if (response.data && response.data.vendors && Array.isArray(response.data.vendors)) {
                    vendorsData = response.data.vendors;
                }
            } else if (Array.isArray(response)) {
                vendorsData = response;
            } else {
                console.warn('Unexpected API response structure:', response);
                setVendors([]);
                return;
            }
            
            setVendors(vendorsData);
            setFilteredVendors(vendorsData);
        } catch (error) {
            setError(error.message || 'Failed to fetch vendors');
            console.error('Error fetching vendors:', error);
            setVendors([]);
            setFilteredVendors([]);
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

    // Handle vendor details view
    const handleViewVendor = (vendor) => {
        setSelectedVendor(vendor);
        setShowVendorDetails(true);
    };

    // Handle edit vendor
    // const handleEditVendor = (vendor) => {
    //     setEditFormData({
    //         _id: vendor._id,
    //         name: vendor.name,
    //         vendorCode: vendor.vendorCode,
    //         gstNumber: vendor.gstNumber,
    //         address: {
    //             street: vendor.address.street,
    //             city: vendor.address.city,
    //             state: vendor.address.state,
    //             zipCode: vendor.address.zipCode,
    //             country: vendor.address.country || 'India'
    //         },
    //         contactInfo: {
    //             phone: vendor.contactInfo.phone,
    //             email: vendor.contactInfo.email,
    //             contactPerson: vendor.contactInfo.contactPerson
    //         },
    //         isActive: vendor.isActive
    //     });
    //     setShowEditModal(true);
    // };

    // // Handle input change for edit form
    // const handleEditInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
        
    //     if (name.includes('.')) {
    //         const [parent, child] = name.split('.');
    //         setEditFormData(prev => ({
    //             ...prev,
    //             [parent]: {
    //                 ...prev[parent],
    //                 [child]: type === 'checkbox' ? checked : value
    //             }
    //         }));
    //     } else {
    //         setEditFormData(prev => ({
    //             ...prev,
    //             [name]: type === 'checkbox' ? checked : value
    //         }));
    //     }
    // };

    if (!canViewVendors) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                        Access Denied
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Only Super Admins, Admins, and Purchase Managers can view vendors.
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

    if (loading && vendors.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-orange-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Loading vendors...</p>
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
                                Vendor Management
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Manage {vendors.length} vendors in the system
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search vendors..."
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
                                    onClick={() => navigate('/dashboard/create-vendor')}
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-orange-500 dark:to-red-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all shadow-lg transform hover:scale-105 flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Vendor
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
                                onClick={fetchVendors}
                                className="px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Vendors Grid */}
                {filteredVendors.length === 0 ? (
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            {searchTerm ? 'No matching vendors found' : 'No Vendors Found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {searchTerm ? 'Try adjusting your search terms' : 'There are no vendors in the system yet.'}
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
                                onClick={() => navigate('/dashboard/create-vendor')}
                                className="px-6 py-3 bg-blue-600 dark:bg-orange-600 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-orange-700 transition-colors"
                            >
                                Create First Vendor
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        <div className="mb-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {filteredVendors.length} of {vendors.length} vendors
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
                            {filteredVendors.map((vendor) => (
                                <div
                                    key={vendor._id}
                                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                >
                                    {/* Vendor Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                {vendor.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                                                    {vendor.name}
                                                </h3>
                                                <div className="flex items-center mt-1">
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${vendor.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <span className={`text-sm font-medium ${vendor.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                        {vendor.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Code: {vendor.vendorCode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vendor Details */}
                                    <div className="space-y-3 mb-4">
                                        {/* Contact Person */}
                                        {vendor.contactInfo?.contactPerson && (
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                    {vendor.contactInfo.contactPerson}
                                                </span>
                                            </div>
                                        )}

                                        {/* GST Number */}
                                        {vendor.gstNumber && (
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    GST: {vendor.gstNumber}
                                                </span>
                                            </div>
                                        )}

                                        {/* Address */}
                                        <div className="flex items-start">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                <p className="font-medium">{vendor.address.street}</p>
                                                <p>{vendor.address.city}, {vendor.address.state} - {vendor.address.zipCode}</p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {vendor.contactInfo?.phone}
                                            </span>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {vendor.contactInfo?.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            Created: {formatDate(vendor.createdAt)}
                                        </span>
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewVendor(vendor)}
                                                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                            >
                                                View
                                            </button>
                                            
                                            {/* {[USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(userRole) && (
                                                <button
                                                    // onClick={() => handleEditVendor(vendor)}
                                                    className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Vendor Details Modal */}
            {showVendorDetails && selectedVendor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Vendor Details
                                </h2>
                                <button
                                    onClick={() => setShowVendorDetails(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Vendor Header */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-orange-500 dark:to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {selectedVendor.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                            {selectedVendor.name}
                                        </h3>
                                        <div className="flex items-center mt-1">
                                            <div className={`w-3 h-3 rounded-full mr-2 ${selectedVendor.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <span className={`text-sm font-medium ${selectedVendor.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {selectedVendor.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                                                Code: {selectedVendor.vendorCode}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vendor Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Contact Information</h4>
                                        <div className="space-y-3">
                                            {selectedVendor.contactInfo?.contactPerson && (
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-gray-600 dark:text-gray-400">{selectedVendor.contactInfo.contactPerson}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-gray-600 dark:text-gray-400">{selectedVendor.contactInfo?.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-gray-600 dark:text-gray-400">{selectedVendor.contactInfo?.phone}</span>
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
                                                <p>{selectedVendor.address.street}</p>
                                                <p>{selectedVendor.address.city}, {selectedVendor.address.state}</p>
                                                <p>{selectedVendor.address.zipCode}, {selectedVendor.address.country || 'India'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vendor Stats */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Vendor Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(selectedVendor.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatDate(selectedVendor.updatedAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                            <p className={`font-semibold ${selectedVendor.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {selectedVendor.isActive ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Vendor Code</p>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{selectedVendor.vendorCode}</p>
                                        </div>
                                        {selectedVendor.gstNumber && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">GST Number</p>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">{selectedVendor.gstNumber}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                {[USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN].includes(userRole) && (
                                    <button
                                        onClick={() => {
                                            setShowVendorDetails(false);
                                            // handleEditVendor(selectedVendor);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Edit Vendor
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowVendorDetails(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorPage;