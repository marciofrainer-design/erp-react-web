const esESCrud = {
  title: "Operaciones CRUD",
  actions: {
    search: "Buscar...",
    searchPlaceholder: "Término de búsqueda radical",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    new: "Nuevo",
    view: "Ver",
    delete: "Eliminar",
    clone: "Clonar",
    print: "Imprimir",
  },
  status: {
    connected: "Conectado",
    disconnected: "Sin conexion",
  },
  notifications: {
    empty: "No hay notificaciones",
    dismiss: "Descartar notificación",
    loadingDataError: "Error al cargar los datos",
    savingSuccess: "Registro guardado con éxito.",
    savingError: "No se pudo guardar el registro.",
    invalidRepositoryConfig:
      "Configuración de repositorio inválida para eliminación.",
    invalidPrimaryKey:
      "No se pudo identificar el registro para eliminación. Clave primaria ausente o inválida.",
    missingPrimaryKeyValue:
      "Valor de la clave primaria no encontrado en el elemento seleccionado.",
    deleteCancelled: "Eliminación cancelada por el usuario.",
    deleteSuccess: "Registro eliminado con éxito.",
    deleteError: "No se pudo eliminar el registro.",
    printReport: "Imprimir informe",
    formValid: "El formulario está válido.",
    formInvalid: "Existen errores en el formulario. Revise los campos obligatorios.",
    loadingData: "Cargando datos",
    preparingData: "Estamos preparando los datos para que pueda continuar.",
  },
  confirmations: {
    delete: "¿Está seguro de que desea eliminar este registro?",
    deleteTitle: "Confirmar eliminación",
    deleteDescription:
      "Esta acción eliminará el registro seleccionado de forma permanente.",
    deleteConfirmText: "Eliminar registro",
    deleteCancelText: "Cancelar",
    save: "¿Está seguro de que desea guardar los cambios?",
    saveTitle: "Confirmar guardado",
    saveDescription: "Esta acción guardará los cambios realizados en el registro.",
    saveConfirmText: "Guardar cambios",
    saveCancelText: "Continuar editando",
    cancel:
      "¿Está seguro de que desea cancelar? Los cambios no guardados se perderán.",
    cancelTitle: "Confirmar cancelación",
    cancelDescription: "Esta acción cancelará los cambios realizados en el registro.",
    cancelConfirmText: "Cancelar cambios",
    cancelCancelText: "Continuar editando",
  },
  table: {
    displaying: "Mostrando {{visibleRows}} de {{totalRows}} registros",
    previous: "Anterior",
    next: "Siguiente",
  }
} as const;

export default esESCrud;
