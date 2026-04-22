const esESReserva = {
  crud: {
    title: "Registro de Reserva",
    subtitle: "Gestione las reservas de su hotel de manera eficiente y organizada.",
    fields: {
      keyName: "Código",
      guest: "Huésped",
      uh: "UH",
      checkInDate: "Entrada",
      checkOutDate: "Salida",
      notes: "Observación",
      situation: "Situación",
      company: "Establecimiento",
    },
    editLabel: "Editar Reserva",
    createLabel: "Nueva Reserva",
  },
  inputs: {
    guest: "Huésped",
    uh: "Unidad habitacional",
    checkInDate: "Fecha de entrada",
    checkOutDate: "Fecha de salida",
    notes: "Observaciones",
    situation: "Situación",
    company: "Establecimiento",
  },
  validation: {
    idhospede: {
      required: "El huésped es obligatorio",
    },
    iduh: {
      required: "La unidad habitacional es obligatoria",
    },
    dtentrada: {
      required: "La fecha de entrada es obligatoria",
    },
    dtsaida: {
      required: "La fecha de salida es obligatoria",
    },
    nmobservacao: {
      max: "La observación debe tener como máximo 500 caracteres",
    },
  },
} as const;

export default esESReserva;
