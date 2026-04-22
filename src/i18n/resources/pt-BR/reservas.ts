const ptBRReservas = {
  crud: {
    title: "Reservas",
    subtitle: "Gerencie as reservas de unidades habitacionais do hotel.",
    fields: {
      keyName: "Cód.",
      hospedeId: "Cód. Hóspede",
      nomeHospede: "Hóspede",
      quartoId: "Cód. UH",
      cdUh: "UH",
      dataEntrada: "Entrada",
      dataSaida: "Saída",
      status: "Status",
    },
    editLabel: "Editar Reserva",
    createLabel: "Nova Reserva",
  },
  inputs: {
    hospedeId: "Hóspede",
    quartoId: "Unidade Habitacional",
    dataEntrada: "Data de Entrada",
    dataSaida: "Data de Saída",
    status: "Status da Reserva",
  },
  help: {
    hospedeId: {
      title: "Hóspede",
      description: "Selecione o hóspede cadastrado que será vinculado a esta reserva.",
      example: "Ex: João da Silva (ID 5)",
    },
    quartoId: {
      title: "Unidade Habitacional",
      description: "Selecione a UH (quarto, suite, etc.) disponível para o período desejado.",
      example: "Ex: Quarto 101 (ID 12)",
    },
    dataEntrada: {
      title: "Data de Entrada",
      description: "Data prevista de check-in do hóspede. Deve ser anterior à data de saída.",
      example: "Ex: 2026-05-10",
    },
    dataSaida: {
      title: "Data de Saída",
      description: "Data prevista de check-out. Deve ser posterior à data de entrada.",
      example: "Ex: 2026-05-15",
    },
    status: {
      title: "Status da Reserva",
      description: "Indica o estado atual da reserva.",
      example: "PENDENTE | CONFIRMADA | CANCELADA",
    },
  },
  validation: {
    hospedeId: {
      required: "Selecione um hóspede",
      positive: "ID de hóspede inválido",
    },
    quartoId: {
      required: "Selecione uma UH",
      positive: "ID de UH inválido",
    },
    dataEntrada: {
      required: "Informe a data de entrada",
    },
    dataSaida: {
      required: "Informe a data de saída",
    },
    status: {
      invalid: "Status inválido",
    },
  },
  status: {
    PENDENTE: "Pendente",
    CONFIRMADA: "Confirmada",
    CANCELADA: "Cancelada",
  },
} as const;

export default ptBRReservas;
