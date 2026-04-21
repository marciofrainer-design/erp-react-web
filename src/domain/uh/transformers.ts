import type { UhCaracteristica } from "../uhcaracteristica";
import type { Uh, UhCreate, UhUpdate } from "./types";

/**
 * Transforms a Uh object into a UhCreate DTO.
 * @param uh The Uh object to transform.
 * @returns The UhCreate DTO.
 */
function getUhCaracteristicasPayload(caracteristicas: UhCaracteristica[]): UhCaracteristica[] {
  return caracteristicas.map((caracteristica) => ({
    idcaracteristica_emp: caracteristica.idcaracteristica_emp,
    isprincipal: caracteristica.isprincipal,
  }));
}
export function toUhCreate(uh: Uh): UhCreate {
  const {
    idempresa,
    cduh,
    dsuh,
    isativo,
    isacessibilidade,
    iduhtipo,
    iduhtipo_emp,
    idandar,
    idedificacao,
    qtquarto,
    flestoque,
    ispaxadicional,
    isconjugada,
    iduhclassificacao,
    caracteristicas,
    conjugadas,
    pessoaanotacao,
  } = uh;

  return {
    idempresa,
    cduh,
    dsuh,
    isativo,
    isacessibilidade,
    iduhtipo,
    iduhtipo_emp,
    idandar,
    idedificacao,
    qtquarto,
    iduhclassificacao,
    caracteristicas: getUhCaracteristicasPayload(caracteristicas),
    conjugadas,
    flestoque,
    ispaxadicional,
    isconjugada,
    pessoaanotacao,
  };
}

/**
 * Transforms a Uh object into a UhUpdate DTO.
 * @param uh The Uh object to transform.
 * @returns The UhUpdate DTO.
 */
export function toUhUpdate(uh: Uh): UhUpdate {
  const {
    idempresa,
    cduh,
    iduhtipo_emp,
    idedificacao,
    idandar,
    dsuh,
    qtquarto,
    flestoque,
    ispaxadicional,
    isativo,
    isconjugada,
    isacessibilidade,
    iduhclassificacao,
    iduhtipo,
    caracteristicas,
    conjugadas,
    pessoaanotacao,
  } = uh;

  return {
    idempresa,
    cduh,
    iduhtipo_emp,
    idedificacao,
    idandar,
    dsuh,
    qtquarto,
    flestoque,
    ispaxadicional,
    isativo,
    isconjugada,
    isacessibilidade,
    iduhclassificacao,
    iduhtipo,
    caracteristicas: getUhCaracteristicasPayload(caracteristicas),
    conjugadas,
    pessoaanotacao,
  };
}