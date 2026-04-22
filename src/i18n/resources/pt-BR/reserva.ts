const ptBRReserva = {
  crud: {
    title: "Cadastro de Reserva",
    subtitle: "Gerencie as reservas do seu hotel de forma eficiente e organizada.",
    fields: {
      keyName: "Código",
      guest: "Hóspede",
      uh: "UH",
      checkInDate: "Entrada",
      checkOutDate: "Saída",
      notes: "Observação",
      situation: "Sit.",
      company: "Estab.",
    },
    editLabel: "Editar Reserva",
    createLabel: "Nova Reserva",
  },
  inputs: {
    guest: "Hóspede",
    uh: "UH",
    checkInDate: "Data de entrada",
    checkOutDate: "Data de saída",
    notes: "Observações",
    situation: "Situação",
    company: "Estabelecimento",
  },
  validation: {
    idhospede: {
      required: "Hóspede é obrigatório",
    },
    iduh: {
      required: "UH é obrigatória",
    },
    dtentrada: {
      required: "Data de entrada é obrigatória",
    },
    dtsaida: {
      required: "Data de saída é obrigatória",
    },
    nmobservacao: {
      max: "Observação deve ter no máximo 500 caracteres",
    },
  },
} as const;

export default ptBRReserva;
