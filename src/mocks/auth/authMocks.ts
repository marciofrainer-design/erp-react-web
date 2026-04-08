import { faker } from "@faker-js/faker/locale/pt_BR";
import type { AuthSession, AuthUser } from "@/context/auth/types";

faker.seed(42);

export const MOCK_AUTH_USERS: AuthUser[] = [
  {
    idusuario: 1,
    login: "admin",
    nmusuario: "Administrador",
  },
  {
    idusuario: 2,
    login: faker.internet.username().toLowerCase(),
    nmusuario: faker.person.fullName(),
  },
];

export const MOCK_AUTH_CREDENTIALS: Record<string, string> = {
  admin: "1234",
  [MOCK_AUTH_USERS[1].login]: "senha123",
};

export function createMockSession(user: AuthUser): AuthSession {
  return {
    token: faker.string.alphanumeric(64),
    user,
  };
}

export const mockAuthRoutes = {
  Login: (body?: unknown) => {
    const { login, password } = (body as { login: string; password: string }) ?? {};
    const user = MOCK_AUTH_USERS.find((u) => u.login === login);
    const expectedPassword = MOCK_AUTH_CREDENTIALS[login];

    if (!user || expectedPassword !== password) {
      throw { response: { status: 401, data: { message: "Invalid credentials" } } };
    }

    return createMockSession(user);
  },
};
