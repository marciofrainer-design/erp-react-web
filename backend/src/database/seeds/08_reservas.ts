import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('reservas').del();

  await knex('reservas').insert([
    {
      idreserva: 1, idempresa: 1, idhospede: 1, iduh: 3,
      nrreserva: 'RES-2024-001',
      dtentrada: '2024-06-01', dtsaida: '2024-06-05',
      nrpax: 2, vldiaria: 350.00, vltotal: 1400.00,
      idstatus: 2, dsobservacao: null, isativo: 1,
    },
    {
      idreserva: 2, idempresa: 1, idhospede: 2, iduh: 5,
      nrreserva: 'RES-2024-002',
      dtentrada: '2024-06-10', dtsaida: '2024-06-13',
      nrpax: 1, vldiaria: 500.00, vltotal: 1500.00,
      idstatus: 2, dsobservacao: 'Quarto com vista para o mar', isativo: 1,
    },
    {
      idreserva: 3, idempresa: 1, idhospede: 3, iduh: 7,
      nrreserva: 'RES-2024-003',
      dtentrada: '2024-07-01', dtsaida: '2024-07-07',
      nrpax: 2, vldiaria: 900.00, vltotal: 5400.00,
      idstatus: 2, dsobservacao: 'VIP - Hóspede frequente', isativo: 1,
    },
    {
      idreserva: 4, idempresa: 1, idhospede: 4, iduh: 1,
      nrreserva: 'RES-2024-004',
      dtentrada: '2024-06-15', dtsaida: '2024-06-18',
      nrpax: 1, vldiaria: 200.00, vltotal: 600.00,
      idstatus: 3, dsobservacao: 'Cancelada pelo hóspede', isativo: 1,
    },
    {
      idreserva: 5, idempresa: 1, idhospede: 5, iduh: 1,
      nrreserva: 'RES-2024-005',
      dtentrada: '2024-08-20', dtsaida: '2024-08-23',
      nrpax: 2, vldiaria: 200.00, vltotal: 600.00,
      idstatus: 2, dsobservacao: 'Quarto acessível solicitado', isativo: 1,
    },
    {
      idreserva: 6, idempresa: 1, idhospede: 10, iduh: 2,
      nrreserva: 'RES-2024-006',
      dtentrada: '2024-09-05', dtsaida: '2024-09-08',
      nrpax: 1, vldiaria: 200.00, vltotal: 600.00,
      idstatus: 1, dsobservacao: null, isativo: 1,
    },
    {
      idreserva: 7, idempresa: 2, idhospede: 6, iduh: 10,
      nrreserva: 'PSV-2024-001',
      dtentrada: '2024-07-10', dtsaida: '2024-07-15',
      nrpax: 2, vldiaria: 280.00, vltotal: 1400.00,
      idstatus: 2, dsobservacao: null, isativo: 1,
    },
    {
      idreserva: 8, idempresa: 2, idhospede: 7, iduh: 11,
      nrreserva: 'PSV-2024-002',
      dtentrada: '2024-07-20', dtsaida: '2024-07-25',
      nrpax: 2, vldiaria: 450.00, vltotal: 2250.00,
      idstatus: 1, dsobservacao: null, isativo: 1,
    },
    {
      idreserva: 9, idempresa: 3, idhospede: 8, iduh: 12,
      nrreserva: 'RPD-2024-001',
      dtentrada: '2024-08-01', dtsaida: '2024-08-10',
      nrpax: 2, vldiaria: 750.00, vltotal: 6750.00,
      idstatus: 2, dsobservacao: 'Pacote lua de mel', isativo: 1,
    },
    {
      idreserva: 10, idempresa: 3, idhospede: 9, iduh: 13,
      nrreserva: 'RPD-2024-002',
      dtentrada: '2024-09-15', dtsaida: '2024-09-22',
      nrpax: 4, vldiaria: 1200.00, vltotal: 8400.00,
      idstatus: 1, dsobservacao: 'Reserva para família', isativo: 1,
    },
  ]);
}
