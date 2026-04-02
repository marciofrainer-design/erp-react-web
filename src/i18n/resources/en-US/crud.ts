const enUSCrud = {
  title: "CRUD Operations",
  actions: {
    search: "Search...",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    new: "New",
    view: "View",
    delete: "Delete",
    clone: "Clone",
    print: "Print",
  },
  status: {
    connected: "Connected",
    disconnected: "Offline",
    formValid: "Form is valid",
    formInvalid: "Form is invalid",
  },
  notifications: {
    empty: "No notifications",
    dismiss: "Dismiss notification",
  },
} as const;

export default enUSCrud;
