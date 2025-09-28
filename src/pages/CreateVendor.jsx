    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { getUserRole, USER_ROLES, createVendor } from '../services/coreServices';

    const CreateVendor = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const [formData, setFormData] = useState({
        name: '',
        gstNumber: '',
        address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
        },
        contactInfo: {
        phone: '',
        email: '',
        contactPerson: ''
        },
        isActive: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const canCreateVendor = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.PURCHASE_MAN].includes(userRole);

    if (!canCreateVendor) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Only Super Admins, Admins, and Purchase Managers can create vendors.
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [parent]: {
            ...prev[parent],
            [child]: value
            }
        }));
        } else {
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.name || !formData.address.street || !formData.address.city || 
            !formData.address.state || !formData.address.zipCode || 
            !formData.contactInfo.phone || !formData.contactInfo.email) {
        setError('All required fields must be filled');
        setLoading(false);
        return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.contactInfo.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.contactInfo.phone.replace(/[-\s()]/g, ''))) {
        setError('Please enter a valid 10-digit phone number');
        setLoading(false);
        return;
        }

        // GST validation (if provided)
        if (formData.gstNumber && !/^[0-9A-Z]{15}$/.test(formData.gstNumber)) {
        setError('Please enter a valid 15-character GST number');
        setLoading(false);
        return;
        }

        try {
        const vendorData = {
            name: formData.name.trim(),
            gstNumber: formData.gstNumber?.trim() || undefined,
            address: {
            street: formData.address.street.trim(),
            city: formData.address.city.trim(),
            state: formData.address.state.trim(),
            zipCode: formData.address.zipCode.trim(),
            country: formData.address.country.trim()
            },
            contactInfo: {
            phone: formData.contactInfo.phone.trim(),
            email: formData.contactInfo.email.trim(),
            contactPerson: formData.contactInfo.contactPerson?.trim() || undefined
            },
            isActive: formData.isActive
        };

        //console.log('Sending vendor data:', vendorData); // Debug log

        const response = await createVendor(vendorData);
        //console.log('Create vendor response:', response); // Debug log

        // Since createVendor returns response.data and shows success message automatically,
        // we just need to check if response exists (no error was thrown)
        if (response) {
            const vendorName = vendorData.name || 'Vendor';
            setSuccess(`Vendor "${vendorName}" created successfully!`);
            
            // Redirect to vendors page after 2 seconds
            setTimeout(() => {
            navigate('/dashboard/vendors');
            }, 2000);
            
        } else {
            throw new Error('No response received from server');
        }
        
        } catch (error) {
        console.error('Error creating vendor:', error); // Debug log
        
        let errorMessage = 'Failed to create vendor';
        
        // Handle different types of errors
        if (error.message) {
            errorMessage = error.message;
        } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        // Handle specific error types
        if (errorMessage.toLowerCase().includes('already exists')) {
            setError(`Vendor with this name or details already exists`);
        } else if (errorMessage.toLowerCase().includes('validation')) {
            setError('Please check your input data for any errors');
        } else if (errorMessage.toLowerCase().includes('network')) {
            setError('Network error - please check your connection and try again');
        } else {
            setError(errorMessage);
        }
        
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
            <button
                onClick={() => navigate('/dashboard/vendors')}
                className="mb-4 flex items-center text-blue-600 dark:text-orange-400 hover:text-blue-700 dark:hover:text-orange-300 transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Vendors
            </button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Create New Vendor
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Add a new vendor to the system</p>
            </div>

            {/* Form */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 p-8">
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 dark:text-red-400">{error}</p>
                </div>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-green-700 dark:text-green-400 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {success} Redirecting to vendors page...
                </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vendor Name *
                    </label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter vendor name"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GST Number (Optional)
                    </label>
                    <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter 15-character GST number"
                    maxLength="15"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    15-character GST number (e.g., 07ABCDE1234F1Z5)
                    </p>
                </div>

                <div className="flex items-center">
                    <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 dark:text-orange-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-orange-500 focus:ring-2"
                    />
                    <label className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Vendor is Active
                    </label>
                </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Person (Optional)
                    </label>
                    <input
                        type="text"
                        name="contactInfo.contactPerson"
                        value={formData.contactInfo.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter contact person name"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="contactInfo.phone"
                        value={formData.contactInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                    />
                    </div>

                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="contactInfo.email"
                        value={formData.contactInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter email address"
                    />
                    </div>
                </div>
                </div>

                {/* Address Section */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Vendor Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address *
                    </label>
                    <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter street address"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                    </label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter city"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State *
                    </label>
                    <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter state"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Zip Code *
                    </label>
                    <input
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter zip code"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter country"
                    />
                    </div>
                </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                <button
                    type="button"
                    onClick={() => navigate('/dashboard/vendors')}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-orange-500 dark:to-red-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 dark:hover:from-orange-600 dark:hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating...' : 'Create Vendor'}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
    };

    export default CreateVendor;