// datasnap.adapter.ts
import type { ApiAdapter } from "../interface";
import type { ApiCallOptions } from "../api/types";

import { apiClient } from "./client";
import { getSelectedEmpresaId } from "@/context/empresa/empresaSelection";

function buildEndpoint(controller: string, method: string) {
  const sanitizedController = controller.replace(/^\/+|\/+$/g, "");
  const sanitizedMethod = method.replace(/^\/+|\/+$/g, "");

  return sanitizedMethod
    ? `/${sanitizedController}/${sanitizedMethod}`
    : `/${sanitizedController}/`;
}

function hasEmpresaIdField(value: unknown): value is { idempresa: unknown } {
  return typeof value === "object" && value !== null && "idempresa" in value;
}

function applyEmpresaContextToBody(body: unknown, empresaId: string | null) {
  if (!empresaId || !hasEmpresaIdField(body)) {
    return body;
  }

  const parsedEmpresaId = Number(empresaId);

  if (Number.isNaN(parsedEmpresaId)) {
    return body;
  }

  return {
    ...body,
    idempresa: parsedEmpresaId,
  };
}

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
    const url = buildEndpoint(options.controller, options.method ?? "");
    const empresaId = getSelectedEmpresaId();
    const bodyWithEmpresaContext = applyEmpresaContextToBody(
      options.body,
      empresaId,
    );
    const headers = empresaId
      ? {
          "empresas": empresaId,
        }
      : undefined;

    try {
      let response;
      switch (options?.verb) {
        case "POST":
          response = await apiClient.post(url, bodyWithEmpresaContext, { headers });
          break;
        case "PUT":
          response = await apiClient.put(url, bodyWithEmpresaContext, { headers });
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

