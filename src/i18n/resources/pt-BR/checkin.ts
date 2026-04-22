const ptBRCheckin = {
  crud: {
    title: "Cadastro de Check-in",
    subtitle: "Gerencie os check-ins e check-outs do seu hotel de forma eficiente.",
    fields: {
      keyName: "Código",
      guest: "Hóspede",
      uh: "UH",
      checkInDate: "Check-in",
      checkOutDate: "Check-out",
      situation: "Sit.",
      company: "Estab.",
    },
    editLabel: "Editar Check-in",
    createLabel: "Novo Check-in",
  },
  inputs: {
    reservation: "Reserva",
    checkInDate: "Data/hora de check-in",
    checkOutDate: "Data/hora de check-out",
    situation: "Situação",
    company: "Estabelecimento",
  },
  validation: {
    idreserva: {
      required: "Reserva é obrigatória",
    },
    dtcheckin: {
      required: "Data de check-in é obrigatória",
    },
  },
} as const;

export default ptBRCheckin;
