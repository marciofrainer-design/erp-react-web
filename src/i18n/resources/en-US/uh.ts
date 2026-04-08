const enUSUh = {
  crud: {
    title: "UH Registration",
    subtitle: "Manage your hotel's accommodation units efficiently.",
    fields: {
      identificator: "Code",
      floor: "Floor",
      uhType: "Type",
      situation: "Sit.",
      company: "Company",
      nmEdification: "Building",
    },
    editLabel: "Edit UH",
    createLabel: "New UH",
  },
  inputs: {
    nameLabel: "Description",
    identificator: "Code",
    situation: "Situation",
    company: "Company",
    floor: "Floor",
    uhType: "UH Type",
    nmEdification: "Building",
    roomQuantity: "Room Quantity",
    classification: "Classification",
  },
  validation: {
    dsuh: {
      min: "Description must have at least 3 characters",
      max: "Description must have at most 80 characters",
    },
    cduh: {
      required: "Code is required",
      max: "Code must have at most 20 characters",
      pattern: "Use only letters, numbers, _ or -",
    },
  },
} as const;

export default enUSUh;
