import axios from 'axios';

const api = axios.create({
  // DELETE the import.meta.env line and paste your REAL Render URL in quotes:
  baseURL: 'https://YOUR-ACTUAL-RENDER-LINK.onrender.com/api', 
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