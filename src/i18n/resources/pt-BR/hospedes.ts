const ptBRHospedes = {
  crud: {
    title: "Cadastro de Hóspedes",
    subtitle: "Gerencie os hóspedes do hotel de forma eficiente e organizada.",
    fields: {
      keyName: "Cód.",
      nome: "Nome",
      documento: "Documento",
      telefone: "Telefone",
      email: "E-mail",
    },
    editLabel: "Editar Hóspede",
    createLabel: "Novo Hóspede",
  },
  inputs: {
    nome: "Nome completo",
    documento: "CPF / Passaporte",
    telefone: "Telefone",
    email: "E-mail",
  },
  help: {
    nome: {
      title: "Nome do Hóspede",
      description: "Informe o nome completo do hóspede conforme documento oficial.",
      example: "Ex: João da Silva",
    },
    documento: {
      title: "Documento",
      description: "CPF (000.000.000-00) ou número de Passaporte. Usado para identificação única do hóspede.",
      example: "Ex: 123.456.789-00",
    },
    telefone: {
      title: "Telefone",
      description: "Número de contato com DDD. Aceita celular ou fixo.",
      example: "Ex: (11) 91234-5678",
    },
    email: {
      title: "E-mail",
      description: "Endereço de e-mail válido para envio de confirmações e comunicados.",
      example: "Ex: joao@email.com",
    },
  },
  validation: {
    nome: {
      min: "Nome deve ter no mínimo 3 caracteres",
      max: "Nome deve ter no máximo 120 caracteres",
    },
    documento: {
      min: "Documento deve ter no mínimo 5 caracteres",
      max: "Documento deve ter no máximo 30 caracteres",
    },
    telefone: {
      min: "Telefone deve ter no mínimo 8 dígitos",
      max: "Telefone deve ter no máximo 20 dígitos",
    },
    email: {
      invalid: "Informe um e-mail válido",
    },
  },
} as const;

export default ptBRHospedes;
