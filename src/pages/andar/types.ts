import type { Andar } from "@/domain/andar/types";

export type AndarRegisterProps = {
  data: Andar;
  mode?: "view" | "new" | "clone";
  onChange: <K extends keyof Andar>(field: K, value: Andar[K]) => void;
};
