import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('checkin_checkout', (table) => {
    table.increments('idcheckin').primary();
    table.integer('idempresa').notNullable().references('idempresa').inTable('empresa').onDelete('CASCADE');
    table.integer('idreserva').references('idreserva').inTable('reservas').onDelete('SET NULL');
    table.integer('idhospede').notNullable().references('idhospede').inTable('hospedes').onDelete('RESTRICT');
    table.integer('iduh').notNullable().references('iduh').inTable('uh').onDelete('RESTRICT');
    table.string('dtcheckin', 19).notNullable();
    table.string('dtcheckout', 19);
    table.integer('nrpax').notNullable().defaultTo(1);
    table.decimal('vltotal', 10, 2).notNullable().defaultTo(0);
    // 1=Checked-in, 2=Checked-out
    table.integer('flsituacao').notNullable().defaultTo(1);
    table.text('dsobservacao');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('checkin_checkout');
}
