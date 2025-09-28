// Login utility functions
export const attemptLogout = () => {
  // Clear all authentication data
  localStorage.removeItem("token");
  localStorage.removeItem("user_data");
  localStorage.removeItem("user_role");
  localStorage.removeItem("login_timestamp");
  
  // Clear any other auth-related data
  localStorage.removeItem("auth");
  
  console.log("User logged out - all auth data cleared");
};

export const setAuthData = (token, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user_data", JSON.stringify(userData));
  localStorage.setItem("user_role", userData.role);
  localStorage.setItem("login_timestamp", Date.now().toString());
};

export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user_data");
  const userRole = localStorage.getItem("user_role");
  
  return {
    token,
    userData: userData ? JSON.parse(userData) : null,
    userRole
  };
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user_data");
  return !!(token && userData);
};
