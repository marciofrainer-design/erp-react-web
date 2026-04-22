import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('uhclassificacao').del();

  await knex('uhclassificacao').insert([
    { iduhclassificacao: 1, idempresa: 1, cduhclassificacao: 'CLASS-1', dsidentificador: 'Economia',   isativo: 1 },
    { iduhclassificacao: 2, idempresa: 1, cduhclassificacao: 'CLASS-2', dsidentificador: 'Conforto',   isativo: 1 },
    { iduhclassificacao: 3, idempresa: 1, cduhclassificacao: 'CLASS-3', dsidentificador: 'Superior',   isativo: 1 },
    { iduhclassificacao: 4, idempresa: 1, cduhclassificacao: 'CLASS-4', dsidentificador: 'Luxo',       isativo: 1 },
    { iduhclassificacao: 5, idempresa: 1, cduhclassificacao: 'CLASS-5', dsidentificador: 'Presidencial', isativo: 1 },
    { iduhclassificacao: 6, idempresa: 2, cduhclassificacao: 'CLASS-1', dsidentificador: 'Básico',     isativo: 1 },
    { iduhclassificacao: 7, idempresa: 3, cduhclassificacao: 'CLASS-1', dsidentificador: 'Resort',     isativo: 1 },
  ]);
}
