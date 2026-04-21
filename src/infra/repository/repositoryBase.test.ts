import { describe, expect, it, vi } from "vitest";
import { RepositoryBase } from "./repositoryBase";
import type { ApiAdapter } from "../interface";

type TestEntity = {
  id: number;
  name: string;
};

describe("RepositoryBase", () => {
  it("delegates getAll to adapter with GetAll method", async () => {
    const get = vi.fn().mockResolvedValue({ data: [], total: 0, page: 1, pageCount: 1, limit: 10 });

    const api = {
      get,
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      call: vi.fn(),
    } as unknown as ApiAdapter;

    const repository = new RepositoryBase<TestEntity>(api, "TEntityController");
    await repository.getAll({ page: 1, pageCount: 1, limit: 10 });

    expect(get).toHaveBeenCalledWith("TEntityController", "GetAll", {
      page: 1,
      pageCount: 1,
      limit: 10,
    });
  });

  it("delegates getById with id payload", async () => {
    const get = vi.fn().mockResolvedValue({ id: 1, name: "One" });

    const api = {
      get,
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      call: vi.fn(),
    } as unknown as ApiAdapter;

    const repository = new RepositoryBase<TestEntity>(api, "TEntityController");
    await repository.getById(1);

    expect(get).toHaveBeenCalledWith("TEntityController", "GetById", { id: 1 });
  });

  it("delegates save, update and delete to adapter", async () => {
    const post = vi.fn().mockResolvedValue(undefined);
    const put = vi.fn().mockResolvedValue(undefined);
    const del = vi.fn().mockResolvedValue(undefined);

    const api = {
      get: vi.fn(),
      post,
      put,
      delete: del,
      call: vi.fn(),
    } as unknown as ApiAdapter;

    const repository = new RepositoryBase<TestEntity>(api, "TEntityController");

    await repository.save({ id: 1, name: "A" });
    await repository.update({ id: 2, name: "B" });
    await repository.delete(10);

    expect(post).toHaveBeenCalledWith("TEntityController", "", { id: 1, name: "A" });
    expect(put).toHaveBeenCalledWith("TEntityController", "", { id: 2, name: "B" });
    expect(del).toHaveBeenCalledWith("TEntityController", "", 10);
  });
});
