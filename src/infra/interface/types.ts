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

export type Repository<
  TList,
  TDetail = TList,
  TCreate = TDetail,
  TUpdate = TDetail,
> = {
  getAll: (params: PaginationQueryParams) => Promise<PaginatedResponse<TList>>;
  getById: (id: number) => Promise<TDetail>;
  save: (data: TCreate) => Promise<void>;
  update: (data: TUpdate) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export type DependenciesFactory<
  TList,
  TDetail = TList,
  TCreate = TDetail,
  TUpdate = TDetail,
> = {
  getAdapter: () => ApiAdapter;
  getRepository: () => Repository<TList, TDetail, TCreate, TUpdate>;
}
