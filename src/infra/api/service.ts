// datasnap.adapter.ts
import type { ApiAdapter } from "../interface";
import type { ApiCallOptions } from "../api/types";

import { apiClient } from "./client";
import { getSelectedEmpresaId } from "@/context/empresa/empresaSelection";

export class DataSnapAdapter implements ApiAdapter {
  get<T>(controller: string, method: string, params?: unknown): Promise<T> {
    return this.call<T>({ controller, method, params, verb: "GET" });
  }

  post<T>(controller: string, method: string, body: unknown): Promise<T> {
    return this.call<T>({ controller, method, body, verb: "POST" });
  }

  put<T>(controller: string, method: string, body: unknown): Promise<T> {
    return this.call<T>({ controller, method, body, verb: "PUT" });
  }

  delete<T>(controller: string, method: string, params?: unknown): Promise<T> {
    return this.call<T>({ controller, method, params, verb: "DELETE" });
  }
  async call<T>(options: ApiCallOptions): Promise<T> {
    const serverUrl =
      import.meta.env.VITE_DATASNAP_URL || "http://localhost:3000";

    const url = `${serverUrl}/${options.controller}/${options.method}`;
    const empresaId = getSelectedEmpresaId();
    const headers = empresaId
      ? {
          "empresas": empresaId,
        }
      : undefined;

    try {
      let response;
      switch (options?.verb) {
        case "POST":
          response = await apiClient.post(url, options.body, { headers });
          break;
        case "PUT":
          response = await apiClient.put(url, options.body, { headers });
          break;
        case "DELETE":
          response = await apiClient.delete(`${url}${options.params}`, {
            headers,
          });
          break;
        default:
          response = await apiClient.get(url, {
            params: options.params,
            headers,
          });
          break;
      }

      return response.data as T;
    } catch (error: unknown) {
      console.error(
        `[DataSnap] ${options.controller}.${options.method} - Error:`,
        error,
      );

      throw error;
    }
  }
}
