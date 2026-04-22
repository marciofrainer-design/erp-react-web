import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('uh').del();

  await knex('uh').insert([
    { iduh: 1,  idempresa: 1, idedificacao: 1, idandar: 1, iduhtipo: 1, iduhtipo_emp: 1, iduhclassificacao: 1, cduh: 'UH001', dsuh: 'Quarto Standard Térreo A', qtquarto: 1, flestoque: 1, ispaxadicional: 0, isconjugada: 0, isacessibilidade: 1, isativo: 1 },
    { iduh: 2,  idempresa: 1, idedificacao: 1, idandar: 1, iduhtipo: 1, iduhtipo_emp: 1, iduhclassificacao: 1, cduh: 'UH002', dsuh: 'Quarto Standard Térreo B', qtquarto: 1, flestoque: 1, ispaxadicional: 0, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 3,  idempresa: 1, idedificacao: 1, idandar: 2, iduhtipo: 2, iduhtipo_emp: 2, iduhclassificacao: 2, cduh: 'UH101', dsuh: 'Quarto Superior 1º Andar A', qtquarto: 1, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 4,  idempresa: 1, idedificacao: 1, idandar: 2, iduhtipo: 2, iduhtipo_emp: 2, iduhclassificacao: 2, cduh: 'UH102', dsuh: 'Quarto Superior 1º Andar B', qtquarto: 1, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 5,  idempresa: 1, idedificacao: 1, idandar: 3, iduhtipo: 3, iduhtipo_emp: 3, iduhclassificacao: 3, cduh: 'UH201', dsuh: 'Quarto Luxo 2º Andar A',    qtquarto: 2, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 6,  idempresa: 1, idedificacao: 1, idandar: 3, iduhtipo: 3, iduhtipo_emp: 3, iduhclassificacao: 3, cduh: 'UH202', dsuh: 'Quarto Luxo 2º Andar B',    qtquarto: 2, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 7,  idempresa: 1, idedificacao: 1, idandar: 4, iduhtipo: 4, iduhtipo_emp: 4, iduhclassificacao: 4, cduh: 'UH301', dsuh: 'Suite Master 3º Andar',     qtquarto: 2, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 8,  idempresa: 1, idedificacao: 2, idandar: 5, iduhtipo: 1, iduhtipo_emp: 1, iduhclassificacao: 1, cduh: 'UH-B01', dsuh: 'Standard Torre B Térreo', qtquarto: 1, flestoque: 1, ispaxadicional: 0, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 9,  idempresa: 1, idedificacao: 2, idandar: 6, iduhtipo: 5, iduhtipo_emp: 5, iduhclassificacao: 5, cduh: 'UH-B11', dsuh: 'Suite Presidencial Torre B', qtquarto: 3, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 10, idempresa: 2, idedificacao: 4, idandar: 8, iduhtipo: 6, iduhtipo_emp: 6, iduhclassificacao: 6, cduh: 'PSV001', dsuh: 'Chalé Standard',         qtquarto: 1, flestoque: 1, ispaxadicional: 0, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 11, idempresa: 2, idedificacao: 4, idandar: 9, iduhtipo: 7, iduhtipo_emp: 7, iduhclassificacao: 6, cduh: 'PSV002', dsuh: 'Chalé Suite',            qtquarto: 2, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
    { iduh: 12, idempresa: 3, idedificacao: 5, idandar: 10, iduhtipo: 8, iduhtipo_emp: 8, iduhclassificacao: 7, cduh: 'RPD001', dsuh: 'Cabana Praia 1',        qtquarto: 1, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 1, isativo: 1 },
    { iduh: 13, idempresa: 3, idedificacao: 5, idandar: 10, iduhtipo: 9, iduhtipo_emp: 9, iduhclassificacao: 7, cduh: 'RPD002', dsuh: 'Vila Premium',          qtquarto: 3, flestoque: 1, ispaxadicional: 1, isconjugada: 0, isacessibilidade: 0, isativo: 1 },
  ]);
}
