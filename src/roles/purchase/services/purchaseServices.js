import callApi from '../../../services/apiServices';

// Purchase Manager specific services
export const getPurchaseTargets = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/targets",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase targets:', error);
    throw error;
  }
};

export const getSupplierList = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/suppliers",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier list:', error);
    throw error;
  }
};

export const createPurchase = async (purchaseData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/create-purchase",
      method: "POST",
      body: purchaseData
    });
    return response.data;
  } catch (error) {
    console.error('Error creating purchase:', error);
    throw error;
  }
};

export const getPurchaseHistory = async (dateRange) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/purchase-history",
      method: "GET",
      params: dateRange
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    throw error;
  }
};

export const getInventoryNeeds = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/inventory-needs",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory needs:', error);
    throw error;
  }
};

export const updateSupplierInfo = async (supplierId, supplierData) => {
  try {
    const response = await callApi({
      endpoint: `api/v1/purchase/update-supplier/${supplierId}`,
      method: "PUT",
      body: supplierData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating supplier info:', error);
    throw error;
  }
};

export const getBudgetStatus = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/purchase/budget-status",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching budget status:', error);
    throw error;
  }
};

export default {
  getPurchaseTargets,
  getSupplierList,
  createPurchase,
  getPurchaseHistory,
  getInventoryNeeds,
  updateSupplierInfo,
  getBudgetStatus
};
