import type { ApiAdapter } from "@/infra/interface";
import type { ApiCallOptions } from "@/infra/api/types";
import type { PaginatedResponse, PaginationQueryParams } from "@/infra/interface/types";

type MockHandler = (params?: unknown, body?: unknown) => unknown;

type MockRoute = {
  [controller: string]: {
    [method: string]: MockHandler;
  };
};

function paginate<T>(items: T[], params?: unknown): PaginatedResponse<T> {
  const { page = 1, limit = 10 } = (params as PaginationQueryParams) ?? {};
  const total = items.length;
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  return { data, total, page, pageCount, limit };
}

export class MockAdapter implements ApiAdapter {
  private routes: MockRoute;

  constructor(routes: MockRoute) {
    this.routes = routes;
  }

  private resolveHandler<T>(controller: string, method: string, params?: unknown, body?: unknown): Promise<T> {
    const handler = this.routes[controller]?.[method];

    if (!handler) {
      console.warn(`[MockAdapter] No handler for ${controller}/${method}`);
      return Promise.resolve(undefined as T);
    }

    return new Promise((resolve) =>
      setTimeout(() => resolve(handler(params, body) as T), 200),
    );
  }

  call<T>(options: ApiCallOptions): Promise<T> {
    return this.resolveHandler<T>(options.controller, options.method ?? "", options.params, options.body);
  }

  get<T>(controller: string, method: string, params?: unknown): Promise<T> {
    return this.resolveHandler<T>(controller, method, params);
  }

  post<T>(controller: string, method: string, body?: unknown): Promise<T> {
    return this.resolveHandler<T>(controller, method, undefined, body);
  }

  put<T>(controller: string, method: string, body?: unknown): Promise<T> {
    return this.resolveHandler<T>(controller, method, undefined, body);
  }

  delete<T>(controller: string, method: string, params?: unknown): Promise<T> {
    return this.resolveHandler<T>(controller, method, params);
  }
}

export { paginate };
export type { MockRoute, MockHandler };
