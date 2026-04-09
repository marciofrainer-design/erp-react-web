const esESEdificacao = {
  crud: {
    title: "Registro de Edificio",
    subtitle: "Gestione los edificios de su hotel de manera eficiente y organizada.",
    fields: {
      keyName: "Id",
      identificator: "Identificación",
      nameLabel: "Nombre",
      situation: "Situación",
      company: "Establecimiento",
    },
    editLabel: "Editar Edificio",
    createLabel: "Nuevo Edificio",
  },
  inputs: {
    identificator: "Identificación",
    nameLabel: "Nombre",
    situation: "Situación",
    company: "Establecimiento",
  },
  validation: {
    cdedificacao: {
      required: "El identificador es obligatorio",
      max: "El identificador debe tener como máximo 50 caracteres",
      pattern: "Use solo letras, números, _ o -",
    },
    nmedificacao: {
      min: "El nombre debe tener al menos 3 caracteres",
      max: "El nombre debe tener como máximo 255 caracteres",
    },
  },
} as const;

export default esESEdificacao;
