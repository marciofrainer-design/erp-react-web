import type { Empresa } from "@/modules/empresa/EmpresaTypes";

type SelectEmpresaProps = {
    data?: Empresa[]
    onSelect?: (empresa: Empresa) => void
}

export type { SelectEmpresaProps };