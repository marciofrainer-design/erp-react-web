const ptBRUh = {
  crud: {
    title: "Cadastro de UH",
    subtitle:
      "Gerencie as unidades habitacionais do seu hotel de forma eficiente.",
    fields: {
      identificator: "Código",
      floor: "Andar",
      uhType: "Tipo",
      situation: "Situação",
      company: "Estabelecimento",
      nmEdification: "Edificação",
    },
    editLabel: "Editar UH",
    createLabel: "Nova UH",
  },
  inputs: {
    nameLabel: "Descrição",
    identificator: "Código",
    situation: "Situação",
    company: "Estabelecimento",
    floor: "Andar",
    uhType: "Tipo de UH",
    nmEdification: "Edificação",
    roomQuantity: "Quantidade de Quartos",
    classification: "Classificação",
  },
  validation: {
    dsuh: {
      min: "Descrição deve ter no mínimo 3 caracteres",
      max: "Descrição deve ter no máximo 80 caracteres",
    },
    cduh: {
      required: "Código é obrigatório",
      max: "Código deve ter no máximo 20 caracteres",
      pattern: "Use apenas letras, números, _ ou -",
    },
  },
} as const;

export default ptBRUh;
