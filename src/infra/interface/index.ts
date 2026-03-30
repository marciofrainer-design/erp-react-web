import type { ApiCallOptions } from "../api/types";

export interface ApiAdapter {
  call<T>(options: ApiCallOptions): Promise<T>;
  get<T>(controller: string, method: string, params?: unknown): Promise<T>;
  post<T>(controller: string, method: string, body: unknown): Promise<T>;
  put<T>(controller: string, method: string, body: unknown): Promise<T>;
  delete<T>(controller: string, method: string, params?: unknown): Promise<T>;
}

