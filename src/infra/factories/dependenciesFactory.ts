import type { ApiAdapter } from "../interface";
import type { DependenciesFactory, Repository } from "../interface/types";

export class DependenciesFactoryBase<T> implements DependenciesFactory<T> {
  apiAdapter: ApiAdapter;
  repository: Repository<T>;

  constructor(adapter: ApiAdapter, repository: Repository<T>) {
    this.apiAdapter = adapter;
    this.repository = repository;
  }

  getAdapter(): ApiAdapter {
    return this.apiAdapter;
  }

  getRepository(): Repository<T> {
    return this.repository;
  }
}