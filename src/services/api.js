import axios from 'axios';

/**
 * Reusable Axios instance for SubSense AI API.
 * Points to the backend server with fallback handling for local development.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
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
    if (error.response?.status === 401) {
      localStorage.removeItem('subsense_token');
    }
    return Promise.reject(error);
  }
);

// Auth Service Endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
};

// Dashboard & Analytics Endpoints
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary'),
  getHealthScore: () => api.get('/health-score'),
  getForecast: () => api.get('/forecast'),
};

// Subscriptions Service Endpoints
export const subscriptionsAPI = {
  getAll: () => api.get('/subscriptions'),
  getById: (id) => api.get(`/subscriptions/${id}`),
  create: (data) => api.post('/subscriptions', data),
  update: (id, data) => api.put(`/subscriptions/${id}`, data),
  delete: (id) => api.delete(`/subscriptions/${id}`),
  pause: (id) => api.patch(`/subscriptions/${id}/pause`),
  resume: (id) => api.patch(`/subscriptions/${id}/resume`),
};

// Bills & OCR Scanning Endpoints
export const billsAPI = {
  getAll: () => api.get('/bills'),
  uploadOCR: (formData) => api.post('/ocr/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// AI Copilot Endpoints
export const aiAPI = {
  chatMessage: (messagePayload) => api.post('/ai/chat', messagePayload),
  getInsights: () => api.get('/ai/insights'),
};

// Notifications Endpoints
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch('/notifications/read-all'),
  clearAll: () => api.delete('/notifications'),
};

export default api;
