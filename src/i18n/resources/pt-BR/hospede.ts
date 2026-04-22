const ptBRHospede = {
  crud: {
    title: "Cadastro de Hóspede",
    subtitle: "Gerencie os hóspedes do seu hotel de forma eficiente e organizada.",
    fields: {
      keyName: "Código",
      nameLabel: "Nome",
      cpf: "CPF",
      birthdate: "Nascimento",
      phone: "Telefone",
      email: "E-mail",
      situation: "Sit.",
      company: "Estab.",
    },
    editLabel: "Editar Hóspede",
    createLabel: "Novo Hóspede",
  },
  inputs: {
    nameLabel: "Nome completo",
    cpf: "CPF",
    birthdate: "Data de nascimento",
    phone: "Telefone",
    email: "E-mail",
    situation: "Situação",
    company: "Estabelecimento",
  },
  validation: {
    nmnome: {
      min: "Nome deve ter no mínimo 3 caracteres",
      max: "Nome deve ter no máximo 120 caracteres",
    },
    cpcpf: {
      min: "CPF deve ter no mínimo 11 caracteres",
      max: "CPF deve ter no máximo 14 caracteres",
    },
    dtnascimento: {
      required: "Data de nascimento é obrigatória",
    },
    nmtelefone: {
      max: "Telefone deve ter no máximo 20 caracteres",
    },
    nmemail: {
      invalid: "E-mail inválido",
      max: "E-mail deve ter no máximo 120 caracteres",
    },
  },
} as const;

export default ptBRHospede;
