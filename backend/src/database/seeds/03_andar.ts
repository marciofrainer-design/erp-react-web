import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('andar').del();

  await knex('andar').insert([
    { idandar: 1,  idempresa: 1, idedificacao: 1, cdandar: 'T',   nmandar: 'Térreo',   isativo: 1 },
    { idandar: 2,  idempresa: 1, idedificacao: 1, cdandar: '1',   nmandar: '1º Andar', isativo: 1 },
    { idandar: 3,  idempresa: 1, idedificacao: 1, cdandar: '2',   nmandar: '2º Andar', isativo: 1 },
    { idandar: 4,  idempresa: 1, idedificacao: 1, cdandar: '3',   nmandar: '3º Andar', isativo: 1 },
    { idandar: 5,  idempresa: 1, idedificacao: 2, cdandar: 'T',   nmandar: 'Térreo',   isativo: 1 },
    { idandar: 6,  idempresa: 1, idedificacao: 2, cdandar: '1',   nmandar: '1º Andar', isativo: 1 },
    { idandar: 7,  idempresa: 1, idedificacao: 3, cdandar: 'T',   nmandar: 'Térreo',   isativo: 1 },
    { idandar: 8,  idempresa: 2, idedificacao: 4, cdandar: 'T',   nmandar: 'Térreo',   isativo: 1 },
    { idandar: 9,  idempresa: 2, idedificacao: 4, cdandar: '1',   nmandar: '1º Andar', isativo: 1 },
    { idandar: 10, idempresa: 3, idedificacao: 5, cdandar: 'T',   nmandar: 'Térreo',   isativo: 1 },
  ]);
}
