const esESTools = {
  header: {
    searchPlaceholder: "Buscar servicio...",
  },
  page: {
    defaultTitle: "Desbravador Web System",
    selectServicePrompt: "Seleccione un registro en el campo de búsqueda para abrir la pantalla deseada.",
    selectCompanyPrompt: "Seleccione la empresa para realizar las solicitudes al backend.",
    toolTitle: {
      login: "Iniciar Sesión",
      app45: "FrontWeb 4.5",
      config: "Configuración de Usuario",
      relatorios: "Gestor de Reportes",
      integracoes: "Integraciones",
      reservas: "Reservas en Línea",
    },
    welcomeMessage: "Bienvenido, {{email}}!",
  },
  appSearch: {
    title: "Servicios disponibles",
    currentSelection: "Selección actual: {{selected}}",
    noSelection: "Ningún servicio seleccionado",
    emptyResult: "No se encontró ningún servicio para esta búsqueda.",
    comingSoon: "Próximamente",
    tree: {
      records: "Registros",
      infrastructure: "Infraestructura",
      floor: "Piso",
      apartment: "Apartamento",
      queries: "Consultas",
      reservations: "Reservas",
      guests: "Huéspedes",
      reports: "Reportes",
      occupancy: "Ocupación",
      averageDailyRate: "Tarifa media diaria",
      maps: "Mapas",
      reservationMap: "Mapa de reservas",
      apartmentMap: "Mapa de apartamentos",
    },
  },
  login: {
    title: "Bienvenido",
    subtitle:
      "Accede a tu cuenta en Desbravador Web System para gestionar tus soluciones hoteleras de forma eficiente e innovadora.",
    fields: {
      emailLabel: "Correo",
      emailPlaceholder: "nombre@empresa.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "••••••••",
    },
    forgotPassword: "¿Olvidaste tu contraseña?",
    keepConnected: "Mantener sesión iniciada",
    submit: "Iniciar sesión",
    orContinueWith: "O continúa con",
    sso: "SSO",
    companyName: "Desbravador",
    description: "Tu plataforma completa para la gestión hotelera.",
  },
} as const;

export default esESTools;
