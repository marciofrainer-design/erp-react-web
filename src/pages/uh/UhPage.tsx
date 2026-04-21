import { UhColumns } from "@/domain/uh/types";
import type { Uh, UhAll } from "@/domain/uh/types";
import { CrudPageBase } from "@/components/crud";
import type { CrudMode } from "@/components/crud/types";
import UhTabs from "@/pages/uh/UhTabs";
import UhFactory from "@/domain/uh/UhFactory";
import { uhRegisterSchema } from "@/domain/uh/validation";

type UhPageProps = {
  onModeChange?: (mode: CrudMode) => void;
};

export function UhPage({ onModeChange }: UhPageProps) {
  const dependencies = UhFactory.dependencies();
  const {
    uhTipoRepository,
    edificacaoRepository,
    caracteristicaRepository,
    andarRepository,
  } = dependencies;

  return (
    <CrudPageBase<Uh, UhAll>
      namespace="uh"
      columns={UhColumns}
      createNewItem={() => UhFactory.createBlankUh()}
      dependencies={dependencies}
      validate={(data) => uhRegisterSchema.safeParse(data).success}
      onModeChange={onModeChange}
      tabs={({ mode, data, onChange }) => (
        <UhTabs
          mode={mode}
          data={data}
          onChange={onChange}
          repositories={{
            uhTipoRepository,
            edificacaoRepository,
            caracteristicaRepository,
            andarRepository,
          }}
        />
      )}
    />
  );
}
