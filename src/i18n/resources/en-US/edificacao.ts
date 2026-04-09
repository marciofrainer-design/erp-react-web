const enUSEdificacao = {
  crud: {
    title: "Building Registration",
    subtitle: "Manage your hotel's buildings efficiently and organized.",
    fields: {
      keyName: "Id",
      identificator: "Identification",
      nameLabel: "Name",
      situation: "Sit.",
      company: "Company",
    },
    editLabel: "Edit Building",
    createLabel: "New Building",
  },
  inputs: {
    identificator: "Identification",
    nameLabel: "Name",
    situation: "Situation",
    company: "Company",
  },
  validation: {
    cdedificacao: {
      required: "Identifier is required",
      max: "Identifier must have at most 50 characters",
      pattern: "Use only letters, numbers, _ or -",
    },
    nmedificacao: {
      min: "Name must have at least 3 characters",
      max: "Name must have at most 255 characters",
    },
  },
} as const;

export default enUSEdificacao;
