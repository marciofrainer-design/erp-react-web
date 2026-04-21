import { RepositoryBase } from "@/infra/repository/repositoryBase";
import type { ApiAdapter } from "@/infra/interface";
import type { Uh, UhAll } from "./types";
import { ControllerPrefix, ControllerSuffix } from "@/consts";
import { toUhCreate, toUhUpdate } from "./transformers";

const typeName = "Uh";
export class UhRepository extends RepositoryBase<UhAll, Uh> {
  constructor(api: ApiAdapter) {
    super(api, `${ControllerPrefix}${typeName}${ControllerSuffix}`);
  }
  override save(data: Uh): Promise<void> {
    const newData = toUhCreate(data);
    return this.api.post<void>(this.controller, "", newData);
  }

  override update(data: Uh): Promise<void> {
    const newData = toUhUpdate(data);
    return this.api.put<void>(this.controller, "", newData);
  }
}
