import callApi from '../../../services/apiServices';

// Salesman specific services
export const getSalesTargets = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/salesman/targets",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales targets:', error);
    throw error;
  }
};

export const getCustomerList = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/salesman/customers",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching customer list:', error);
    throw error;
  }
};

export const createSale = async (saleData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/salesman/create-sale",
      method: "POST",
      body: saleData
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};

export const getSalesHistory = async (dateRange) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/salesman/sales-history",
      method: "GET",
      params: dateRange
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales history:', error);
    throw error;
  }
};

export const getProductCatalog = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/salesman/products",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product catalog:', error);
    throw error;
  }
};

export const updateCustomerInfo = async (customerId, customerData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/salesman/update-customer/${customerId}`,
      method: "PUT",
      body: customerData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating customer info:', error);
    throw error;
  }
};

export default {
  getSalesTargets,
  getCustomerList,
  createSale,
  getSalesHistory,
  getProductCatalog,
  updateCustomerInfo
};
