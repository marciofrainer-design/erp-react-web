import type { Andar } from "@/domain/andar/types";

export type AndarRegisterProps = {
  initialData?: Andar;
  onSubmit?: (andar: Andar) => void;
};
