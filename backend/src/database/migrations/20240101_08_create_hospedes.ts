import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hospedes', (table) => {
    table.increments('idhospede').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.string('nmhospede', 100).notNullable();
    table.string('cpf_cnpj', 18);
    table.string('email', 100);
    table.string('telefone', 20);
    table.string('dtnascimento', 10);
    table.string('dsnacionalidade', 60).defaultTo('Brasileira');
    table.text('dsobservacao');
    table.integer('isativo').notNullable().defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('hospedes');
}
