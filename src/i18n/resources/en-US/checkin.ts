const enUSCheckin = {
  crud: {
    title: "Check-in / Check-out",
    subtitle: "Manage guest arrivals and departures.",
    fields: { keyName: "ID", reservaId: "Reservation ID", nomeHospede: "Guest", cdUh: "Room", dataCheckIn: "Check-in", dataCheckOut: "Check-out", status: "Status" },
    editLabel: "Edit Check-in",
    createLabel: "New Check-in",
  },
  inputs: { reservaId: "Reservation", dataCheckIn: "Check-in Date/Time", dataCheckOut: "Check-out Date/Time", status: "Status" },
  help: {
    reservaId: { title: "Reservation", description: "Enter the reservation code for this guest.", example: "e.g. 42" },
    dataCheckIn: { title: "Check-in Date/Time", description: "When the guest officially arrived at the room.", example: "e.g. 2026-05-10 14:00" },
    dataCheckOut: { title: "Check-out Date/Time", description: "When the guest officially departed.", example: "e.g. 2026-05-15 11:00" },
    status: { title: "Status", description: "Current state of the check-in/out process.", example: "PENDING | CHECKED_IN | CHECKED_OUT" },
  },
  validation: {
    reservaId: { required: "Enter reservation ID", positive: "Invalid reservation ID" },
    status: { invalid: "Invalid status" },
  },
  status: { PENDENTE: "Pending", CHECKED_IN: "Checked In", CHECKED_OUT: "Checked Out" },
} as const;

export default enUSCheckin;
