const esESCheckin = {
  crud: {
    title: "Check-in / Check-out",
    subtitle: "Control de entrada y salida de huéspedes.",
    fields: { keyName: "Cód.", reservaId: "ID Reserva", nomeHospede: "Huésped", cdUh: "Habitación", dataCheckIn: "Check-in", dataCheckOut: "Check-out", status: "Estado" },
    editLabel: "Editar Check-in",
    createLabel: "Nuevo Check-in",
  },
  inputs: { reservaId: "Reserva", dataCheckIn: "Fecha/Hora Check-in", dataCheckOut: "Fecha/Hora Check-out", status: "Estado" },
  help: {
    reservaId: { title: "Reserva", description: "Ingrese el código de la reserva del huésped.", example: "Ej: 42" },
    dataCheckIn: { title: "Fecha/Hora Check-in", description: "Momento en que el huésped ingresó a la habitación.", example: "Ej: 2026-05-10 14:00" },
    dataCheckOut: { title: "Fecha/Hora Check-out", description: "Momento en que el huésped abandonó la habitación.", example: "Ej: 2026-05-15 11:00" },
    status: { title: "Estado", description: "Estado actual del proceso de check-in/out.", example: "PENDIENTE | CHECKED_IN | CHECKED_OUT" },
  },
  validation: {
    reservaId: { required: "Ingrese el ID de reserva", positive: "ID de reserva inválido" },
    status: { invalid: "Estado inválido" },
  },
  status: { PENDENTE: "Pendiente", CHECKED_IN: "Check-in Realizado", CHECKED_OUT: "Check-out Realizado" },
} as const;

export default esESCheckin;
