const enUSUhclassificacao = {
  crud: {
    title: "UH Classification Registration",
    subtitle: "Manage accommodation unit classifications.",
    fields: {
      keyName: "Id",
      identificator: "Identification",
      nameLabel: "Classification",
      situation: "Sit.",
    },
    editLabel: "Edit Classification",
    createLabel: "New Classification",
  },
  inputs: {
    identificator: "Identification",
    nameLabel: "Classification",
    situation: "Situation",
  },
  validation: {
    dsidentificador: {
      required: "Identifier is required",
      max: "Identifier must have at most 50 characters",
      pattern: "Use only letters, numbers, _ or -",
    },
    nmclassificacao: {
      min: "Classification must have at least 3 characters",
      max: "Classification must have at most 255 characters",
    },
  },
} as const;

export default enUSUhclassificacao;
