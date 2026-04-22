import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('uhtipo', (table) => {
    table.increments('iduhtipo').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.string('cduhtipo', 20).notNullable();
    table.string('nmuhtipo', 80).notNullable();
    table.integer('flsituacao').notNullable().defaultTo(1);
    table.integer('isativo').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('uhtipo');
}
