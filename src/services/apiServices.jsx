import axios from "axios";
import { attemptLogout } from "./loginUtility";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const LOGIN_ROUTE = "/login";

export default async function callApi({
  endpoint,
  method,
  body,
  responseType,
  headers = {},
}) {
  try {
    const authToken = localStorage.getItem("token");
    
    const defaultHeaders = {
      "content-type": "application/json",
      ...(authToken && { "authorization": `Bearer ${authToken}` })
    };

    const finalHeaders = { ...defaultHeaders, ...headers };

    const response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method,
      data: body,
      responseType, 
      headers: finalHeaders,
      timeout: 300000,
    });
    
    return response;
  } catch (e) {
    if (e.response?.status === 401) {
      attemptLogout();
      window.location = '/';
    }
    throw e instanceof Error
      ? e
      : new Error(e?.response?.data?.message || "API CALL Failed");
  }
}
