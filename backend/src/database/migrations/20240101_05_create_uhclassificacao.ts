import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('uhclassificacao', (table) => {
    table.increments('iduhclassificacao').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.string('cduhclassificacao', 20).notNullable();
    table.string('dsidentificador', 80).notNullable();
    table.integer('isativo').notNullable().defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('uhclassificacao');
}
