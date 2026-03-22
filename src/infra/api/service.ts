// datasnap.adapter.ts
import { apiClient } from './client';

export class DataSnapAdapter {
  async call<T>(
    controller: string,
    method: string,
    params?: unknown
  ): Promise<T> {
    const url = `/${controller}/${method}`;

    try {
      const isGet = !params;

      const response = isGet
        ? await apiClient.get<T>(url)
        : await apiClient.post<T>(url, params);

      return response.data;
    } catch (error: unknown) {
      // ponto único de log
      console.error(`[DataSnap] ${controller}.${method}`, error);

      throw error;
    }
  }
}