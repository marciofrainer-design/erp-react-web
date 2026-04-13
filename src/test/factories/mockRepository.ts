import type {
  PaginatedResponse,
  PaginationQueryParams,
  Repository,
} from "@/infra/interface/types";
import { vi } from "vitest";

type RepositoryData<T> = {
  items?: T[];
  getByIdResult?: T;
};

export function createMockRepository<T extends object>(
  config: RepositoryData<T> = {},
): Repository<T> {
  const items = config.items ?? [];
  const fallbackItem = items.at(0);

  return {
    getAll: vi.fn(async (params: PaginationQueryParams) => {
      const page = params.page ?? 1;
      const limit = params.limit ?? 10;

      const response: PaginatedResponse<T> = {
        data: items.slice(0, limit),
        total: items.length,
        page,
        pageCount: Math.max(1, Math.ceil(items.length / limit)),
        limit,
      };

      return response;
    }),
    getById: vi.fn(async () => {
      const result = config.getByIdResult ?? fallbackItem;

      if (!result) {
        throw new Error("Mock repository getById called without available data");
      }

      return result;
    }),
    save: vi.fn(async () => undefined),
    update: vi.fn(async () => undefined),
    delete: vi.fn(async () => undefined),
  };
}
