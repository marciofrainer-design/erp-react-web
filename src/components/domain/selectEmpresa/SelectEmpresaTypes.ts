import type { Empresa } from "@/domain/empresa/EmpresaTypes";

type SelectEmpresaProps = {
    data?: Empresa[]
    onSelect?: (empresa: Empresa) => void
}

export type { SelectEmpresaProps };