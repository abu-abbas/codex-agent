import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 5000
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!window.navigator.onLine) {
      return Promise.reject(new Error('Offline, transaksi disimpan lokal.'));
    }
    return Promise.reject(error);
  }
);
