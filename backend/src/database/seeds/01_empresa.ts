import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('empresa').del();

  await knex('empresa').insert([
    { idempresa: 1, nmfantasia: 'Hotel Grand Palace', dsabreviatura: 'HGP', cnpj: '12.345.678/0001-90', isativo: 1 },
    { idempresa: 2, nmfantasia: 'Pousada Serra Verde', dsabreviatura: 'PSV', cnpj: '98.765.432/0001-10', isativo: 1 },
    { idempresa: 3, nmfantasia: 'Resort Praia Dourada', dsabreviatura: 'RPD', cnpj: '45.678.901/0001-23', isativo: 1 },
  ]);
}
