import type { ApiAdapter } from "../interface";
import type {
  PaginatedResponse,
  PaginationQueryParams,
  Repository,
} from "../interface/types";

export class RepositoryBase<
  TList,
  TDetail = TList,
  TCreate = TDetail,
  TUpdate = TDetail,
> implements Repository<TList, TDetail, TCreate, TUpdate> {
  protected api: ApiAdapter;
  protected controller: string;

  constructor(
    api: ApiAdapter,
    controller: string
  ) {
    this.api = api;
    this.controller = controller;
  }

  getAll(params: PaginationQueryParams): Promise<PaginatedResponse<TList>> {
    return this.api.get<PaginatedResponse<TList>>(this.controller, 'GetAll', params);
  }

  getById(id: number): Promise<TDetail> {
    return this.api.get<TDetail>(this.controller, 'GetById', { id });
  }

  save(data: TCreate): Promise<void> {
    return this.api.post<void>(this.controller, '', data);
  }

  update(data: TUpdate): Promise<void> {
    return this.api.put<void>(this.controller, '', data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete<void>(this.controller, '', id);
  }
}