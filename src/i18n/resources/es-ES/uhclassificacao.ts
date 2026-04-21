const esESUhclassificacao = {
  crud: {
    title: "Registro de Clasificación de UH",
    subtitle: "Gestione las clasificaciones de unidades habitacionales.",
    fields: {
      keyName: "Id",
      identificator: "Identificación",
      nameLabel: "Clasificación",
      situation: "Situación",
    },
    editLabel: "Editar Clasificación",
    createLabel: "Nueva Clasificación",
  },
  inputs: {
    identificator: "Identificación",
    nameLabel: "Clasificación",
    situation: "Situación",
  },
  validation: {
    dsidentificador: {
      required: "El identificador es obligatorio",
      max: "El identificador debe tener como máximo 50 caracteres",
      pattern: "Use solo letras, números, _ o -",
    },
    nmclassificacao: {
      min: "La clasificación debe tener al menos 3 caracteres",
      max: "La clasificación debe tener como máximo 255 caracteres",
    },
  },
} as const;

export default esESUhclassificacao;
