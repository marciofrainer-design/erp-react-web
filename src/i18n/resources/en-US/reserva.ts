const enUSReserva = {
  crud: {
    title: "Reservation Registration",
    subtitle: "Manage your hotel's reservations efficiently and organized.",
    fields: {
      keyName: "Id",
      guest: "Guest",
      uh: "Unit",
      checkInDate: "Check-in",
      checkOutDate: "Check-out",
      notes: "Notes",
      situation: "Sit.",
      company: "Company",
    },
    editLabel: "Edit Reservation",
    createLabel: "New Reservation",
  },
  inputs: {
    guest: "Guest",
    uh: "Accommodation unit",
    checkInDate: "Check-in date",
    checkOutDate: "Check-out date",
    notes: "Notes",
    situation: "Situation",
    company: "Company",
  },
  validation: {
    idhospede: {
      required: "Guest is required",
    },
    iduh: {
      required: "Accommodation unit is required",
    },
    dtentrada: {
      required: "Check-in date is required",
    },
    dtsaida: {
      required: "Check-out date is required",
    },
    nmobservacao: {
      max: "Notes must have at most 500 characters",
    },
  },
} as const;

export default enUSReserva;
