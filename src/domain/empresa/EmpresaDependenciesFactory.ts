import { DataSnapAdapter } from '@/infra/api/service';
import { EmpresaRepository } from './EmpresaRepository';

export interface EmpresaDependencies {
  empresaRepository: EmpresaRepository;
}

export class EmpresaDependenciesFactory {
  static create(): EmpresaDependencies {
    const apiAdapter = new DataSnapAdapter();
    const empresaRepository = new EmpresaRepository(apiAdapter);

    return {
      empresaRepository,
    };
  }

  static createForTesting(overrides: Partial<EmpresaDependencies> = {}): EmpresaDependencies {
    const defaultDeps = EmpresaDependenciesFactory.create();
    return {
      ...defaultDeps,
      ...overrides,
    };
  }

  static createWithRepository(empresaRepository: EmpresaRepository): EmpresaDependencies {
    return {
      empresaRepository,
    };
  }
}
