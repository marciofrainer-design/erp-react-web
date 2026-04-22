import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('andar', (table) => {
    table.increments('idandar').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.integer('idedificacao').references('idedificacao').inTable('edificacao').onDelete('SET NULL');
    table.string('cdandar', 20).notNullable();
    table.string('nmandar', 80).notNullable();
    table.integer('isativo').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('andar');
}
