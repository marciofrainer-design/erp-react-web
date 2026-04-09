import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { SelectRepository } from "@/components/select/SelectRepository";
import { uhRegisterSchema } from "@/domain/uh/validation";
import type { UHTipo } from "@/domain/uhTipo/types";
import type { UhRegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { UH_TIPO_MAPPER } from "./consts";
import type { Edificacao } from "@/domain/edificacao/types";

export function UhRegister({ data, onChange, repositories }: UhRegisterProps) {
  const { t } = useAppTranslation(["uh", "edificacao"]);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          repository={repositories.uhTipoRepository}
          mapper={UH_TIPO_MAPPER}
          label={t("inputs.uhType")}
          value={String(data.iduhtipo || "")}
          onChange={(v) => {
            onChange("iduhtipo", Number(v));
          }}
          error={errors.iduhtipo?.[0]}
          lazy={true}
          initialLabel={data.nmuhtipo}
        />
        <SelectRepository<Edificacao>
          repository={repositories.edificacaoRepository}
          mapper={{
            valueKey: "idedificacao",
            labelKeys: ["cdedificacao", "nmedificacao"],
          }}
          label={t("inputs.buiding", { ns: "edificacao" })}
          value={String(data.idedificacao || "")}
          onChange={(v) => {
            onChange("idedificacao", Number(v));
          }}
          error={errors.idedificacao?.[0]}
          lazy={true}
          initialLabel={data.empresa_dsabreviatura ? `${data.empresa_dsabreviatura} - ${data.nmedificacao}` : ""}
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