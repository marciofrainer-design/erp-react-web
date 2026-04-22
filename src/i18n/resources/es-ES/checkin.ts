const esESCheckin = {
  crud: {
    title: "Registro de Check-in",
    subtitle: "Gestione los check-ins y check-outs de su hotel de manera eficiente.",
    fields: {
      keyName: "Código",
      guest: "Huésped",
      uh: "UH",
      checkInDate: "Check-in",
      checkOutDate: "Check-out",
      situation: "Situación",
      company: "Establecimiento",
    },
    editLabel: "Editar Check-in",
    createLabel: "Nuevo Check-in",
  },
  inputs: {
    reservation: "Reserva",
    checkInDate: "Fecha/hora de check-in",
    checkOutDate: "Fecha/hora de check-out",
    situation: "Situación",
    company: "Establecimiento",
  },
  validation: {
    idreserva: {
      required: "La reserva es obligatoria",
    },
    dtcheckin: {
      required: "La fecha de check-in es obligatoria",
    },
  },
} as const;

export default esESCheckin;
