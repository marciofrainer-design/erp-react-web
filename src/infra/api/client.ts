import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

// Interceptor de request
apiClient.interceptors.request.use((config) => {
  // exemplo: token
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // padronização de erro
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