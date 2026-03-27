import type { ModelBase } from '@/shared/types';

type Empresa = ModelBase & {
  idempresa: number;
  nmfantasia: string;
  cnpj: string;
  isativo: number;
};

export type { Empresa };
