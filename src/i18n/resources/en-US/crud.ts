const enUSCrud = {
  title: "CRUD Operations",
  actions: {
    search: "Search...",
    searchPlaceholder: "Enter search term",
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
  },
  notifications: {
    empty: "No notifications",
    dismiss: "Dismiss notification",
    loadingDataError: "Error loading data",
    savingSuccess: "Record saved successfully.",
    savingError: "Unable to save the record.",
    invalidRepositoryConfig: "Invalid repository configuration for deletion.",
    invalidPrimaryKey:
      "Unable to identify the record for deletion. Primary key missing or invalid.",
    missingPrimaryKeyValue: "Primary key value not found in the selected item.",
    deleteCancelled: "Deletion cancelled by the user.",
    deleteSuccess: "Record deleted successfully.",
    deleteError: "Unable to delete the record.",
    printReport: "Print report",
    formValid: "The form is valid.",
    formInvalid:
      "There are errors in the form. Please check the required fields.",
    loadingData: "Loading data",
    preparingData: "We are preparing the data for you to continue.",
  },
  confirmations: {
    delete: "Are you sure you want to delete this record?",
    deleteTitle: "Confirm deletion",
    deleteDescription:
      "This action will permanently remove the selected record.",
    deleteConfirmText: "Delete record",
    deleteCancelText: "Cancel",
    save: "Are you sure you want to save the changes?",
    saveTitle: "Confirm save",
    saveDescription: "This action will save the changes made to the record.",
    saveConfirmText: "Save changes",
    saveCancelText: "Continue editing",
    cancel: "Are you sure you want to cancel? Unsaved changes will be lost.",
    cancelTitle: "Confirm cancellation",
    cancelDescription:
      "This action will cancel the changes made to the record.",
    cancelConfirmText: "Cancel changes",
    cancelCancelText: "Continue editing",
  },
  table: {
    displaying: "Displaying {{visibleRows}} of {{totalRows}} records",
    previous: "Previous",
    next: "Next",
  },
} as const;

export default enUSCrud;
