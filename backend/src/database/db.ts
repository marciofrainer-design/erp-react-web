import knex from 'knex';
import path from 'path';

const DB_FILENAME = process.env.DB_FILENAME || path.resolve(__dirname, 'hotel.sqlite3');

export const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: DB_FILENAME,
  },
  useNullAsDefault: true,
});
