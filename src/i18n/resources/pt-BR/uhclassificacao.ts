const ptBRUhclassificacao = {
  crud: {
    title: "Cadastro de Classificação de UH",
    subtitle: "Gerencie as classificações de unidades habitacionais.",
    fields: {
      keyName: "Chave",
      identificator: "Identificação",
      nameLabel: "Classificação",
      situation: "Sit.",
    },
    editLabel: "Editar Classificação",
    createLabel: "Nova Classificação",
  },
  inputs: {
    identificator: "Identificação",
    nameLabel: "Classificação",
    situation: "Situação",
  },
  validation: {
    dsidentificador: {
      required: "Identificador é obrigatório",
      max: "Identificador deve ter no máximo 50 caracteres",
      pattern: "Use apenas letras, números, _ ou -",
    },
    nmclassificacao: {
      min: "Classificação deve ter no mínimo 3 caracteres",
      max: "Classificação deve ter no máximo 255 caracteres",
    },
  },
} as const;

export default ptBRUhclassificacao;
