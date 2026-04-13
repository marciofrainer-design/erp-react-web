import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataSnapAdapter } from "./service";

const apiClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

const empresaSelectionMock = vi.hoisted(() => ({
  getSelectedEmpresaId: vi.fn(),
}));

vi.mock("./client", () => ({
  apiClient: apiClientMock,
}));

vi.mock("@/context/empresa/empresaSelection", () => ({
  getSelectedEmpresaId: empresaSelectionMock.getSelectedEmpresaId,
}));

describe("DataSnapAdapter", () => {
  const adapter = new DataSnapAdapter();

  beforeEach(() => {
    apiClientMock.get.mockReset();
    apiClientMock.post.mockReset();
    apiClientMock.put.mockReset();
    apiClientMock.delete.mockReset();
    empresaSelectionMock.getSelectedEmpresaId.mockReset();
  });

  it("calls GET with endpoint, params and empresas header", async () => {
    empresaSelectionMock.getSelectedEmpresaId.mockReturnValue("12");
    apiClientMock.get.mockResolvedValue({ data: { ok: true } });

    const result = await adapter.get<{ ok: boolean }>(
      "TAndarController",
      "GetAll",
      { page: 1, limit: 10 },
    );

    expect(result).toEqual({ ok: true });
    expect(apiClientMock.get).toHaveBeenCalledWith("/TAndarController/GetAll", {
      params: { page: 1, limit: 10 },
      headers: { empresas: "12" },
    });
  });

  it("injects idempresa in POST body when possible", async () => {
    empresaSelectionMock.getSelectedEmpresaId.mockReturnValue("99");
    apiClientMock.post.mockResolvedValue({ data: { success: true } });

    await adapter.post("TAndarController", "", {
      idandar: 1,
      idempresa: 0,
      nmandar: "Andar 1",
    });

    expect(apiClientMock.post).toHaveBeenCalledWith(
      "/TAndarController/",
      {
        idandar: 1,
        idempresa: 99,
        nmandar: "Andar 1",
      },
      { headers: { empresas: "99" } },
    );
  });

  it("calls DELETE appending params to endpoint", async () => {
    empresaSelectionMock.getSelectedEmpresaId.mockReturnValue(null);
    apiClientMock.delete.mockResolvedValue({ data: { deleted: true } });

    await adapter.delete("TAndarController", "", 5);

    expect(apiClientMock.delete).toHaveBeenCalledWith("/TAndarController/5", {
      headers: undefined,
    });
  });
});
