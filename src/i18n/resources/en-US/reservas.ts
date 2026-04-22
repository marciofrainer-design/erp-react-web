const enUSReservas = {
  crud: {
    title: "Reservations",
    subtitle: "Manage room reservations.",
    fields: { keyName: "ID", hospedeId: "Guest ID", nomeHospede: "Guest", quartoId: "Room ID", cdUh: "Room", dataEntrada: "Check-in", dataSaida: "Check-out", status: "Status" },
    editLabel: "Edit Reservation",
    createLabel: "New Reservation",
  },
  inputs: { hospedeId: "Guest", quartoId: "Room", dataEntrada: "Check-in Date", dataSaida: "Check-out Date", status: "Status" },
  help: {
    hospedeId: { title: "Guest", description: "Select the registered guest for this reservation.", example: "e.g. John Smith (ID 5)" },
    quartoId: { title: "Room", description: "Select the available room for the desired period.", example: "e.g. Room 101 (ID 12)" },
    dataEntrada: { title: "Check-in Date", description: "Expected arrival date. Must be before check-out.", example: "e.g. 2026-05-10" },
    dataSaida: { title: "Check-out Date", description: "Expected departure date. Must be after check-in.", example: "e.g. 2026-05-15" },
    status: { title: "Status", description: "Current state of the reservation.", example: "PENDING | CONFIRMED | CANCELLED" },
  },
  validation: {
    hospedeId: { required: "Select a guest", positive: "Invalid guest ID" },
    quartoId: { required: "Select a room", positive: "Invalid room ID" },
    dataEntrada: { required: "Enter check-in date" },
    dataSaida: { required: "Enter check-out date" },
    status: { invalid: "Invalid status" },
  },
  status: { PENDENTE: "Pending", CONFIRMADA: "Confirmed", CANCELADA: "Cancelled" },
} as const;

export default enUSReservas;
