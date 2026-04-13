import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const authState = vi.hoisted(() => ({
  isAuthenticated: false,
}));

vi.mock("@/context/auth/useAuth", () => ({
  useAuth: () => ({
    isAuthenticated: authState.isAuthenticated,
  }),
}));

vi.mock("@/pages/tools/ToolsPage", () => ({
  ToolsPage: () => <div data-testid="tools-page">Tools Page</div>,
}));

import { AppRouter } from "./router";

describe("AppRouter", () => {
  beforeEach(() => {
    authState.isAuthenticated = false;
    window.history.pushState({}, "", "/");
  });

  it("redireciona / para /tools/login quando nao autenticado", async () => {
    render(<AppRouter />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/tools/login");
    });

    expect(screen.getByTestId("tools-page")).toBeInTheDocument();
  });

  it("redireciona / para /tools/app45 quando autenticado", async () => {
    authState.isAuthenticated = true;

    render(<AppRouter />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/tools/app45");
    });

    expect(screen.getByTestId("tools-page")).toBeInTheDocument();
  });

  it("protege rota privada e manda para login quando usuario nao autenticado", async () => {
    window.history.pushState({}, "", "/tools/app45");

    render(<AppRouter />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/tools/login");
    });

    expect(screen.getByTestId("tools-page")).toBeInTheDocument();
  });
});
