const esESReservas = {
  crud: {
    title: "Reservas",
    subtitle: "Gestione las reservas de habitaciones del hotel.",
    fields: { keyName: "Cód.", hospedeId: "ID Huésped", nomeHospede: "Huésped", quartoId: "ID Hab.", cdUh: "Habitación", dataEntrada: "Entrada", dataSaida: "Salida", status: "Estado" },
    editLabel: "Editar Reserva",
    createLabel: "Nueva Reserva",
  },
  inputs: { hospedeId: "Huésped", quartoId: "Habitación", dataEntrada: "Fecha de Entrada", dataSaida: "Fecha de Salida", status: "Estado" },
  help: {
    hospedeId: { title: "Huésped", description: "Seleccione el huésped registrado.", example: "Ej: Juan García (ID 5)" },
    quartoId: { title: "Habitación", description: "Seleccione la habitación disponible.", example: "Ej: Habitación 101 (ID 12)" },
    dataEntrada: { title: "Fecha de Entrada", description: "Fecha prevista de llegada. Debe ser anterior a la salida.", example: "Ej: 2026-05-10" },
    dataSaida: { title: "Fecha de Salida", description: "Fecha prevista de salida. Debe ser posterior a la entrada.", example: "Ej: 2026-05-15" },
    status: { title: "Estado", description: "Estado actual de la reserva.", example: "PENDIENTE | CONFIRMADA | CANCELADA" },
  },
  validation: {
    hospedeId: { required: "Seleccione un huésped", positive: "ID de huésped inválido" },
    quartoId: { required: "Seleccione una habitación", positive: "ID de habitación inválido" },
    dataEntrada: { required: "Ingrese fecha de entrada" },
    dataSaida: { required: "Ingrese fecha de salida" },
    status: { invalid: "Estado inválido" },
  },
  status: { PENDENTE: "Pendiente", CONFIRMADA: "Confirmada", CANCELADA: "Cancelada" },
} as const;

export default esESReservas;
