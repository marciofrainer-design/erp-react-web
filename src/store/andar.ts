import type { Andar } from "@/modules/andar/AndarTypes";

const getAndar = (): Andar[] => {
    return [
        {
            idandar: 1,
            idempresa: 1,
            cdandar: "PRI",
            nmandar: "1 - PRIMEIRO",
            isativo: 1,
            nmempresa: "Teste",
        },
        {
            idandar: 5,
            idempresa: 3,
            cdandar: "01",
            nmandar: "01",
            isativo: 1,
            nmempresa: "Teste",
        },
        {
            idandar: 6,
            idempresa: 3,
            cdandar: "02",
            nmandar: "02",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 8,
            idempresa: 1,
            cdandar: "SEG",
            nmandar: "2 - SEGUNDO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 10,
            idempresa: 1,
            cdandar: "TER",
            nmandar: "0 - TERREO",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 3,
            idempresa: 2,
            cdandar: "00",
            nmandar: "00",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 2,
            idempresa: 2,
            cdandar: "01",
            nmandar: "01",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 4,
            idempresa: 2,
            cdandar: "02",
            nmandar: "02",
            isativo: 1,
            nmempresa: "Teste"
        },
        {
            idandar: 11,
            idempresa: 3,
            cdandar: "11",
            nmandar: "TESTE",
            isativo: 1,
            nmempresa: "Teste"
        }
    ];
};

export { getAndar };
