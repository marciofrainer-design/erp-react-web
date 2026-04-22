import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('reservas', (table) => {
    table.increments('idreserva').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.integer('idhospede').notNullable().references('idhospede').inTable('hospedes').onDelete('RESTRICT');
    table.integer('iduh').notNullable().references('iduh').inTable('uh').onDelete('RESTRICT');
    table.string('nrreserva', 20).notNullable();
    table.string('dtentrada', 10).notNullable();
    table.string('dtsaida', 10).notNullable();
    table.integer('nrpax').notNullable().defaultTo(1);
    table.decimal('vldiaria', 10, 2).notNullable().defaultTo(0);
    table.decimal('vltotal', 10, 2).notNullable().defaultTo(0);
    // 1=Pendente, 2=Confirmada, 3=Cancelada, 4=No-show
    table.integer('idstatus').notNullable().defaultTo(1);
    table.text('dsobservacao');
    table.integer('isativo').notNullable().defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('reservas');
}
