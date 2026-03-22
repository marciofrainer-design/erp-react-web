import type { Empresa } from "@/domain/empresa/types";

type SelectEmpresaProps = {
    data?: Empresa[]
    onSelect?: (empresa: Empresa) => void
}

export type { SelectEmpresaProps };