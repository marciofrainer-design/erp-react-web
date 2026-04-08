import { DataSnapAdapter } from "@/infra/api/service";
import { mockAdapter } from "@/mocks";
import type { ApiAdapter } from "@/infra/interface";

export const IS_MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";

/**
 * Retorna o adapter correto de acordo com VITE_MOCK_MODE.
 * Use este helper em todos os Factories e repositórios que precisam de um adapter.
 */
export function getAdapter(): ApiAdapter {
  if (IS_MOCK_MODE) {
    return mockAdapter;
  }

  return new DataSnapAdapter();
}
