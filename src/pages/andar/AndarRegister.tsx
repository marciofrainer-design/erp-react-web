import CrudRegister from "@/components/crud/CrudRegister";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { andarRegisterSchema } from "@/domain/andar/validation";
import type { AndarRegisterProps } from "./types";

export function AndarRegister({ data, onChange }: AndarRegisterProps) {
  const validation = andarRegisterSchema.safeParse(data);
  const errors = validation.success ? {} : validation.error.flatten().fieldErrors;

  return (
    <CrudRegister
      title={data.idandar ? "Editar Andar" : "Novo Andar"}
      description="Atualize as informações de localização e unidade operacional do andar."
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputStringBase
            label="Nome"
            value={data.nmandar}
            error={errors.nmandar?.[0]}
            onChange={(value) => onChange("nmandar", value)}
          />
          <InputStringBase
            label="Identificador"
            value={data.cdandar}
            error={errors.cdandar?.[0]}
            onChange={(value) => onChange("cdandar", value)}
          />
        </div>
    </CrudRegister>
  );
}
