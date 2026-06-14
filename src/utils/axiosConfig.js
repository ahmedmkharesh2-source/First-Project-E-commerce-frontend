import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
});

// Add interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      // Add token to cookies header
      config.headers.Cookie = `token=${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
