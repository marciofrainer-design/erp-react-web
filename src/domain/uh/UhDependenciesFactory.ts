import { DataSnapAdapter } from "@/infra/api/service";
import { UhRepository } from "./UhRepository";
import type { UhDependencies } from "./types";

export class UhDependenciesFactory {
  static create(): UhDependencies {
    const api = new DataSnapAdapter();
    const uhRepository = new UhRepository(api);
    return { uhRepository };
  }
}
