import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('empresa', (table) => {
    table.increments('idempresa').primary();
    table.string('nmfantasia', 100).notNullable();
    table.string('dsabreviatura', 20).notNullable();
    table.string('cnpj', 18);
    table.integer('isativo').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('empresa');
}
