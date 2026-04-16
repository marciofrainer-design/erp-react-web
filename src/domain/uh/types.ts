import type { Column } from "@/types";
import { FieldType } from "@/types";
import { WIDTH_BOOLEAN_COLUMN, WIDTH_SHORTSTRING_COLUMN } from "@/consts";
import type { Repository } from "@/infra/interface/types";
import type { EntityBase } from "@/types";
import type { Caracteristica } from "@/domain/caracteristica/types";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import type { CaracteristicaRepository } from "../caracteristica/CaracteristicaRepository";
import type { UhTipoRepository } from "../uhTipo/UhTipoRepository";
import type { EdificacaoRepository } from "../edificacao";
import type { AndarRepository } from "../andar/AndarRepository";
import type { UhCaracteristica } from "../uhcaracteristica";

export type UhAll = EntityBase & {
  idempresa: number;
  iduh: number;
  cduh: string;
  dsuh: string;
  isativo: number;
  isacessibilidade: number;
  iduhtipo: number;
  nmuhtipo: string;
  nmandar: string;
  nmedificacao: string;
  iduhtipo_emp: number;
  iduhclassificacao: number;
  empresa_dsabreviatura: string;
};

export type Uh = EntityBase & {
  iduh: number;
  idempresa: number;
  empresa_dsabreviatura: string;
  cduh: string;
  iduhtipo_emp: number;
  idedificacao: number;
  idandar: number;
  dsuh: string;
  qtquarto: number;
  flestoque: number;
  ispaxadicional: number;
  iduhclassificacao: number;
  isativo: number;
  isconjugada: number;
  isacessibilidade: number;
  iduhtipo: number;
  nmuhtipo: string;
  nmuhtipo_emp_flsituacao: number;
  nmandar: string;
  andar_isativo: number;
  nmedificacao: string;
  dsidentificador: string;
  uhclassificacao_isativo: number;
  conjugadas: [];
  caracteristicas: Caracteristica[];
  pessoaanotacao: [];
};

export type UhUpdate = EntityBase & {
  idempresa: number;
  cduh: string;
  iduhtipo_emp: number;
  idedificacao: number;
  idandar: number;
  dsuh: string;
  qtquarto: number;
  flestoque: number;
  ispaxadicional: number;
  isativo: number;
  isconjugada: number;
  isacessibilidade: number;
  iduhclassificacao: number;
  iduhtipo: number;
  conjugadas: [];
  caracteristicas: UhCaracteristica[];
  pessoaanotacao: [];
};

export type UhCreate = EntityBase & {
  idempresa: number;
  cduh: string;
  iduhtipo_emp: number;
  idedificacao: number;
  idandar: number;
  dsuh: string;
  qtquarto: number;
  flestoque: number;
  ispaxadicional: number;
  isativo: number;
  isconjugada: number;
  isacessibilidade: number;
  iduhclassificacao: number;
  iduhtipo: number;
  conjugadas: [];
  caracteristicas: UhCaracteristica[];
  pessoaanotacao: [];
};

export const UH_LABEL_KEYS: Record<
  keyof Omit<
    UhAll,
    | "id"
    | "idempresa"
    | "cduh"
    | "dsuh"
    | "isacessibilidade"
    | "iduhtipo"
    | "iduhtipo_emp"
    | "iduhclassificacao"
  >,
  string
> = {
  iduh: "crud.fields.identificator",
  nmuhtipo: "crud.fields.uhType",
  isativo: "crud.fields.situation",
  empresa_dsabreviatura: "crud.fields.company",
  nmandar: "crud.fields.floor",
  nmedificacao: "crud.fields.nmEdification",
};

export type UhColumnDefinition = Omit<Column<UhAll>, "label"> & {
  labelKey: (typeof UH_LABEL_KEYS)[keyof typeof UH_LABEL_KEYS];
};

export const UhColumns: UhColumnDefinition[] = [
  {
    labelKey: UH_LABEL_KEYS.iduh,
    field: "cduh",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.nmandar,
    field: "nmandar",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.nmuhtipo,
    field: "nmuhtipo",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.isativo,
    field: "isativo",
    width: WIDTH_BOOLEAN_COLUMN,
    type: FieldType.BOOLEAN,
  },
  {
    labelKey: UH_LABEL_KEYS.empresa_dsabreviatura,
    field: "empresa_dsabreviatura",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
  {
    labelKey: UH_LABEL_KEYS.nmedificacao,
    field: "nmedificacao",
    width: WIDTH_SHORTSTRING_COLUMN,
    type: FieldType.STRING,
  },
];

export type UhDependencies = {
  uhRepository: Repository<UhAll, Uh>;
};

export type UhRegisterDependencies<T extends object, TList extends object = T> = CrudRegisterDependencies<T, TList> & {
  repository: Repository<TList, T>;
  edificacaoRepository: EdificacaoRepository;
  uhTipoRepository: UhTipoRepository;
  caracteristicaRepository: CaracteristicaRepository;
  andarRepository: AndarRepository;
};

export type UhCaracteristicaPayload = {
  idcaracteristica_emp: number;
  isprincipal: number;
};

export type UhPayload = Omit<Uh, "caracteristicas"> & {
  caracteristicas: UhCaracteristicaPayload[];
};
