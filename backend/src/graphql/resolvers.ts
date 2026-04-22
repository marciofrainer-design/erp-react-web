import { GraphQLScalarType, Kind } from 'graphql';
import { db } from '../database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
  }
  console.warn('⚠️  JWT_SECRET not set — using insecure default. Set JWT_SECRET in .env before going to production.');
}

const EFFECTIVE_JWT_SECRET = JWT_SECRET ?? 'hotel_erp_secret_key_change_in_production';

/** Timestamp no formato SQLite: "YYYY-MM-DD HH:MM:SS" */
function nowSqlite(): string {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

// ─────────────────────────────────────────────
// Scalar JSON
// ─────────────────────────────────────────────

const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'Tipo JSON genérico',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) return JSON.parse(ast.value);
    return null;
  },
});

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function paginate<T>(items: T[], page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  return {
    total: items.length,
    page,
    limit,
    items: items.slice(offset, offset + limit),
  };
}

const STATUS_RESERVA: Record<number, string> = {
  1: 'Pendente',
  2: 'Confirmada',
  3: 'Cancelada',
  4: 'No-show',
};

const SITUACAO_CHECKIN: Record<number, string> = {
  1: 'Checked-in',
  2: 'Checked-out',
};

// ─────────────────────────────────────────────
// Resolvers
// ─────────────────────────────────────────────

