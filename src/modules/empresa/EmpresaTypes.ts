import type { PersistentEntity } from "@/comum/types";

type Empresa = PersistentEntity & {
    idempresa: number
    fltipo: number
    idempresamatriz?: number
    nmfantasia: string
    nmrazaosocial: string
    dsabreviatura: string
}

export type { Empresa };