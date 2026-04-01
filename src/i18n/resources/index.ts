import enUSCommon from "./en-US/common";
import enUSLogin from "./en-US/login";
import enUSTools from "./en-US/tools";
import esESCommon from "./es-ES/common";
import esESLogin from "./es-ES/login";
import esESTools from "./es-ES/tools";
import ptBRCommon from "./pt-BR/common";
import ptBRLogin from "./pt-BR/login";
import ptBRTools from "./pt-BR/tools";

export const resources = {
  "pt-BR": {
    common: ptBRCommon,
    login: ptBRLogin,
    tools: ptBRTools,
  },
  "en-US": {
    common: enUSCommon,
    login: enUSLogin,
    tools: enUSTools,
  },
  "es-ES": {
    common: esESCommon,
    login: esESLogin,
    tools: esESTools,
  },
} as const;

export const fallbackLng = "pt-BR";
export const defaultNS = "common";
export const supportedLngs = Object.keys(resources) as Array<keyof typeof resources>;

export type AppLanguage = keyof typeof resources;
export type AppResources = (typeof resources)["pt-BR"];
