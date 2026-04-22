const enUSHospedes = {
  crud: {
    title: "Guests",
    subtitle: "Manage hotel guests efficiently.",
    fields: { keyName: "ID", nome: "Name", documento: "Document", telefone: "Phone", email: "Email" },
    editLabel: "Edit Guest",
    createLabel: "New Guest",
  },
  inputs: { nome: "Full Name", documento: "CPF / Passport", telefone: "Phone", email: "Email" },
  help: {
    nome: { title: "Guest Name", description: "Enter the full name as shown on official ID.", example: "e.g. John Smith" },
    documento: { title: "Document", description: "CPF (000.000.000-00) or Passport number.", example: "e.g. 123.456.789-00" },
    telefone: { title: "Phone", description: "Contact phone with area code.", example: "e.g. (11) 91234-5678" },
    email: { title: "Email", description: "Valid email address for confirmations.", example: "e.g. john@email.com" },
  },
  validation: {
    nome: { min: "Name must be at least 3 characters", max: "Name must be at most 120 characters" },
    documento: { min: "Document must be at least 5 characters", max: "Document must be at most 30 characters" },
    telefone: { min: "Phone must be at least 8 digits", max: "Phone must be at most 20 digits" },
    email: { invalid: "Enter a valid email" },
  },
} as const;

export default enUSHospedes;
