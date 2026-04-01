import { AndarColumns } from "@/domain/andar/types";
import { CrudPage } from "@/components/crud/CrudPage";
import { AndarRegister } from "@/pages/andar/AndarRegister";
import AndarFactory from "@/domain/andar/andarFactory";
import { andarRegisterSchema } from "@/domain/andar/validation";

export function AndarPage() {
  return (
    <CrudPage
      title="Cadastro de Andar"
      pageDescription="Gerencie os andares do seu estabelecimento"
      tableColumns={AndarColumns}
      createNewItem={AndarFactory.createBlankAndar}
      dependencies={AndarFactory.dependencies()}
      validate={(data) => andarRegisterSchema.safeParse(data).success}
      register={({ mode, data, onChange }) => (
        <AndarRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
