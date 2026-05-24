import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR (You already have this)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🌟 NEW: RESPONSE INTERCEPTOR (Handles global errors & invalid tokens)
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      if (error.response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        toast.error("Session expired. Please log in again.");
        // Force redirect to login page
        window.location.href = '/login'; 
      } else if (error.response.status >= 500) {
        // Server crashed
        toast.error("Server error. We are working on it!");
      }
    } else if (error.request) {
      // The request was made but no response was received (Network Error)
      toast.error("Network error. Please check your internet connection.");
    }
    
    return Promise.reject(error);
  }
);

export default api;