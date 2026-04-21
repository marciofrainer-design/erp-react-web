const ptBRCaracteristica = {
  crud: {
    title: "Cadastro de Características",
    subtitle: "Gerencie as características das unidades habitacionais.",
    fields: {
      keyName: "Chave",
      nameLabel: "Característica",
      abbreviation: "Abreviatura",
      type: "Tipo",
      situation: "Sit.",
      company: "Empresa",
      isPrincipal: "Principal",
    },
    editLabel: "Editar Característica",
    createLabel: "Nova Característica",
  },
  inputs: {
    nameLabel: "Característica",
    abbreviation: "Abreviatura",
    type: "Tipo",
    situation: "Situação",
    isPrincipal: "Principal",
  },
  validation: {
    dscaracteristica: {
      required: "Descrição da característica é obrigatória",
      max: "Descrição deve ter no máximo 255 caracteres",
    },
    dsabreviatura: {
      required: "Abreviatura é obrigatória",
      max: "Abreviatura deve ter no máximo 50 caracteres",
      pattern: "Use apenas letras, números, _ ou -",
    },
    fltipo: {
      required: "Tipo é obrigatório",
    },
  },
} as const;

export default ptBRCaracteristica;
