import { RepositoryBase } from '@/infra/repository/repositoryBase';
import { DataSnapAdapter } from '@infra/api/service';
import type { Andar } from './types';
import { ControllerPrefix, ControllerSuffix } from '@/shared/consts';

const typeName = 'Andar';
export class AndarRepository extends RepositoryBase<Andar> {
  constructor(api: DataSnapAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
}