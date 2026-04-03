import type { EntityBase } from '@/types';

type Empresa = EntityBase & {
  idempresa: number;
  nmfantasia: string;
  cnpj: string;
  isativo: number;
};

export type { Empresa };
