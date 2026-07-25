import axios from 'axios';

/**
 * Reusable Axios instance for SubSense AI API.
 * Base URL points to the backend server.
 * Interceptors handle auth tokens and error responses.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('subsense_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized — redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('subsense_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
