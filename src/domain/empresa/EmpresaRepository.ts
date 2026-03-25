import { RepositoryBase } from '@/infra/repository/repositoryBase';
import { DataSnapAdapter } from '@infra/api/service';
import type { Empresa } from './types';
import { ControllerPrefix, ControllerSuffix } from '@/shared/consts';

const typeName = 'Empresa';
export class EmpresaRepository extends RepositoryBase<Empresa> {
  constructor(api: DataSnapAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
