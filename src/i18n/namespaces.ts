import { resources } from "./resources";

export type AppNamespace = keyof (typeof resources)["pt-BR"];

export const NAMESPACES = Object.keys(resources["pt-BR"]) as AppNamespace[];
