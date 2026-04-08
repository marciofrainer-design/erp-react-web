const esESUh = {
  crud: {
    title: "Registro de UH",
    subtitle:
      "Gestione las unidades habitacionales de su hotel de forma eficiente.",
    fields: {
      identificator: "Codigo",
      floor: "Piso",
      uhType: "Tipo",
      situation: "Situación",
      company: "Establecimiento",
      nmEdification: "Edificación",
    },
    editLabel: "Editar UH",
    createLabel: "Nueva UH",
  },
  inputs: {
    nameLabel: "Descripción",
    identificator: "Código",
    situation: "Situación",
    company: "Establecimiento",
    floor: "Piso",
    uhType: "Tipo de UH",
    nmEdification: "Edificación",
    roomQuantity: "Cantidad de habitaciones",
    classification: "Clasificación",
  },
  validation: {
    dsuh: {
      min: "La descripción debe tener al menos 3 caracteres",
      max: "La descripción debe tener como máximo 80 caracteres",
    },
    cduh: {
      required: "El código es obligatorio",
      max: "El código debe tener como máximo 20 caracteres",
      pattern: "Use solo letras, números, _ o -",
    },
  },
} as const;

export default esESUh;
