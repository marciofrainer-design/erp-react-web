import type { AndarModel } from "@/domain/andar/types";

const getAndar = (): AndarModel[] => {
    return [
        {
            id: 0,
            idandar: 1,
            idempresa: 1,
            cdandar: "PRI",
            nmandar: "1 - PRIMEIRO",
            isativo: 1,
            nmempresa: "Teste",
        },
        {
            id: 0,
            idandar: 5,
            idempresa: 1,
            cdandar: "SEG",
            nmandar: "2 - SEGUNDO",
            isativo: 1,
            nmempresa: "Teste",
        },
        {
            id: 0,
            idandar: 6,
            idempresa: 1,
            cdandar: "TER",
            nmandar: "3 - TERCEIRO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 8,
            idempresa: 1,
            cdandar: "QUA",
            nmandar: "4 - QUARTO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 10,
            idempresa: 1,
            cdandar: "QUI",
            nmandar: "5 - QUINTO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 3,
            idempresa: 1,
            cdandar: "SEX",
            nmandar: "6 - SEXTO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 2,
            idempresa: 1,
            cdandar: "SET",
            nmandar: "7 - SETIMO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 4,
            idempresa: 2,
            cdandar: "OIT",
            nmandar: "8 - OITAVO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            id: 0,
            idandar: 11,
            idempresa: 3,
            cdandar: "NON",
            nmandar: "9 - NONO",
            isativo: 1,
            nmempresa: "Teste"
        }
    ];
};

export { getAndar };
