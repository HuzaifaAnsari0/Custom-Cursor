import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
);

export const api = {
  getCursors: () => apiClient.get('/cursors'),
  uploadCursor: (formData) => apiClient.post('/cursors', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  incrementDownloads: (id) => apiClient.post(`/cursors/${id}/download`),
};