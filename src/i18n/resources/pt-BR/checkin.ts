const ptBRCheckin = {
  crud: {
    title: "Check-in / Check-out",
    subtitle: "Controle de entrada e saída dos hóspedes nas unidades habitacionais.",
    fields: {
      keyName: "Cód.",
      reservaId: "Cód. Reserva",
      nomeHospede: "Hóspede",
      cdUh: "UH",
      dataCheckIn: "Check-in",
      dataCheckOut: "Check-out",
      status: "Status",
    },
    editLabel: "Editar Check-in",
    createLabel: "Novo Check-in",
  },
  inputs: {
    reservaId: "Reserva",
    dataCheckIn: "Data/Hora Check-in",
    dataCheckOut: "Data/Hora Check-out",
    status: "Status",
  },
  help: {
    reservaId: {
      title: "Reserva",
      description: "Informe o código da reserva previamente criada para este hóspede.",
      example: "Ex: 42",
    },
    dataCheckIn: {
      title: "Data/Hora do Check-in",
      description: "Momento em que o hóspede realizou a entrada oficial na UH. Preenchido automaticamente ao confirmar o check-in.",
      example: "Ex: 2026-05-10 14:00",
    },
    dataCheckOut: {
      title: "Data/Hora do Check-out",
      description: "Momento em que o hóspede realizou a saída da UH. Preenchido no momento do checkout.",
      example: "Ex: 2026-05-15 11:00",
    },
    status: {
      title: "Status",
      description: "Estado atual do processo de check-in/check-out para esta reserva.",
      example: "PENDENTE | CHECKED_IN | CHECKED_OUT",
    },
  },
  validation: {
    reservaId: {
      required: "Informe o código da reserva",
      positive: "ID de reserva inválido",
    },
    status: {
      invalid: "Status inválido",
    },
  },
  status: {
    PENDENTE: "Pendente",
    CHECKED_IN: "Check-in Realizado",
    CHECKED_OUT: "Check-out Realizado",
  },
} as const;

export default ptBRCheckin;
