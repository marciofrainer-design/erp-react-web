import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('caracteristica', (table) => {
    table.increments('idcaracteristica').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.integer('idcaracteristica_emp').notNullable();
    table.string('nmcaracteristica', 80).notNullable();
    table.string('dscaracteristica', 200);
    table.integer('isativo').notNullable().defaultTo(1);
  });

  await knex.schema.createTable('uh_caracteristica', (table) => {
    table.increments('id').primary();
    table.integer('iduh').notNullable().references('iduh').inTable('uh').onDelete('CASCADE');
    table.integer('idcaracteristica').notNullable().references('idcaracteristica').inTable('caracteristica').onDelete('CASCADE');
    table.integer('idcaracteristica_emp').notNullable();
    table.integer('isprincipal').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('uh_caracteristica');
  await knex.schema.dropTableIfExists('caracteristica');
}
