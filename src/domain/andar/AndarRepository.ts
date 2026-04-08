import { RepositoryBase } from '@/infra/repository/repositoryBase';
import type { ApiAdapter } from '@/infra/interface';
import type { Andar } from './types';
import { ControllerPrefix, ControllerSuffix } from '@/consts';

const typeName = 'Andar';
export class AndarRepository extends RepositoryBase<Andar> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}