import { RepositoryBase } from '@/infra/repository/repositoryBase';
import { DataSnapAdapter } from '@infra/api/service';
import type { Andar } from './types';

export class AndarRepository extends RepositoryBase<Andar> {
  constructor(api: DataSnapAdapter) {
    super(api, 'TAndarController');
  }
}