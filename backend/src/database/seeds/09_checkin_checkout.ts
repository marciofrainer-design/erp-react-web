import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('checkin_checkout').del();

  await knex('checkin_checkout').insert([
    {
      idcheckin: 1, idempresa: 1,
      idreserva: 1, idhospede: 1, iduh: 3,
      dtcheckin: '2024-06-01 14:00:00',
      dtcheckout: '2024-06-05 11:30:00',
      nrpax: 2, vltotal: 1400.00,
      flsituacao: 2, dsobservacao: 'Checkout realizado sem pendências',
    },
    {
      idcheckin: 2, idempresa: 1,
      idreserva: 2, idhospede: 2, iduh: 5,
      dtcheckin: '2024-06-10 15:30:00',
      dtcheckout: '2024-06-13 12:00:00',
      nrpax: 1, vltotal: 1500.00,
      flsituacao: 2, dsobservacao: null,
    },
    {
      idcheckin: 3, idempresa: 1,
      idreserva: 3, idhospede: 3, iduh: 7,
      dtcheckin: '2024-07-01 14:00:00',
      dtcheckout: '2024-07-07 11:00:00',
      nrpax: 2, vltotal: 5400.00,
      flsituacao: 2, dsobservacao: 'Hóspede VIP - atendimento diferenciado',
    },
    {
      idcheckin: 4, idempresa: 1,
      idreserva: 5, idhospede: 5, iduh: 1,
      dtcheckin: '2024-08-20 13:00:00',
      dtcheckout: null,
      nrpax: 2, vltotal: 0.00,
      flsituacao: 1, dsobservacao: 'Hóspede em quarto acessível - check-in em andamento',
    },
    {
      idcheckin: 5, idempresa: 2,
      idreserva: 7, idhospede: 6, iduh: 10,
      dtcheckin: '2024-07-10 14:00:00',
      dtcheckout: '2024-07-15 11:00:00',
      nrpax: 2, vltotal: 1400.00,
      flsituacao: 2, dsobservacao: null,
    },
    {
      idcheckin: 6, idempresa: 3,
      idreserva: 9, idhospede: 8, iduh: 12,
      dtcheckin: '2024-08-01 15:00:00',
      dtcheckout: '2024-08-10 12:00:00',
      nrpax: 2, vltotal: 6750.00,
      flsituacao: 2, dsobservacao: 'Pacote lua de mel - serviço especial',
    },
  ]);
}
