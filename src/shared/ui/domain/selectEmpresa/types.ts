import type { Empresa } from "@/domain/empresa/types";

type SelectEmpresaProps = {
    onSelect?: (empresa: Empresa) => void
}

export type { SelectEmpresaProps };