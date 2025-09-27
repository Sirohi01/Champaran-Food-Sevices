import callApi from '../../../services/apiServices';

// Manager specific services
export const getTeamPerformance = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/team-performance",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team performance:', error);
    throw error;
  }
};

export const getSalesReports = async (dateRange) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/sales-reports",
      method: "GET",
      params: dateRange
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales reports:', error);
    throw error;
  }
};

export const getInventoryStatus = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/inventory-status",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory status:', error);
    throw error;
  }
};

export const getPurchaseReports = async (dateRange) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/purchase-reports",
      method: "GET",
      params: dateRange
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase reports:', error);
    throw error;
  }
};

export const updateInventoryLevels = async (inventoryData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/update-inventory",
      method: "PUT",
      body: inventoryData
    });
    return response.data;
  } catch (error) {
    console.error('Error updating inventory levels:', error);
    throw error;
  }
};

export const getTeamTargets = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/manager/team-targets",
      method: "GET"
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team targets:', error);
    throw error;
  }
};

export default {
  getTeamPerformance,
  getSalesReports,
  getInventoryStatus,
  getPurchaseReports,
  updateInventoryLevels,
  getTeamTargets
};
