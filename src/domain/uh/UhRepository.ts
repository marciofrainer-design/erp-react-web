import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Uh, UhPayload } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";

const typeName = "Uh";
export class UhRepository extends RepositoryBase<Uh> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
  override save(data: Uh): Promise<void> {
    return this.api.post<void>(this.controller, "", this.toPayload(data));
  }

  override update(data: Uh): Promise<void> {
    return this.api.put<void>(this.controller, "", this.toPayload(data));
  }

  private toPayload(data: Uh): UhPayload {
    const { caracteristicas, ...uhData } = data;
    return {
      ...uhData,
      caracteristicas: caracteristicas.map((c) => ({
        idcaracteristica: c.idcaracteristica,
        isprincipal: c.isprincipal,
      })),
    };
  }
}
