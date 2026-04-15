import axios from 'axios';
import { API_BASE_PATH, API_TIMEOUT } from './consts';
import { clearStoredAuthSession, getStoredAccessToken } from '@/context/auth/storage';

const SHOW_DATASNAP_MESSAGE_IN_FOOTER =
  import.meta.env.DEV &&
  import.meta.env.VITE_SHOW_DATASNAP_MESSAGE_IN_TOOL_FOOTER === 'true';

const DATASNAP_ERROR_EVENT = 'datasnap:error-message';

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

    if (SHOW_DATASNAP_MESSAGE_IN_FOOTER && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(DATASNAP_ERROR_EVENT, {
          detail: {
            message,
            source: error.response?.data?.error ?? 'datasnap',
          },
        }),
      );
    }

    return Promise.reject({
      message,
      status: error.response?.status,
      raw: error,
    });
  }
);
