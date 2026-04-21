import { AndarColumns } from "@/domain/andar/types";
import type { Andar, AndarAll } from "@/domain/andar/types";
import { CrudPageBase } from "@/components/crud";
import type { CrudMode } from "@/components/crud/types";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import AndarFactory from "@/domain/andar/AndarFactory";
import { andarRegisterSchema } from "@/domain/andar/validation";

type AndarPageProps = {
  onModeChange?: (mode: CrudMode) => void;
};

export function AndarPage({ onModeChange }: AndarPageProps) {
  const dependencies = AndarFactory.dependencies();

  return (
    <CrudPageBase<Andar, AndarAll>
      namespace="andar"
      columns={AndarColumns}
      createNewItem={() => AndarFactory.createBlankAndar()}
      dependencies={dependencies}
      validate={(data) => andarRegisterSchema.safeParse(data).success}
      onModeChange={onModeChange}
      register={({ mode, data, onChange }) => (
        <AndarRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
