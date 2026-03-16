import type { Empresa } from "@/domain/empresa/EmpresaTypes";

const getEmpresa = (): Empresa[] => {
    return [
        {
            id: 0,
            idempresa: 1,
            fltipo: 1,
            idempresamatriz: 1,
            nmfantasia: "Empresa 1",
            nmrazaosocial: "Empresa 1 Ltda",
            dsabreviatura: "TST 1"
        },
        {
            id: 0,
            idempresa: 2,
            fltipo: 1,
            idempresamatriz: 1,
            nmfantasia: "Empresa 2",
            nmrazaosocial: "Empresa 2 Ltda",
            dsabreviatura: "TST 2"
        }
    ]}

export { getEmpresa }    