const esESCrud = {
	title: "Operaciones CRUD",
	actions: {
		search: "Buscar...",
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
		formValid: "Formulario valido",
		formInvalid: "Formulario invalido",
	},
	notifications: {
		empty: "Sin notificaciones",
		dismiss: "Descartar notificacion",
	},
} as const;

export default esESCrud;
