import axios from 'axios';
import { API_BASE_PATH, API_TIMEOUT } from './consts';
import { clearStoredAuthSession, getStoredAccessToken } from '@/context/auth/storage';

export const apiClient = axios.create({
  baseURL: API_BASE_PATH,
  timeout: API_TIMEOUT,
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredAccessToken();

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuthSession();

      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/tools/login'
      ) {
        window.location.assign('/tools/login');
      }
    }

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