export const resolvers = {
  JSON: JSONScalar,

  // ─────────────────────────────────────────────
  // Queries
  // ─────────────────────────────────────────────
  Query: {
    // ── Empresa ──────────────────────────────────
    empresas: async (_: unknown, { page = 1, limit = 20, search }: { page?: number; limit?: number; search?: string }) => {
      let query = db('empresa').select('*');
      if (search) {
        query = query.whereILike('nmfantasia', `%${search}%`);
      }
      const items = await query.orderBy('idempresa');
      return paginate(items, page, limit);
    },

    empresa: async (_: unknown, { idempresa }: { idempresa: number }) => {
      return db('empresa').where({ idempresa }).first();
    },

    // ── Edificacao ───────────────────────────────
    edificacoes: async (_: unknown, { idempresa, page = 1, limit = 20, search }: { idempresa?: number; page?: number; limit?: number; search?: string }) => {
      let query = db('edificacao as e')
        .join('empresa as emp', 'e.idempresa', 'emp.idempresa')
        .select('e.*', 'emp.dsabreviatura as empresa_dsabreviatura');
      if (idempresa) query = query.where('e.idempresa', idempresa);
      if (search) query = query.whereILike('e.nmedificacao', `%${search}%`);
      const items = await query.orderBy('e.idedificacao');
      return paginate(items, page, limit);
    },

    edificacao: async (_: unknown, { idedificacao }: { idedificacao: number }) => {
      return db('edificacao as e')
        .join('empresa as emp', 'e.idempresa', 'emp.idempresa')
        .select('e.*', 'emp.dsabreviatura as empresa_dsabreviatura')
        .where('e.idedificacao', idedificacao)
        .first();
    },

    // ── Andar ────────────────────────────────────
    andares: async (_: unknown, { idempresa, page = 1, limit = 20, search }: { idempresa?: number; page?: number; limit?: number; search?: string }) => {
      let query = db('andar as a')
        .join('empresa as emp', 'a.idempresa', 'emp.idempresa')
        .select('a.*', 'emp.dsabreviatura as empresa_dsabreviatura');
      if (idempresa) query = query.where('a.idempresa', idempresa);
      if (search) query = query.whereILike('a.nmandar', `%${search}%`);
      const items = await query.orderBy('a.idandar');
      return paginate(items, page, limit);
    },

    andar: async (_: unknown, { idandar }: { idandar: number }) => {
      return db('andar as a')
        .join('empresa as emp', 'a.idempresa', 'emp.idempresa')
        .select('a.*', 'emp.dsabreviatura as empresa_dsabreviatura')
        .where('a.idandar', idandar)
        .first();
    },

    // ── UH Tipo ──────────────────────────────────
    uhtipos: async (_: unknown, { idempresa, isativo }: { idempresa?: number; isativo?: number }) => {
      let query = db('uhtipo').select('*');
      if (idempresa) query = query.where({ idempresa });
      if (isativo !== undefined) query = query.where({ isativo });
      return query.orderBy('iduhtipo');
    },

    uhtipo: async (_: unknown, { iduhtipo }: { iduhtipo: number }) => {
      return db('uhtipo').where({ iduhtipo }).first();
    },

    // ── UH Classificacao ─────────────────────────
    uhclassificacoes: async (_: unknown, { idempresa, page = 1, limit = 20 }: { idempresa?: number; page?: number; limit?: number }) => {
      let query = db('uhclassificacao').select('*');
      if (idempresa) query = query.where({ idempresa });
      const items = await query.orderBy('iduhclassificacao');
      return paginate(items, page, limit);
    },

    uhclassificacao: async (_: unknown, { iduhclassificacao }: { iduhclassificacao: number }) => {
      return db('uhclassificacao').where({ iduhclassificacao }).first();
    },

    // ── UH ───────────────────────────────────────
    uhs: async (_: unknown, { idempresa, page = 1, limit = 20, search }: { idempresa?: number; page?: number; limit?: number; search?: string }) => {
      let query = db('uh as u')
        .leftJoin('empresa as emp', 'u.idempresa', 'emp.idempresa')
        .leftJoin('uhtipo as t', 'u.iduhtipo', 't.iduhtipo')
        .leftJoin('andar as a', 'u.idandar', 'a.idandar')
        .leftJoin('edificacao as e', 'u.idedificacao', 'e.idedificacao')
        .select(
          'u.*',
          'emp.dsabreviatura as empresa_dsabreviatura',
          't.nmuhtipo',
          'a.nmandar',
          'e.nmedificacao',
        );
      if (idempresa) query = query.where('u.idempresa', idempresa);
      if (search) {
        query = query.where((b) =>
          b.whereILike('u.cduh', `%${search}%`).orWhereILike('u.dsuh', `%${search}%`)
        );
      }
      const items = await query.orderBy('u.iduh');
      return paginate(items, page, limit);
    },

    uh: async (_: unknown, { iduh }: { iduh: number }) => {
      return db('uh as u')
        .leftJoin('empresa as emp', 'u.idempresa', 'emp.idempresa')
        .leftJoin('uhtipo as t', 'u.iduhtipo', 't.iduhtipo')
        .leftJoin('andar as a', 'u.idandar', 'a.idandar')
        .leftJoin('edificacao as e', 'u.idedificacao', 'e.idedificacao')
        .select(
          'u.*',
          'emp.dsabreviatura as empresa_dsabreviatura',
          't.nmuhtipo',
          'a.nmandar',
          'e.nmedificacao',
        )
        .where('u.iduh', iduh)
        .first();
    },

    // ── Hospedes ─────────────────────────────────
    hospedes: async (_: unknown, { idempresa, page = 1, limit = 20, search, isativo }: { idempresa?: number; page?: number; limit?: number; search?: string; isativo?: number }) => {
      let query = db('hospedes as h')
        .leftJoin('empresa as emp', 'h.idempresa', 'emp.idempresa')
        .select('h.*', 'emp.dsabreviatura as empresa_dsabreviatura');
      if (idempresa) query = query.where('h.idempresa', idempresa);
      if (isativo !== undefined) query = query.where('h.isativo', isativo);
      if (search) {
        query = query.where((b) =>
          b
            .whereILike('h.nmhospede', `%${search}%`)
            .orWhereILike('h.cpf_cnpj', `%${search}%`)
            .orWhereILike('h.email', `%${search}%`)
        );
      }
      const items = await query.orderBy('h.nmhospede');
      return paginate(items, page, limit);
    },

    hospede: async (_: unknown, { idhospede }: { idhospede: number }) => {
      return db('hospedes as h')
        .leftJoin('empresa as emp', 'h.idempresa', 'emp.idempresa')
        .select('h.*', 'emp.dsabreviatura as empresa_dsabreviatura')
        .where('h.idhospede', idhospede)
        .first();
    },

    // ── Reservas ─────────────────────────────────
    reservas: async (_: unknown, { idempresa, page = 1, limit = 20, search, idstatus, isativo }: { idempresa?: number; page?: number; limit?: number; search?: string; idstatus?: number; isativo?: number }) => {
      let query = db('reservas as r')
        .leftJoin('empresa as emp', 'r.idempresa', 'emp.idempresa')
        .leftJoin('hospedes as h', 'r.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'r.iduh', 'u.iduh')
        .select('r.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'h.nmhospede', 'u.cduh', 'u.dsuh');
      if (idempresa) query = query.where('r.idempresa', idempresa);
      if (idstatus !== undefined) query = query.where('r.idstatus', idstatus);
      if (isativo !== undefined) query = query.where('r.isativo', isativo);
      if (search) {
        query = query.where((b) =>
          b
            .whereILike('r.nrreserva', `%${search}%`)
            .orWhereILike('h.nmhospede', `%${search}%`)
            .orWhereILike('u.cduh', `%${search}%`)
        );
      }
      const items = await query.orderBy('r.idreserva', 'desc');
      return paginate(items.map((r) => ({ ...r, nmstatus: STATUS_RESERVA[r.idstatus] ?? 'Desconhecido' })), page, limit);
    },

    reserva: async (_: unknown, { idreserva }: { idreserva: number }) => {
      const row = await db('reservas as r')
        .leftJoin('empresa as emp', 'r.idempresa', 'emp.idempresa')
        .leftJoin('hospedes as h', 'r.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'r.iduh', 'u.iduh')
        .select('r.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('r.idreserva', idreserva)
        .first();
      if (!row) return null;
      return { ...row, nmstatus: STATUS_RESERVA[row.idstatus] ?? 'Desconhecido' };
    },

    reservasPorHospede: async (_: unknown, { idhospede, idempresa }: { idhospede: number; idempresa?: number }) => {
      let query = db('reservas as r')
        .leftJoin('empresa as emp', 'r.idempresa', 'emp.idempresa')
        .leftJoin('uh as u', 'r.iduh', 'u.iduh')
        .select('r.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'u.cduh', 'u.dsuh')
        .where('r.idhospede', idhospede);
      if (idempresa) query = query.where('r.idempresa', idempresa);
      const rows = await query.orderBy('r.dtentrada', 'desc');
      return rows.map((r) => ({ ...r, nmstatus: STATUS_RESERVA[r.idstatus] ?? 'Desconhecido' }));
    },

    reservasPorUh: async (_: unknown, { iduh, idempresa }: { iduh: number; idempresa?: number }) => {
      let query = db('reservas as r')
        .leftJoin('hospedes as h', 'r.idhospede', 'h.idhospede')
        .select('r.*', 'h.nmhospede')
        .where('r.iduh', iduh);
      if (idempresa) query = query.where('r.idempresa', idempresa);
      const rows = await query.orderBy('r.dtentrada', 'desc');
      return rows.map((r) => ({ ...r, nmstatus: STATUS_RESERVA[r.idstatus] ?? 'Desconhecido' }));
    },

    // ── Checkin / Checkout ────────────────────────
    checkinsAtivos: async (_: unknown, { idempresa, page = 1, limit = 20 }: { idempresa?: number; page?: number; limit?: number }) => {
      let query = db('checkin_checkout as c')
        .leftJoin('empresa as emp', 'c.idempresa', 'emp.idempresa')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('c.flsituacao', 1); // apenas checked-in
      if (idempresa) query = query.where('c.idempresa', idempresa);
      const items = await query.orderBy('c.dtcheckin', 'desc');
      return paginate(items.map((c) => ({ ...c, nrsituacao: SITUACAO_CHECKIN[c.flsituacao] })), page, limit);
    },

    checkinsHistorico: async (_: unknown, { idempresa, page = 1, limit = 20 }: { idempresa?: number; page?: number; limit?: number }) => {
      let query = db('checkin_checkout as c')
        .leftJoin('empresa as emp', 'c.idempresa', 'emp.idempresa')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'h.nmhospede', 'u.cduh', 'u.dsuh');
      if (idempresa) query = query.where('c.idempresa', idempresa);
      const items = await query.orderBy('c.dtcheckin', 'desc');
      return paginate(items.map((c) => ({ ...c, nrsituacao: SITUACAO_CHECKIN[c.flsituacao] })), page, limit);
    },

    checkin: async (_: unknown, { idcheckin }: { idcheckin: number }) => {
      const row = await db('checkin_checkout as c')
        .leftJoin('empresa as emp', 'c.idempresa', 'emp.idempresa')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'emp.dsabreviatura as empresa_dsabreviatura', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('c.idcheckin', idcheckin)
        .first();
      if (!row) return null;
      return { ...row, nrsituacao: SITUACAO_CHECKIN[row.flsituacao] };
    },

    checkinPorReserva: async (_: unknown, { idreserva }: { idreserva: number }) => {
      const row = await db('checkin_checkout as c')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('c.idreserva', idreserva)
        .first();
      if (!row) return null;
      return { ...row, nrsituacao: SITUACAO_CHECKIN[row.flsituacao] };
    },

    checkinPorHospede: async (_: unknown, { idhospede, idempresa }: { idhospede: number; idempresa?: number }) => {
      let query = db('checkin_checkout as c')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'u.cduh', 'u.dsuh')
        .where('c.idhospede', idhospede);
      if (idempresa) query = query.where('c.idempresa', idempresa);
      const rows = await query.orderBy('c.dtcheckin', 'desc');
      return rows.map((c) => ({ ...c, nrsituacao: SITUACAO_CHECKIN[c.flsituacao] }));
    },

    checkinPorUh: async (_: unknown, { iduh }: { iduh: number }) => {
      const row = await db('checkin_checkout as c')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .select('c.*', 'h.nmhospede')
        .where({ 'c.iduh': iduh, 'c.flsituacao': 1 })
        .first();
      if (!row) return null;
      return { ...row, nrsituacao: SITUACAO_CHECKIN[row.flsituacao] };
    },
  },

  // ─────────────────────────────────────────────
  // Mutations
  // ─────────────────────────────────────────────
  Mutation: {
    // ── Autenticacao ─────────────────────────────
    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Mock authentication is not available in production. Configure a real user store.');
      }
      // Mock de autenticação — substitua por consulta à tabela de usuários em produção
      const MOCK_USERS = [
        { id: 1, name: 'Administrador', email: 'admin@hotel.com', passwordHash: bcrypt.hashSync('admin123', 10) },
      ];
      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) throw new Error('Credenciais inválidas');

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new Error('Credenciais inválidas');

      const token = jwt.sign({ id: user.id, email: user.email }, EFFECTIVE_JWT_SECRET, { expiresIn: '8h' });
      return { token, user: { id: user.id, name: user.name, email: user.email } };
    },

    // ── Empresa ──────────────────────────────────
    criarEmpresa: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [idempresa] = await db('empresa').insert(input);
      return db('empresa').where({ idempresa }).first();
    },

    atualizarEmpresa: async (_: unknown, { idempresa, input }: { idempresa: number; input: Record<string, unknown> }) => {
      await db('empresa').where({ idempresa }).update(input);
      return db('empresa').where({ idempresa }).first();
    },

    excluirEmpresa: async (_: unknown, { idempresa }: { idempresa: number }) => {
      const deleted = await db('empresa').where({ idempresa }).delete();
      return deleted > 0;
    },

    // ── Edificacao ───────────────────────────────
    criarEdificacao: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [idedificacao] = await db('edificacao').insert(input);
      return db('edificacao').where({ idedificacao }).first();
    },

    atualizarEdificacao: async (_: unknown, { idedificacao, input }: { idedificacao: number; input: Record<string, unknown> }) => {
      await db('edificacao').where({ idedificacao }).update(input);
      return db('edificacao').where({ idedificacao }).first();
    },

    excluirEdificacao: async (_: unknown, { idedificacao }: { idedificacao: number }) => {
      const deleted = await db('edificacao').where({ idedificacao }).delete();
      return deleted > 0;
    },

    // ── Andar ────────────────────────────────────
    criarAndar: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [idandar] = await db('andar').insert(input);
      return db('andar').where({ idandar }).first();
    },

    atualizarAndar: async (_: unknown, { idandar, input }: { idandar: number; input: Record<string, unknown> }) => {
      await db('andar').where({ idandar }).update(input);
      return db('andar').where({ idandar }).first();
    },

    excluirAndar: async (_: unknown, { idandar }: { idandar: number }) => {
      const deleted = await db('andar').where({ idandar }).delete();
      return deleted > 0;
    },

    // ── UH Classificacao ─────────────────────────
    criarUhClassificacao: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [iduhclassificacao] = await db('uhclassificacao').insert(input);
      return db('uhclassificacao').where({ iduhclassificacao }).first();
    },

    atualizarUhClassificacao: async (_: unknown, { iduhclassificacao, input }: { iduhclassificacao: number; input: Record<string, unknown> }) => {
      await db('uhclassificacao').where({ iduhclassificacao }).update(input);
      return db('uhclassificacao').where({ iduhclassificacao }).first();
    },

    excluirUhClassificacao: async (_: unknown, { iduhclassificacao }: { iduhclassificacao: number }) => {
      const deleted = await db('uhclassificacao').where({ iduhclassificacao }).delete();
      return deleted > 0;
    },

    // ── UH ───────────────────────────────────────
    criarUh: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [iduh] = await db('uh').insert(input);
      return db('uh').where({ iduh }).first();
    },

    atualizarUh: async (_: unknown, { iduh, input }: { iduh: number; input: Record<string, unknown> }) => {
      await db('uh').where({ iduh }).update(input);
      return db('uh').where({ iduh }).first();
    },

    excluirUh: async (_: unknown, { iduh }: { iduh: number }) => {
      const deleted = await db('uh').where({ iduh }).delete();
      return deleted > 0;
    },

    // ── Hospedes ─────────────────────────────────
    criarHospede: async (_: unknown, { input }: { input: Record<string, unknown> }) => {
      const [idhospede] = await db('hospedes').insert(input);
      return db('hospedes').where({ idhospede }).first();
    },

    atualizarHospede: async (_: unknown, { idhospede, input }: { idhospede: number; input: Record<string, unknown> }) => {
      await db('hospedes').where({ idhospede }).update({ ...input, updated_at: nowSqlite() });
      return db('hospedes').where({ idhospede }).first();
    },

    excluirHospede: async (_: unknown, { idhospede }: { idhospede: number }) => {
      const deleted = await db('hospedes').where({ idhospede }).delete();
      return deleted > 0;
    },

    // ── Reservas ─────────────────────────────────
    criarReserva: async (_: unknown, { input }: { input: Record<string, unknown> & { idempresa: number } }) => {
      // Gera número de reserva automático se não fornecido
      if (!input.nrreserva) {
        const countRow = await db('reservas').where({ idempresa: input.idempresa }).count('idreserva as total').first() as { total: number | string };
        const total = Number(countRow.total) || 0;
        input.nrreserva = `RES-${input.idempresa}-${String(total + 1).padStart(4, '0')}`;
      }
      if (!input.idstatus) input.idstatus = 1; // Pendente
      const [idreserva] = await db('reservas').insert(input);
      const row = await db('reservas as r')
        .leftJoin('hospedes as h', 'r.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'r.iduh', 'u.iduh')
        .select('r.*', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('r.idreserva', idreserva)
        .first();
      return { ...row, nmstatus: STATUS_RESERVA[row.idstatus] ?? 'Desconhecido' };
    },

    atualizarReserva: async (_: unknown, { idreserva, input }: { idreserva: number; input: Record<string, unknown> }) => {
      await db('reservas').where({ idreserva }).update({ ...input, updated_at: nowSqlite() });
      const row = await db('reservas as r')
        .leftJoin('hospedes as h', 'r.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'r.iduh', 'u.iduh')
        .select('r.*', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('r.idreserva', idreserva)
        .first();
      return { ...row, nmstatus: STATUS_RESERVA[row.idstatus] ?? 'Desconhecido' };
    },

    cancelarReserva: async (_: unknown, { idreserva, motivo }: { idreserva: number; motivo?: string }) => {
      await db('reservas').where({ idreserva }).update({
        idstatus: 3, // Cancelada
        dsobservacao: motivo ?? null,
        updated_at: nowSqlite(),
      });
      const row = await db('reservas').where({ idreserva }).first();
      return { ...row, nmstatus: STATUS_RESERVA[row.idstatus] ?? 'Desconhecido' };
    },

    excluirReserva: async (_: unknown, { idreserva }: { idreserva: number }) => {
      const deleted = await db('reservas').where({ idreserva }).delete();
      return deleted > 0;
    },

    // ── Checkin / Checkout ────────────────────────
    realizarCheckin: async (_: unknown, { input }: { input: Record<string, unknown> & { iduh: number; idhospede: number } }) => {
      // Verifica se a UH não está ocupada
      const uhOcupada = await db('checkin_checkout')
        .where({ iduh: input.iduh, flsituacao: 1 })
        .first();
      if (uhOcupada) {
        throw new Error(`UH ${input.iduh} já está ocupada. Realize o checkout antes de fazer um novo checkin.`);
      }

      const [idcheckin] = await db('checkin_checkout').insert({
        ...input,
        dtcheckin: input.dtcheckin ?? nowSqlite(),
        flsituacao: 1, // Checked-in
        vltotal: input.vltotal ?? 0,
        nrpax: input.nrpax ?? 1,
      });

      // Atualiza status da reserva para confirmada se vinculada
      if (input.idreserva) {
        await db('reservas').where({ idreserva: input.idreserva }).update({ idstatus: 2 });
      }

      const row = await db('checkin_checkout as c')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('c.idcheckin', idcheckin)
        .first();
      return { ...row, nrsituacao: SITUACAO_CHECKIN[row.flsituacao] };
    },

    realizarCheckout: async (_: unknown, { input }: { input: { idcheckin: number; dtcheckout: string; vltotal: number; dsobservacao?: string } }) => {
      const checkin = await db('checkin_checkout').where({ idcheckin: input.idcheckin }).first();
      if (!checkin) throw new Error(`Checkin ${input.idcheckin} não encontrado`);
      if (checkin.flsituacao === 2) throw new Error(`Checkin ${input.idcheckin} já foi finalizado (checkout realizado)`);

      await db('checkin_checkout').where({ idcheckin: input.idcheckin }).update({
        dtcheckout: input.dtcheckout,
        vltotal: input.vltotal,
        flsituacao: 2, // Checked-out
        dsobservacao: input.dsobservacao ?? checkin.dsobservacao,
        updated_at: nowSqlite(),
      });

      const row = await db('checkin_checkout as c')
        .leftJoin('hospedes as h', 'c.idhospede', 'h.idhospede')
        .leftJoin('uh as u', 'c.iduh', 'u.iduh')
        .select('c.*', 'h.nmhospede', 'u.cduh', 'u.dsuh')
        .where('c.idcheckin', input.idcheckin)
        .first();
      return { ...row, nrsituacao: SITUACAO_CHECKIN[row.flsituacao] };
    },

    excluirCheckin: async (_: unknown, { idcheckin }: { idcheckin: number }) => {
      const deleted = await db('checkin_checkout').where({ idcheckin }).delete();
      return deleted > 0;
    },
  },
};
