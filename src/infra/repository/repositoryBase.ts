import type { ApiAdapter } from "../interface";
import type {
  PaginatedResponse,
  PaginationQueryParams,
  Repository,
} from "../interface/types";

export class RepositoryBase<T> implements Repository<T> {
  protected api: ApiAdapter;
  protected controller: string;

  constructor(
    api: ApiAdapter,
    controller: string
  ) {
    this.api = api;
    this.controller = controller;
  }

  getAll(params: PaginationQueryParams): Promise<PaginatedResponse<T>> {
    return this.api.get<PaginatedResponse<T>>(this.controller, 'GetAll', params);
  }

  getById(id: number): Promise<T> {
    return this.api.get<T>(this.controller, 'GetById', { id });
  }

  save(data: T): Promise<void> {
    return this.api.post<void>(this.controller, '', data);
  }

  update(data: T): Promise<void> {
    return this.api.put<void>(this.controller, '', data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete<void>(this.controller, '', id);
  }
}