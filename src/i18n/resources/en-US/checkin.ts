const enUSCheckin = {
  crud: {
    title: "Check-in Registration",
    subtitle: "Manage your hotel's check-ins and check-outs efficiently.",
    fields: {
      keyName: "Id",
      guest: "Guest",
      uh: "Unit",
      checkInDate: "Check-in",
      checkOutDate: "Check-out",
      situation: "Sit.",
      company: "Company",
    },
    editLabel: "Edit Check-in",
    createLabel: "New Check-in",
  },
  inputs: {
    reservation: "Reservation",
    checkInDate: "Check-in date/time",
    checkOutDate: "Check-out date/time",
    situation: "Situation",
    company: "Company",
  },
  validation: {
    idreserva: {
      required: "Reservation is required",
    },
    dtcheckin: {
      required: "Check-in date is required",
    },
  },
} as const;

export default enUSCheckin;
