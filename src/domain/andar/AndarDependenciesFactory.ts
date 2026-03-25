import { DataSnapAdapter } from '@/infra/api/service';
import { AndarRepository } from '@/domain/andar/AndarRepository';

export interface AndarDependencies {
  andarRepository: AndarRepository;
}

export class AndarDependenciesFactory {
  static create(): AndarDependencies {
    const apiAdapter = new DataSnapAdapter();
    const andarRepository = new AndarRepository(apiAdapter);

    return {
      andarRepository,
    };
  }

  static createForTesting(overrides: Partial<AndarDependencies> = {}): AndarDependencies {
    const defaultDeps = AndarDependenciesFactory.create();
    return {
      ...defaultDeps,
      ...overrides,
    };
  }

  static createWithAdapter(apiAdapter: DataSnapAdapter): AndarDependencies {
    const andarRepository = new AndarRepository(apiAdapter);

    return {
      andarRepository,
    };
  }

  static createWithRepository(andarRepository: AndarRepository): AndarDependencies {
    return {
      andarRepository,
    };
  }
}