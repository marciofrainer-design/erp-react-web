import { MockAdapter } from "./MockAdapter";
import { mockAndarRoutes } from "./andar/andarMocks";
import { mockEmpresaRoutes } from "./empresa/empresaMocks";
import { mockAuthRoutes } from "./auth/authMocks";
import { mockUhRoutes } from "./uh/uhMocks";

export const mockAdapter = new MockAdapter({
  TAuthController: {
    Login: (_, body) => mockAuthRoutes.Login(body),
  },
  TEmpresaController: {
    GetAll: (params) => mockEmpresaRoutes.GetAll(params),
    GetById: (params) => mockEmpresaRoutes.GetById(params),
  },
  TAndarController: {
    GetAll: (params) => mockAndarRoutes.GetAll(params),
    GetById: (params) => mockAndarRoutes.GetById(params),
  },
  TUhController: {
    GetAll: (params) => mockUhRoutes.GetAll(params),
    GetById: (params) => mockUhRoutes.GetById(params),
  },
});

export { MockAdapter } from "./MockAdapter";
export { mockAuthRoutes } from "./auth/authMocks";
export { mockEmpresaRoutes } from "./empresa/empresaMocks";
export { mockAndarRoutes } from "./andar/andarMocks";
export { mockUhRoutes } from "./uh/uhMocks";
export { MOCK_AUTH_USERS, MOCK_AUTH_CREDENTIALS } from "./auth/authMocks";
