export const NAMESPACES = ["common", "tools", "login", "crud", "andar"] as const;

export type AppNamespace = (typeof NAMESPACES)[number];
