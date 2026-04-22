const esESHospedes = {
  crud: {
    title: "Huéspedes",
    subtitle: "Gestione los huéspedes del hotel de forma eficiente.",
    fields: { keyName: "Cód.", nome: "Nombre", documento: "Documento", telefone: "Teléfono", email: "E-mail" },
    editLabel: "Editar Huésped",
    createLabel: "Nuevo Huésped",
  },
  inputs: { nome: "Nombre completo", documento: "DNI / Pasaporte", telefone: "Teléfono", email: "E-mail" },
  help: {
    nome: { title: "Nombre del Huésped", description: "Ingrese el nombre completo según documento oficial.", example: "Ej: Juan García" },
    documento: { title: "Documento", description: "DNI o número de Pasaporte.", example: "Ej: 12345678A" },
    telefone: { title: "Teléfono", description: "Número de contacto con código de área.", example: "Ej: +34 612 345 678" },
    email: { title: "E-mail", description: "Dirección de correo electrónico válida.", example: "Ej: juan@email.com" },
  },
  validation: {
    nome: { min: "El nombre debe tener al menos 3 caracteres", max: "El nombre debe tener máximo 120 caracteres" },
    documento: { min: "El documento debe tener al menos 5 caracteres", max: "El documento debe tener máximo 30 caracteres" },
    telefone: { min: "El teléfono debe tener al menos 8 dígitos", max: "El teléfono debe tener máximo 20 dígitos" },
    email: { invalid: "Ingrese un e-mail válido" },
  },
} as const;

export default esESHospedes;
