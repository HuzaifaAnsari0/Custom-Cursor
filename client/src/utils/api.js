import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api'
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth endpoints
  adminLogin: (data) => axiosInstance.post('/admin/login', data),
  adminSignup: (data) => axiosInstance.post('/admin/signup', data),
  
  // Cursor endpoints
  getCursors: () => axiosInstance.get('/cursors'),
  uploadCursor: (formData) => axiosInstance.post('/cursors', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Admin endpoints
  getPendingCursors: () => {
    return axiosInstance.get('/cursors/pending');
  },
  updateCursorStatus: (cursorId, status) => {
    return axiosInstance.patch(`/cursors/${cursorId}/status`, { status });
  },
  getStats: () => axiosInstance.get('/cursors/stats'),
  deleteCursor: (cursorId) => axiosInstance.delete(`/cursors/${cursorId}`),
};