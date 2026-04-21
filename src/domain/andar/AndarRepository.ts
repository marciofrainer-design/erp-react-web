import { RepositoryBase } from '@/infra/repository/repositoryBase';
import type { ApiAdapter } from '@/infra/interface';
import type { Andar, AndarAll } from './types';
import { ControllerPrefix, ControllerSuffix } from '@/consts';

const typeName = 'Andar';
export class AndarRepository extends RepositoryBase<AndarAll, Andar> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}