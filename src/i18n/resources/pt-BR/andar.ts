const ptBRCommon = {
  crud: {
    title: "Cadastro de Andar",
    subtitle: "Gerencie os andares do seu hotel de forma eficiente e organizada.",
    fields: {
      keyName: "Chave",
      nameLabel: "Nome",
      situation: "Sit.",
      company: "Estab.",
      identificator: "Identificação",
    },
    editLabel: "Editar Andar",
    createLabel: "Novo Andar",
  },
  inputs: {
    nameLabel: "Nome",
    situation: "Situação",
    company: "Estabelecimento",
    identificator: "Identificação",
  },
  validation: {
    nmandar: {
      min: "Nome deve ter no minimo 3 caracteres",
      max: "Nome deve ter no maximo 80 caracteres",
    },
    cdandar: {
      required: "Identificador e obrigatorio",
      max: "Identificador deve ter no maximo 20 caracteres",
      pattern: "Use apenas letras, numeros, _ ou -",
    },
  },
} as const;

export default ptBRCommon;
