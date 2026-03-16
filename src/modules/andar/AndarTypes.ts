import type { Column } from "@/comum/types";

type Andar = {
    idandar: number;
    idempresa: number;
    nmempresa: string;
    cdandar: string;
    nmandar: string;
    isativo: number;
}

const AndarColumns: Column<Andar>[] = [
    { label: "Chave", field: "idandar" },
    { label: "Nome", field: "nmandar" },
    { label: "Sit.", field: "isativo" },
    { label: "Estab.", field: "nmempresa" },
    { label: "Identificador", field: "cdandar" }
];

export { AndarColumns };
export type { Andar };
