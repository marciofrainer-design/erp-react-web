import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Erro inesperado';

    return Promise.reject({
      message,
      status: error.response?.status,
      raw: error,
    });
  }
);