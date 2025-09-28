// Super Admin specific services - using existing coreServices APIs
import { getUsers, getStores, createStore, updateStore, getStoreById } from '../../../services/coreServices';

// Use existing getUsers API for super admin
export const getAllUsers = async () => {
  try {
    return await getUsers(); // Uses existing api/v1/user/users
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Use existing getStores API for super admin
export const getAllStores = async () => {
  try {
    return await getStores(); // Uses existing api/v1/store/all-store
  } catch (error) {
    console.error('Error fetching all stores:', error);
    throw error;
  }
};

// Use existing getStoreById API for specific store details
export const getStoreDetails = async (storeId) => {
  try {
    return await getStoreById(storeId); // Uses existing api/v1/store/get/${storeId}
  } catch (error) {
    console.error('Error fetching store details:', error);
    throw error;
  }
};

// Use existing createStore API for creating new stores
export const createNewStore = async (storeData) => {
  try {
    return await createStore(storeData); // Uses existing api/v1/store/create-store
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
};

// Use existing updateStore API for updating stores
export const updateStoreDetails = async (storeId, storeData) => {
  try {
    return await updateStore(storeId, storeData); // Uses existing api/v1/store/update/${storeId}
  } catch (error) {
    console.error('Error updating store:', error);
    throw error;
  }
};

// Super Admin specific functions (these can be added to coreServices later if needed)
export const getSystemStats = async () => {
  try {
    // This can be implemented when you add the API endpoint
    // For now, return mock data or combine existing APIs
    const [users, stores] = await Promise.all([
      getAllUsers(),
      getAllStores()
    ]);
    
    return {
      totalUsers: users.length,
      totalStores: stores.length,
      activeUsers: users.filter(user => user.status === 'active').length,
      activeStores: stores.filter(store => store.status === 'active').length
    };
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};

export const getSystemLogs = async () => {
  try {
    // This can be implemented when you add the API endpoint
    // For now, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching system logs:', error);
    throw error;
  }
};

export const updateSystemSettings = async (settings) => {
  try {
    // This can be implemented when you add the API endpoint
    // For now, return success
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error('Error updating system settings:', error);
    throw error;
  }
};

export const createAdminUser = async (userData) => {
  try {
    // This can be implemented when you add the API endpoint
    // For now, return success
    return { success: true, message: 'Admin user created successfully' };
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
};

export const getAuditLogs = async () => {
  try {
    // This can be implemented when you add the API endpoint
    // For now, return empty array
    return [];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};

export default {
  getSystemStats,
  getAllUsers,
  getSystemLogs,
  updateSystemSettings,
  createAdminUser,
  getAuditLogs
};
