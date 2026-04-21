import type { EntityBase } from '@/types';

export type EmpresaAll = EntityBase & {
  idempresa: number;
  nmfantasia: string;
  cnpj: string;
  isativo: number;
};

export type Empresa = EntityBase & {
  idempresa: number;
  nmfantasia: string;
  cnpj: string;
  isativo: number;
};
