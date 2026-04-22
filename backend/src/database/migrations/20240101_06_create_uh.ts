import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('uh', (table) => {
    table.increments('iduh').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.integer('idedificacao').references('idedificacao').inTable('edificacao').onDelete('SET NULL');
    table.integer('idandar').references('idandar').inTable('andar').onDelete('SET NULL');
    table.integer('iduhtipo').references('iduhtipo').inTable('uhtipo').onDelete('SET NULL');
    table.integer('iduhtipo_emp').references('iduhtipo').inTable('uhtipo').onDelete('SET NULL');
    table.integer('iduhclassificacao').references('iduhclassificacao').inTable('uhclassificacao').onDelete('SET NULL');
    table.string('cduh', 20).notNullable();
    table.string('dsuh', 100).notNullable();
    table.integer('qtquarto').notNullable().defaultTo(1);
    table.integer('flestoque').notNullable().defaultTo(0);
    table.integer('ispaxadicional').notNullable().defaultTo(0);
    table.integer('isconjugada').notNullable().defaultTo(0);
    table.integer('isacessibilidade').notNullable().defaultTo(0);
    table.integer('isativo').notNullable().defaultTo(1);
    table.string('dsidentificador', 80);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('uh');
}
