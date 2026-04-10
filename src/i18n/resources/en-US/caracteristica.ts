const enUSCaracteristica = {
  crud: {
    title: "Characteristics Registration",
    subtitle: "Manage accommodation unit characteristics.",
    fields: {
      keyName: "Id",
      nameLabel: "Characteristic",
      abbreviation: "Abbreviation",
      type: "Type",
      situation: "Sit.",
      company: "Company",
      principal: "Principal",
    },
    editLabel: "Edit Characteristic",
    createLabel: "New Characteristic",
  },
  inputs: {
    nameLabel: "Characteristic",
    abbreviation: "Abbreviation",
    type: "Type",
    situation: "Situation",
    principal: "Principal",
  },
  validation: {
    dscaracteristica: {
      required: "Characteristic description is required",
      max: "Description must have at most 255 characters",
    },
    dsabreviatura: {
      required: "Abbreviation is required",
      max: "Abbreviation must have at most 50 characters",
      pattern: "Use only letters, numbers, _ or -",
    },
    fltipo: {
      required: "Type is required",
    },
  },
} as const;

export default enUSCaracteristica;
