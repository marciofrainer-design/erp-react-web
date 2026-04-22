const esESHospede = {
  crud: {
    title: "Registro de Huésped",
    subtitle: "Gestione los huéspedes de su hotel de manera eficiente y organizada.",
    fields: {
      keyName: "Código",
      nameLabel: "Nombre",
      cpf: "CPF",
      birthdate: "Nacimiento",
      phone: "Teléfono",
      email: "Correo",
      situation: "Situación",
      company: "Establecimiento",
    },
    editLabel: "Editar Huésped",
    createLabel: "Nuevo Huésped",
  },
  inputs: {
    nameLabel: "Nombre completo",
    cpf: "CPF",
    birthdate: "Fecha de nacimiento",
    phone: "Teléfono",
    email: "Correo electrónico",
    situation: "Situación",
    company: "Establecimiento",
  },
  validation: {
    nmnome: {
      min: "El nombre debe tener al menos 3 caracteres",
      max: "El nombre debe tener como máximo 120 caracteres",
    },
    cpcpf: {
      min: "El CPF debe tener al menos 11 caracteres",
      max: "El CPF debe tener como máximo 14 caracteres",
    },
    dtnascimento: {
      required: "La fecha de nacimiento es obligatoria",
    },
    nmtelefone: {
      max: "El teléfono debe tener como máximo 20 caracteres",
    },
    nmemail: {
      invalid: "Correo electrónico inválido",
      max: "El correo debe tener como máximo 120 caracteres",
    },
  },
} as const;

export default esESHospede;
