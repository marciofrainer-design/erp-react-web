import { DataSnapAdapter } from "@/infra/api/service";
import { AndarRepository } from "./AndarRepository";
import type { AndarDependencies } from "./types";

export class AndarDependenciesFactory {
  static create(): AndarDependencies {
    const api = new DataSnapAdapter();
    const andarRepository = new AndarRepository(api);
    return { andarRepository };
  }
}
