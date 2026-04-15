import type { Uh, UhCreate, UhUpdate } from "./types";

/**
 * Transforms a Uh object into a UhCreate DTO.
 * @param uh The Uh object to transform.
 * @returns The UhCreate DTO.
 */
export function toUhCreate(uh: Uh): UhCreate {
  const {
    id,
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
    id,
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
    caracteristicas,
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
    id,
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
    id,
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
    caracteristicas,
    conjugadas,
    flestoque,
    ispaxadicional,
    isconjugada,
    pessoaanotacao,
  };
}