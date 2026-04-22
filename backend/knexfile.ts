import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src/database/hotel.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src/database/migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.resolve(__dirname, 'src/database/seeds'),
      extension: 'ts',
    },
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src/database/hotel.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src/database/seeds'),
    },
  },
};

module.exports = config;
