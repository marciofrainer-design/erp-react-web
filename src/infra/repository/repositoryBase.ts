import { DataSnapAdapter } from "../api/service";

export abstract class RepositoryBase<T> {
  protected api: DataSnapAdapter;
  protected controller: string;

  constructor(
    api: DataSnapAdapter,
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