import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { SelectRepository } from "@/components/select/SelectRepository";
import { uhRegisterSchema } from "@/domain/uh/validation";
import type { UHTipo } from "@/domain/uhTipo/types";
import type { UhRegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { ListFilter } from "lucide-react";
import { UH_TIPO_MAPPER } from "./consts";

export function UhRegister({ data, onChange, uhTipoRepository }: UhRegisterProps) {
  const { t } = useAppTranslation("uh");
  const validation = uhRegisterSchema.safeParse(data);
  const errors = validation.success
    ? {}
    : validation.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          const translatedMessage = t(issue.message, issue.message) as string;
          (acc[field] ??= []).push(translatedMessage);
        }
        return acc;
      }, {});
  const firstCmpFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstCmpFocus.current) {
      firstCmpFocus.current.focus();
    }
  }, []);

  return (
    <CrudRegister
      title={data.iduh ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputStringBase
          ref={firstCmpFocus}
          label={t("inputs.identificator")}
          value={data.cduh}
          error={errors.cduh?.[0]}
          onChange={(e) => onChange("cduh", e.target.value)}
        />
        <InputStringBase
          label={t("inputs.nameLabel")}
          value={data.dsuh}
          error={errors.dsuh?.[0]}
          onChange={(e) => onChange("dsuh", e.target.value)}
        />
        <SelectRepository<UHTipo>
          repository={uhTipoRepository}
          mapper={UH_TIPO_MAPPER}
          label={t("inputs.uhType")}
          Icon={ListFilter}
          value={String(data.iduhtipo || "")}
          onChange={(v) => {
            onChange("iduhtipo", Number(v));
          }}
          error={errors.iduhtipo?.[0]}
          lazy={true}
          initialLabel={data.nmuhtipo}
        />
        <InputStringBase
          label={t("inputs.nmEdification")}
          value={data.nmedificacao}
          error={errors.nmedificacao?.[0]}
          onChange={(e) => onChange("nmedificacao", e.target.value)}
        />
        <InputStringBase
          label={t("inputs.floor")}
          value={data.nmandar}
          error={errors.nmandar?.[0]}
          onChange={(e) => onChange("nmandar", e.target.value)}
        />
        <InputStringBase
          label={t("inputs.roomQuantity")}
          value={data.qtquarto}
          error={errors.qtquarto?.[0]}
          onChange={(e) => onChange("qtquarto", parseInt(e.target.value, 10))}
        />
        <InputStringBase
          label={t("inputs.classification")}
          value={data.iduhclassificacao}
          error={errors.iduhclassificacao?.[0]}
          onChange={(e) => onChange("iduhclassificacao", parseInt(e.target.value, 10))}
        />
      </div>
    </CrudRegister>
  );
}


//   idempresa: number;
//   iduh: number;
//   cduh: string;
//   dsuh: string;
//   isativo: number;
//   isacessibilidade: number;
//   iduhtipo: number;
//   nmuhtipo: string;
//   nmandar: string;
//   nmedificacao: string;
//   empresa_dsabreviatura: string;