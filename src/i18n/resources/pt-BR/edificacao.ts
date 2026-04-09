const ptBREdificacao = {
  crud: {
    title: "Cadastro de Edificação",
    subtitle: "Gerencie as edificações do seu hotel de forma eficiente e organizada.",
    fields: {
      keyName: "Chave",
      identificator: "Identificação",
      nameLabel: "Nome",
      situation: "Sit.",
      company: "Estab.",
    },
    editLabel: "Editar Edificação",
    createLabel: "Nova Edificação",
  },
  inputs: {
    identificator: "Identificação",
    nameLabel: "Nome",
    situation: "Situação",
    company: "Estabelecimento",
  },
  validation: {
    cdedificacao: {
      required: "Identificador é obrigatório",
      max: "Identificador deve ter no máximo 50 caracteres",
      pattern: "Use apenas letras, números, _ ou -",
    },
    nmedificacao: {
      min: "Nome deve ter no mínimo 3 caracteres",
      max: "Nome deve ter no máximo 255 caracteres",
    },
  },
} as const;

export default ptBREdificacao;
