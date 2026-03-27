import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Andar } from "../../domain/andar/types";
import CrudRegister from "@/components/crud/CrudRegister";
import type { CrudRegisterDependencies } from "@/components/crud/types";
import type { AndarDependencies } from "@/domain/andar/AndarDependenciesFactory";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";

type AndarRegisterProps = {
  dependencies: AndarDependencies;
  initialData?: Andar;
  onSubmit?: (andar: Andar) => void;
  onCancel?: () => void;
};

const blankAndar = (): Omit<Andar, "id"> => ({
  idandar: 0,
  idempresa: 0,
  nmempresa: "",
  cdandar: "",
  nmandar: "",
  isativo: 1,
});

export function AndarRegister({ dependencies, initialData, onSubmit, onCancel }: AndarRegisterProps) {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dependencies.andarRepository.save(andar);
      onSubmit?.(andar);
    } catch (err) {
      console.error("Falha ao salvar andar:", err);
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  const crudDependencies: CrudRegisterDependencies<Andar> = {
    repository: {
      getAll: () => dependencies.andarRepository.getAll(),
      save: (item) => dependencies.andarRepository.save(item),
    },
  };

  return (
    <CrudRegister<Andar>
      onSubmit={handleSubmit}
      onCancel={onCancel}
      dependencies={crudDependencies}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
