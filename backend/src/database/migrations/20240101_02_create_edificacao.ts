import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('edificacao', (table) => {
    table.increments('idedificacao').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.string('cdedificacao', 50).notNullable();
    table.string('nmedificacao', 100).notNullable();
    table.integer('isativo').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('edificacao');
}
