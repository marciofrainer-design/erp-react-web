const enUSHospede = {
  crud: {
    title: "Guest Registration",
    subtitle: "Manage your hotel's guests efficiently and organized.",
    fields: {
      keyName: "Id",
      nameLabel: "Name",
      cpf: "CPF",
      birthdate: "Birthdate",
      phone: "Phone",
      email: "Email",
      situation: "Sit.",
      company: "Company",
    },
    editLabel: "Edit Guest",
    createLabel: "New Guest",
  },
  inputs: {
    nameLabel: "Full name",
    cpf: "CPF",
    birthdate: "Date of birth",
    phone: "Phone",
    email: "Email",
    situation: "Situation",
    company: "Company",
  },
  validation: {
    nmnome: {
      min: "Name must have at least 3 characters",
      max: "Name must have at most 120 characters",
    },
    cpcpf: {
      min: "CPF must have at least 11 characters",
      max: "CPF must have at most 14 characters",
    },
    dtnascimento: {
      required: "Date of birth is required",
    },
    nmtelefone: {
      max: "Phone must have at most 20 characters",
    },
    nmemail: {
      invalid: "Invalid email address",
      max: "Email must have at most 120 characters",
    },
  },
} as const;

export default enUSHospede;
