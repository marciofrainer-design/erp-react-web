import type { Uh } from "@/domain/uh/types";

export type UhRegisterProps = {
  data: Uh;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof Uh>(field: K, value: Uh[K]) => void;
};
