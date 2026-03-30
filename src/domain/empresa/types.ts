import type { ModelBase } from '@/types';

type Empresa = ModelBase & {
  idempresa: number;
  nmfantasia: string;
  cnpj: string;
  isativo: number;
};

export type { Empresa };
