import type { ApiAdapter, Repository } from "../interface";

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

  getAll(): Promise<T[]> {
    return this.api.get<T[]>(this.controller, 'GetAll');
  }

  getById(id: number): Promise<T> {
    return this.api.get<T>(this.controller, 'GetById', { id });
  }

  save(data: T): Promise<void> {
    return this.api.post<void>(this.controller, 'Save', data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete<void>(this.controller, 'Delete', { id });
  }
}