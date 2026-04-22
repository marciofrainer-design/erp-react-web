import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('edificacao').del();

  await knex('edificacao').insert([
    { idedificacao: 1, idempresa: 1, cdedificacao: 'TORRE-A', nmedificacao: 'Torre A', isativo: 1 },
    { idedificacao: 2, idempresa: 1, cdedificacao: 'TORRE-B', nmedificacao: 'Torre B', isativo: 1 },
    { idedificacao: 3, idempresa: 1, cdedificacao: 'ANEXO',   nmedificacao: 'Anexo',   isativo: 1 },
    { idedificacao: 4, idempresa: 2, cdedificacao: 'PRINCIPAL', nmedificacao: 'Prédio Principal', isativo: 1 },
    { idedificacao: 5, idempresa: 3, cdedificacao: 'RESORT', nmedificacao: 'Bloco Resort', isativo: 1 },
  ]);
}
