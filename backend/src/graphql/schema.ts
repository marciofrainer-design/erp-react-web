export const typeDefs = `#graphql
  # ─────────────────────────────────────────────
  # Tipos base
  # ─────────────────────────────────────────────

  type PaginatedResult {
    total: Int!
    page: Int!
    limit: Int!
    items: [JSON]
  }

  scalar JSON

  # ─────────────────────────────────────────────
  # Empresa
  # ─────────────────────────────────────────────

  type Empresa {
    idempresa: Int!
    nmfantasia: String!
    dsabreviatura: String!
    cnpj: String
    isativo: Int!
  }

  input EmpresaInput {
    nmfantasia: String!
    dsabreviatura: String!
    cnpj: String
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # Edificacao
  # ─────────────────────────────────────────────

  type Edificacao {
    idedificacao: Int!
    idempresa: Int!
    cdedificacao: String!
    nmedificacao: String!
    isativo: Int!
    empresa_dsabreviatura: String
  }

  input EdificacaoInput {
    idempresa: Int!
    cdedificacao: String!
    nmedificacao: String!
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # Andar
  # ─────────────────────────────────────────────

  type Andar {
    idandar: Int!
    idempresa: Int!
    idedificacao: Int
    cdandar: String!
    nmandar: String!
    isativo: Int!
    empresa_dsabreviatura: String
  }

  input AndarInput {
    idempresa: Int!
    idedificacao: Int
    cdandar: String!
    nmandar: String!
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # UH Tipo
  # ─────────────────────────────────────────────

  type UhTipo {
    iduhtipo: Int!
    idempresa: Int!
    cduhtipo: String!
    nmuhtipo: String!
    flsituacao: Int!
    isativo: Int!
  }

  # ─────────────────────────────────────────────
  # UH Classificacao
  # ─────────────────────────────────────────────

  type UhClassificacao {
    iduhclassificacao: Int!
    idempresa: Int!
    cduhclassificacao: String!
    dsidentificador: String!
    isativo: Int!
  }

  input UhClassificacaoInput {
    idempresa: Int!
    cduhclassificacao: String!
    dsidentificador: String!
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # UH (Unidade Habitacional)
  # ─────────────────────────────────────────────

  type Uh {
    iduh: Int!
    idempresa: Int!
    idedificacao: Int
    idandar: Int
    iduhtipo: Int
    iduhtipo_emp: Int
    iduhclassificacao: Int
    cduh: String!
    dsuh: String!
    qtquarto: Int!
    flestoque: Int!
    ispaxadicional: Int!
    isconjugada: Int!
    isacessibilidade: Int!
    isativo: Int!
    dsidentificador: String
    empresa_dsabreviatura: String
    nmuhtipo: String
    nmandar: String
    nmedificacao: String
  }

  input UhInput {
    idempresa: Int!
    idedificacao: Int
    idandar: Int
    iduhtipo: Int
    iduhtipo_emp: Int
    iduhclassificacao: Int
    cduh: String!
    dsuh: String!
    qtquarto: Int
    flestoque: Int
    ispaxadicional: Int
    isconjugada: Int
    isacessibilidade: Int
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # Hospedes
  # ─────────────────────────────────────────────

  type Hospede {
    idhospede: Int!
    idempresa: Int!
    nmhospede: String!
    cpf_cnpj: String
    email: String
    telefone: String
    dtnascimento: String
    dsnacionalidade: String
    dsobservacao: String
    isativo: Int!
    empresa_dsabreviatura: String
  }

  input HospedeInput {
    idempresa: Int!
    nmhospede: String!
    cpf_cnpj: String
    email: String
    telefone: String
    dtnascimento: String
    dsnacionalidade: String
    dsobservacao: String
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # Reservas
  # ─────────────────────────────────────────────

  type Reserva {
    idreserva: Int!
    idempresa: Int!
    idhospede: Int!
    iduh: Int!
    nrreserva: String!
    dtentrada: String!
    dtsaida: String!
    nrpax: Int!
    vldiaria: Float!
    vltotal: Float!
    idstatus: Int!
    dsobservacao: String
    isativo: Int!
    empresa_dsabreviatura: String
    nmhospede: String
    cduh: String
    dsuh: String
    nmstatus: String
  }

  input ReservaInput {
    idempresa: Int!
    idhospede: Int!
    iduh: Int!
    nrreserva: String
    dtentrada: String!
    dtsaida: String!
    nrpax: Int
    vldiaria: Float
    vltotal: Float
    idstatus: Int
    dsobservacao: String
    isativo: Int
  }

  # ─────────────────────────────────────────────
  # Checkin / Checkout
  # ─────────────────────────────────────────────

  type CheckinCheckout {
    idcheckin: Int!
    idempresa: Int!
    idreserva: Int
    idhospede: Int!
    iduh: Int!
    dtcheckin: String!
    dtcheckout: String
    nrpax: Int!
    vltotal: Float!
    flsituacao: Int!
    dsobservacao: String
    empresa_dsabreviatura: String
    nmhospede: String
    cduh: String
    dsuh: String
    nrsituacao: String
  }

  input CheckinInput {
    idempresa: Int!
    idreserva: Int
    idhospede: Int!
    iduh: Int!
    dtcheckin: String!
    nrpax: Int
    vltotal: Float
    dsobservacao: String
  }

  input CheckoutInput {
    idcheckin: Int!
    dtcheckout: String!
    vltotal: Float!
    dsobservacao: String
  }

  # ─────────────────────────────────────────────
  # Autenticação
  # ─────────────────────────────────────────────

  type AuthPayload {
    token: String!
    user: AuthUser!
  }

  type AuthUser {
    id: Int!
    name: String!
    email: String!
  }

  # ─────────────────────────────────────────────
  # Queries
  # ─────────────────────────────────────────────

  type Query {
    # Empresa
    empresas(page: Int, limit: Int, search: String): PaginatedResult!
    empresa(idempresa: Int!): Empresa

    # Edificacao
    edificacoes(idempresa: Int, page: Int, limit: Int, search: String): PaginatedResult!
    edificacao(idedificacao: Int!): Edificacao

    # Andar
    andares(idempresa: Int, page: Int, limit: Int, search: String): PaginatedResult!
    andar(idandar: Int!): Andar

    # UH Tipo
    uhtipos(idempresa: Int, isativo: Int): [UhTipo!]!
    uhtipo(iduhtipo: Int!): UhTipo

    # UH Classificacao
    uhclassificacoes(idempresa: Int, page: Int, limit: Int): PaginatedResult!
    uhclassificacao(iduhclassificacao: Int!): UhClassificacao

    # UH
    uhs(idempresa: Int, page: Int, limit: Int, search: String): PaginatedResult!
    uh(iduh: Int!): Uh

    # Hospedes
    hospedes(idempresa: Int, page: Int, limit: Int, search: String, isativo: Int): PaginatedResult!
    hospede(idhospede: Int!): Hospede

    # Reservas
    reservas(idempresa: Int, page: Int, limit: Int, search: String, idstatus: Int, isativo: Int): PaginatedResult!
    reserva(idreserva: Int!): Reserva
    reservasPorHospede(idhospede: Int!, idempresa: Int): [Reserva!]!
    reservasPorUh(iduh: Int!, idempresa: Int): [Reserva!]!

    # Checkin / Checkout
    checkinsAtivos(idempresa: Int, page: Int, limit: Int): PaginatedResult!
    checkinsHistorico(idempresa: Int, page: Int, limit: Int): PaginatedResult!
    checkin(idcheckin: Int!): CheckinCheckout
    checkinPorReserva(idreserva: Int!): CheckinCheckout
    checkinPorHospede(idhospede: Int!, idempresa: Int): [CheckinCheckout!]!
    checkinPorUh(iduh: Int!): CheckinCheckout
  }

  # ─────────────────────────────────────────────
  # Mutations
  # ─────────────────────────────────────────────

  type Mutation {
    # Autenticação
    login(email: String!, password: String!): AuthPayload!

    # Empresa
    criarEmpresa(input: EmpresaInput!): Empresa!
    atualizarEmpresa(idempresa: Int!, input: EmpresaInput!): Empresa!
    excluirEmpresa(idempresa: Int!): Boolean!

    # Edificacao
    criarEdificacao(input: EdificacaoInput!): Edificacao!
    atualizarEdificacao(idedificacao: Int!, input: EdificacaoInput!): Edificacao!
    excluirEdificacao(idedificacao: Int!): Boolean!

    # Andar
    criarAndar(input: AndarInput!): Andar!
    atualizarAndar(idandar: Int!, input: AndarInput!): Andar!
    excluirAndar(idandar: Int!): Boolean!

    # UH Classificacao
    criarUhClassificacao(input: UhClassificacaoInput!): UhClassificacao!
    atualizarUhClassificacao(iduhclassificacao: Int!, input: UhClassificacaoInput!): UhClassificacao!
    excluirUhClassificacao(iduhclassificacao: Int!): Boolean!

    # UH
    criarUh(input: UhInput!): Uh!
    atualizarUh(iduh: Int!, input: UhInput!): Uh!
    excluirUh(iduh: Int!): Boolean!

    # Hospedes
    criarHospede(input: HospedeInput!): Hospede!
    atualizarHospede(idhospede: Int!, input: HospedeInput!): Hospede!
    excluirHospede(idhospede: Int!): Boolean!

    # Reservas
    criarReserva(input: ReservaInput!): Reserva!
    atualizarReserva(idreserva: Int!, input: ReservaInput!): Reserva!
    cancelarReserva(idreserva: Int!, motivo: String): Reserva!
    excluirReserva(idreserva: Int!): Boolean!

    # Checkin / Checkout
    realizarCheckin(input: CheckinInput!): CheckinCheckout!
    realizarCheckout(input: CheckoutInput!): CheckinCheckout!
    excluirCheckin(idcheckin: Int!): Boolean!
  }
`;
