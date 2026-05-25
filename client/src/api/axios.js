import axios from 'axios';

const api = axios.create({
  // Your REAL Render backend URL!
  baseURL: 'https://hirehub-ats.onrender.com/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;