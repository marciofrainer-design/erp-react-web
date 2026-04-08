const esESCommon = {
  crud: {
    title: "Registro del Andar",
    subtitle: "Gestione los pisos de su hotel de manera eficiente y organizada.",
    fields: {
      keyName: "Id",
      nameLabel: "Nombre",
      situation: "Situación",
      company: "Establecimiento",
      identificator: "Identificación",
    },
    editLabel: "Editar Andar",
    createLabel: "Nuevo Andar",
  },
  inputs: {
    nameLabel: "Nombre",
    situation: "Situación",
    company: "Establecimiento",
    identificator: "Identificación",
  },
  validation: {
    nmandar: {
      min: "El nombre debe tener al menos 3 caracteres",
      max: "El nombre debe tener como maximo 80 caracteres",
    },
    cdandar: {
      required: "El identificador es obligatorio",
      max: "El identificador debe tener como maximo 20 caracteres",
      pattern: "Use solo letras, numeros, _ o -",
    },
  },
} as const;

export default esESCommon;
