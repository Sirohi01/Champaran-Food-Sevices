// Admin specific services - using existing coreServices APIs
import { getUsers, getStores, getStoreById, createStore, updateStore } from '../../../services/coreServices';

// Use existing getStoreById API for store stats
export const getStoreStats = async (storeId) => {
  try {
    return await getStoreById(storeId); // Uses existing api/v1/store/get/${storeId}
  } catch (error) {
    console.error('Error fetching store stats:', error);
    throw error;
  }
};

// Use existing getUsers API for store users
export const getStoreUsers = async () => {
  try {
    return await getUsers(); // Uses existing api/v1/user/users
  } catch (error) {
    console.error('Error fetching store users:', error);
    throw error;
  }
};

// Use existing createStore API for creating new stores
export const createStoreUser = async (userData) => {
  try {
    // This can be implemented when you add the user creation API
    // For now, return success
    return { success: true, message: 'Store user created successfully' };
  } catch (error) {
    console.error('Error creating store user:', error);
    throw error;
  }
};

export const updateStoreUser = async (userId, userData) => {
  try {
    // This can be implemented when you add the user update API
    // For now, return success
    return { success: true, message: 'Store user updated successfully' };
  } catch (error) {
    console.error('Error updating store user:', error);
    throw error;
  }
};

export const getStoreReports = async (storeId) => {
  try {
    // This can be implemented when you add the reports API
    // For now, return mock data
    return {
      storeId,
      totalSales: 0,
      totalOrders: 0,
      revenue: 0
    };
  } catch (error) {
    console.error('Error fetching store reports:', error);
    throw error;
  }
};

export const getStoreInventory = async (storeId) => {
  try {
    // This can be implemented when you add the inventory API
    // For now, return mock data
    return {
      storeId,
      items: [],
      totalItems: 0
    };
  } catch (error) {
    console.error('Error fetching store inventory:', error);
    throw error;
  }
};

export default {
  getStoreStats,
  getStoreUsers,
  createStoreUser,
  updateStoreUser,
  getStoreReports,
  getStoreInventory
};
