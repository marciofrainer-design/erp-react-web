import enUSAndar from "./en-US/andar";
import enUSCommon from "./en-US/common";
import enUSCrud from "./en-US/crud";
import enUSLogin from "./en-US/login";
import enUSTools from "./en-US/tools";
import enUSUh from "./en-US/uh";
import enUSEdificacao from "./en-US/edificacao";
import enUSUhclassificacao from "./en-US/uhclassificacao";
import enUSCaracteristica from "./en-US/caracteristica";
import enUSHospedes from "./en-US/hospedes";
import enUSReservas from "./en-US/reservas";
import enUSCheckin from "./en-US/checkin";
import esESAndar from "./es-ES/andar";
import esESCommon from "./es-ES/common";
import esESCrud from "./es-ES/crud";
import esESLogin from "./es-ES/login";
import esESTools from "./es-ES/tools";
import esESUh from "./es-ES/uh";
import esESEdificacao from "./es-ES/edificacao";
import esESUhclassificacao from "./es-ES/uhclassificacao";
import esESCaracteristica from "./es-ES/caracteristica";
import esESHospedes from "./es-ES/hospedes";
import esESReservas from "./es-ES/reservas";
import esESCheckin from "./es-ES/checkin";
import ptBRAndar from "./pt-BR/andar";
import ptBRCommon from "./pt-BR/common";
import ptBRCrud from "./pt-BR/crud";
import ptBRLogin from "./pt-BR/login";
import ptBRTools from "./pt-BR/tools";
import ptBRUh from "./pt-BR/uh";
import ptBREdificacao from "./pt-BR/edificacao";
import ptBRUhclassificacao from "./pt-BR/uhclassificacao";
import ptBRCaracteristica from "./pt-BR/caracteristica";
import ptBRHospedes from "./pt-BR/hospedes";
import ptBRReservas from "./pt-BR/reservas";
import ptBRCheckin from "./pt-BR/checkin";
import ptBRComponents from "./pt-BR/components";
import enUSComponents from "./en-US/components";
import esESComponents from "./es-ES/components";

export const resources = {
  "pt-BR": {
    andar: ptBRAndar,
    common: ptBRCommon,
    crud: ptBRCrud,
    login: ptBRLogin,
    tools: ptBRTools,
    uh: ptBRUh,
    edificacao: ptBREdificacao,
    uhclassificacao: ptBRUhclassificacao,
    caracteristica: ptBRCaracteristica,
    hospedes: ptBRHospedes,
    reservas: ptBRReservas,
    checkin: ptBRCheckin,
    components: ptBRComponents,
  },
  "en-US": {
    andar: enUSAndar,
    common: enUSCommon,
    crud: enUSCrud,
    login: enUSLogin,
    tools: enUSTools,
    uh: enUSUh,
    edificacao: enUSEdificacao,
    uhclassificacao: enUSUhclassificacao,
    caracteristica: enUSCaracteristica,
    hospedes: enUSHospedes,
    reservas: enUSReservas,
    checkin: enUSCheckin,
    components: enUSComponents,
  },
  "es-ES": {
    andar: esESAndar,
    common: esESCommon,
    crud: esESCrud,
    login: esESLogin,
    tools: esESTools,
    uh: esESUh,
    edificacao: esESEdificacao,
    uhclassificacao: esESUhclassificacao,
    caracteristica: esESCaracteristica,
    hospedes: esESHospedes,
    reservas: esESReservas,
    checkin: esESCheckin,
    components: esESComponents,
  },
} as const;

export const fallbackLng = "pt-BR";
export const defaultNS = "common";
export const supportedLngs = Object.keys(resources) as Array<keyof typeof resources>;

export type AppLanguage = keyof typeof resources;
export type AppResources = (typeof resources)["pt-BR"];
