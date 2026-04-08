const enUSCommon = {
  crud: {
    title: "Andar Registration",
    subtitle: "Manage your hotel's floors efficiently and organized.",
    fields: {
      keyName: "Id",
      nameLabel: "Name",
      situation: "Sit.",
      company: "Company",
      identificator: "Identification",
    },
    editLabel: "Edit Andar",
    createLabel: "New Andar",
  },
  inputs: {
    nameLabel: "Name",
    situation: "Situation",
    company: "Company",
    identificator: "Identification",
  },
  validation: {
    nmandar: {
      min: "Name must have at least 3 characters",
      max: "Name must have at most 80 characters",
    },
    cdandar: {
      required: "Identifier is required",
      max: "Identifier must have at most 20 characters",
      pattern: "Use only letters, numbers, _ or -",
    },
  },
} as const;

export default enUSCommon;
