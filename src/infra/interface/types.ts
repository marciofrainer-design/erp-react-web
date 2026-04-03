import type { ApiAdapter } from ".";

export type PaginationQueryParams = {
  page: number;
  pageCount: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageCount: number;
  limit: number;
  total: number;
};

export type Repository<T> = {
  getAll: (params: PaginationQueryParams) => Promise<PaginatedResponse<T>>;
  getById: (id: number) => Promise<T>;
  save: (data: T) => Promise<void>;
  update: (data: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export type DependenciesFactory<T> = {
  getAdapter: () => ApiAdapter;
  getRepository: () => Repository<T>;
}
