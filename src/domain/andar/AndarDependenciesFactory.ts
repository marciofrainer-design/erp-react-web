import { DataSnapAdapter } from "@/infra/api/service";
import { AndarRepository } from "./AndarRepository";
import type { Repository } from "@/infra/interface";
import type { Andar } from "./types";

export type AndarDependencies = {
  andarRepository: Repository<Andar>;
};

export class AndarDependenciesFactory {
  static create(): AndarDependencies {
    const api = new DataSnapAdapter();
    const andarRepository = new AndarRepository(api);
    return { andarRepository };
  }
}
