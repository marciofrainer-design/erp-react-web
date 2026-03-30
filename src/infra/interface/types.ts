import type { ApiAdapter } from ".";

export type Repository<T> = {
  getAll: () => Promise<T[]>;
  getById: (id: number) => Promise<T>;
  save: (data: T) => Promise<void>;
  update: (data: T) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export type DependenciesFactory<T> = {
  getAdapter: () => ApiAdapter;
  getRepository: () => Repository<T>;
}
