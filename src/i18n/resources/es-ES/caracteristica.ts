const esESCaracteristica = {
  crud: {
    title: "Registro de Características",
    subtitle: "Gestione las características de las unidades habitacionales.",
    fields: {
      keyName: "Id",
      nameLabel: "Característica",
      abbreviation: "Abreviatura",
      type: "Tipo",
      situation: "Situación",
      company: "Empresa",
      isPrincipal: "Principal",
    },
    editLabel: "Editar Característica",
    createLabel: "Nueva Característica",
  },
  inputs: {
    nameLabel: "Característica",
    abbreviation: "Abreviatura",
    type: "Tipo",
    situation: "Situación",
    isPrincipal: "Principal",
  },
  validation: {
    dscaracteristica: {
      required: "La descripción de la característica es obligatoria",
      max: "La descripción debe tener como máximo 255 caracteres",
    },
    dsabreviatura: {
      required: "La abreviatura es obligatoria",
      max: "La abreviatura debe tener como máximo 50 caracteres",
      pattern: "Use solo letras, números, _ o -",
    },
    fltipo: {
      required: "El tipo es obligatorio",
    },
  },
} as const;

export default esESCaracteristica;
