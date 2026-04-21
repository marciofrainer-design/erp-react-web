const enUSTools = {
  header: {
    searchPlaceholder: "Search service...",
  },
  page: {
    defaultTitle: "Desbravador Web System",
    selectServicePrompt: "Select a record in the search field to open the desired screen.",
    selectCompanyPrompt: "Select the company to perform backend requests.",
    toolTitle: {
      login: "Login",
      app45: "FrontWeb 4.5",
      config: "User Settings",
      relatorios: "Reports Manager",
      integracoes: "Integrations",
      reservas: "Online Reservations",
    },
    welcomeMessage: "Welcome, {{email}}!",
    invalidCredentials: "Invalid login or password.",
  },
  appSearch: {
    title: "Available services",
    currentSelection: "Current selection: {{selected}}",
    noSelection: "No service selected",
    emptyResult: "No service found for this search.",
    comingSoon: "Soon",
    tree: {
      records: "Records",
      infrastructure: "Infrastructure",
      floor: "Floor",
      uh: "UH",
      apartment: "Apartment",
      queries: "Queries",
      reservations: "Reservations",
      guests: "Guests",
      reports: "Reports",
      occupancy: "Occupancy",
      averageDailyRate: "Average daily rate",
      maps: "Maps",
      reservationMap: "Reservation map",
      apartmentMap: "Apartment map",
    },
  },
  login: {
    title: "Welcome",
    subtitle:
      "Access your account on Desbravador Web System to manage your hospitality solutions efficiently and innovatively.",
    fields: {
      emailLabel: "Email",
      emailPlaceholder: "name@company.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
    },
    forgotPassword: "Forgot your password?",
    keepConnected: "Keep me signed in",
    submit: "Sign in",
    orContinueWith: "Or continue with",
    sso: "SSO",
    companyName: "Desbravador",
    description: "Your complete platform for hospitality management.",
  },
} as const;

export default enUSTools;
