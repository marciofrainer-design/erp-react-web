import { describe, expect, it, vi } from "vitest";
import { MockAdapter, paginate } from "./MockAdapter";

describe("paginate", () => {
  it("returns expected page metadata and sliced data", () => {
    const items = Array.from({ length: 25 }, (_, index) => index + 1);

    const result = paginate(items, { page: 2, limit: 10 });

    expect(result.data).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(result.total).toBe(25);
    expect(result.page).toBe(2);
    expect(result.pageCount).toBe(3);
    expect(result.limit).toBe(10);
  });
});

describe("MockAdapter", () => {
  it("resolves configured route handlers", async () => {
    vi.useFakeTimers();

    const adapter = new MockAdapter({
      TEntityController: {
        GetAll: (params) => ({ ok: true, params }),
      },
    });

    const promise = adapter.get<{ ok: boolean; params: unknown }>(
      "TEntityController",
      "GetAll",
      { page: 1, limit: 10 },
    );

    vi.advanceTimersByTime(200);
    const result = await promise;

    expect(result).toEqual({ ok: true, params: { page: 1, limit: 10 } });
  });

  it("returns undefined when handler does not exist", async () => {
    vi.useFakeTimers();
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const adapter = new MockAdapter({});
    const promise = adapter.get<unknown>("Unknown", "GetAll", { page: 1 });

    vi.advanceTimersByTime(200);
    const result = await promise;

    expect(result).toBeUndefined();
    warnSpy.mockRestore();
  });
});
