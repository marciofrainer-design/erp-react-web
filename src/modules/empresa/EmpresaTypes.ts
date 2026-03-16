import type { ModelBase } from "@/comum/types";

type Empresa = ModelBase & {
    idempresa: number
    fltipo: number
    idempresamatriz?: number
    nmfantasia: string
    nmrazaosocial: string
    dsabreviatura: string
}

export type { Empresa };