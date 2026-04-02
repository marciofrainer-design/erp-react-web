import enUSAndar from "./en-US/andar";
import enUSCommon from "./en-US/common";
import enUSCrud from "./en-US/crud";
import enUSLogin from "./en-US/login";
import enUSTools from "./en-US/tools";
import esESAndar from "./es-ES/andar";
import esESCommon from "./es-ES/common";
import esESCrud from "./es-ES/crud";
import esESLogin from "./es-ES/login";
import esESTools from "./es-ES/tools";
import ptBRAndar from "./pt-BR/andar";
import ptBRCommon from "./pt-BR/common";
import ptBRCrud from "./pt-BR/crud";
import ptBRLogin from "./pt-BR/login";
import ptBRTools from "./pt-BR/tools";

export const resources = {
  "pt-BR": {
    andar: ptBRAndar,
    common: ptBRCommon,
    crud: ptBRCrud,
    login: ptBRLogin,
    tools: ptBRTools,
  },
  "en-US": {
    andar: enUSAndar,
    common: enUSCommon,
    crud: enUSCrud,
    login: enUSLogin,
    tools: enUSTools,
  },
  "es-ES": {
    andar: esESAndar,
    common: esESCommon,
    crud: esESCrud,
    login: esESLogin,
    tools: esESTools,
  },
} as const;

export const fallbackLng = "pt-BR";
export const defaultNS = "common";
export const supportedLngs = Object.keys(resources) as Array<keyof typeof resources>;

export type AppLanguage = keyof typeof resources;
export type AppResources = (typeof resources)["pt-BR"];
