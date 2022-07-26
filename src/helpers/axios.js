import axios from "axios";
import { BASE_API } from "../config/config";
const axiosInstance = axios.create({
  baseURL: BASE_API,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error) {
      const { status } = error.response || 0;
      if (status === 500 || error.message === "Network Error") {
        window.localStorage.clear();
        throw new Error("Server Down Or Network Issue");
      }
      return Promise.reject(error);
    }
  }
);
export default axiosInstance;
