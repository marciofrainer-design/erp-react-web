import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { uhclassificacaoRegisterSchema } from "@/domain/uhclassificacao/validation";
import type { UHClassificacaoRegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function UHClassificacaoRegister({ data, onChange }: UHClassificacaoRegisterProps) {
  const { t } = useAppTranslation("uhclassificacao");
  const validation = uhclassificacaoRegisterSchema.safeParse(data);
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
      title={data.iduhclassificacao ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputStringBase
          ref={firstCmpFocus}
          label={t("inputs.identificator")}
          value={data.dsidentificador}
          error={errors.dsidentificador?.[0]}
          onChange={(e) => onChange("dsidentificador", e.target.value)}
        />
        <InputStringBase
          label={t("inputs.nameLabel")}
          value={data.nmclassificacao}
          error={errors.nmclassificacao?.[0]}
          onChange={(e) => onChange("nmclassificacao", e.target.value)}
        />
      </div>
    </CrudRegister>
  );
}
