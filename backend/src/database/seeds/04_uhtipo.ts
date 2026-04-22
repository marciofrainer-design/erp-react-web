import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('uhtipo').del();

  await knex('uhtipo').insert([
    { iduhtipo: 1, idempresa: 1, cduhtipo: 'STD',    nmuhtipo: 'Standard',    flsituacao: 1, isativo: 1 },
    { iduhtipo: 2, idempresa: 1, cduhtipo: 'SUP',    nmuhtipo: 'Superior',    flsituacao: 1, isativo: 1 },
    { iduhtipo: 3, idempresa: 1, cduhtipo: 'LUX',    nmuhtipo: 'Luxo',        flsituacao: 1, isativo: 1 },
    { iduhtipo: 4, idempresa: 1, cduhtipo: 'MST',    nmuhtipo: 'Master',      flsituacao: 1, isativo: 1 },
    { iduhtipo: 5, idempresa: 1, cduhtipo: 'STE',    nmuhtipo: 'Suite',       flsituacao: 1, isativo: 1 },
    { iduhtipo: 6, idempresa: 2, cduhtipo: 'STD',    nmuhtipo: 'Standard',    flsituacao: 1, isativo: 1 },
    { iduhtipo: 7, idempresa: 2, cduhtipo: 'STE',    nmuhtipo: 'Suite',       flsituacao: 1, isativo: 1 },
    { iduhtipo: 8, idempresa: 3, cduhtipo: 'CAB',    nmuhtipo: 'Cabana',      flsituacao: 1, isativo: 1 },
    { iduhtipo: 9, idempresa: 3, cduhtipo: 'VIL',    nmuhtipo: 'Vila',        flsituacao: 1, isativo: 1 },
  ]);
}
