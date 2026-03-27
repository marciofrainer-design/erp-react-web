import { useEffect, useState } from "react";
import type { Andar } from "../../domain/andar/types";
import CrudRegister from "@/components/crud/CrudRegister";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import type { AndarRegisterProps } from "./types";
import { blankAndar } from "./consts";

export function AndarRegister({ initialData }: AndarRegisterProps) {
  const [andar, setAndar] = useState<Andar>(
    initialData ?? ({ ...blankAndar(), idandar: 0 } as Andar),
  );

  useEffect(() => {
    if (initialData) {
      setAndar(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof Andar, value: string | number | boolean) => {
    setAndar((prev) => ({ ...prev, [field]: value } as Andar));
  };


  return (
    <CrudRegister
      title={andar.idandar ? "Editar Andar" : "Novo Andar"}
      description="Atualize as informações de localização e unidade operacional do andar."
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <InputStringBase
          label="Nome"
          value={andar.nmandar}
          onChange={(value) => handleChange("nmandar", value)}
        />
        <InputStringBase
          label="Identificador"
          value={andar.cdandar}
          onChange={(value) => handleChange("cdandar", value)}
        />
      </div>
    </CrudRegister>
  );
}
