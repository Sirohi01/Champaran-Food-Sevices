import callApi from '../../../services/apiServices';

// User specific services
export const getMyOrders = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/my-orders",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching my orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/create-order",
      method: "POST",
      body: orderData
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/user/order-status/${orderId}`,
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/categories",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/user/products/${categoryId}`,
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/update-profile",
      method: "PUT",
      body: profileData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/user/notifications",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export default {
  getMyOrders,
  createOrder,
  getOrderStatus,
  getProductCategories,
  getProductsByCategory,
  updateProfile,
  getNotifications
};
