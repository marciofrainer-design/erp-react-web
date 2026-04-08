import { RepositoryBase } from '@/infra/repository/repositoryBase';
import type { ApiAdapter } from '@/infra/interface';
import type { Empresa } from './types';
import { ControllerPrefix, ControllerSuffix } from '@/consts';

const typeName = 'Empresa';
export class EmpresaRepository extends RepositoryBase<Empresa> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}
