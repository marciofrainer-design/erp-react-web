import { RepositoryBase } from '@/infra/repository/repositoryBase';
import { DataSnapAdapter } from '@infra/api/service';
import type { Empresa } from './types';

export class EmpresaRepository extends RepositoryBase<Empresa> {
  constructor(api: DataSnapAdapter) {
    super(api, 'TEmpresaController');
  }
}
