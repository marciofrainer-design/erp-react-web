import type { ApiAdapter, DependenciesFactory, Repository } from "../interface";

export class DependenciesFactoryBase<T> implements DependenciesFactory<T> {
  apiAdapter: ApiAdapter;
  andarRepository: Repository<T>;
    
  constructor(adapter: ApiAdapter, repository: Repository<T>) {
    this.apiAdapter = adapter;
    this.andarRepository = repository;
  }

  getAdapter(): ApiAdapter {
    return this.apiAdapter;
  }

  getRepository(): Repository<T> {
    return this.andarRepository;
  } 
}