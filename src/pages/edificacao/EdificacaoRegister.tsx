import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { edificacaoRegisterSchema } from "@/domain/edificacao/validation";
import type { EdificacaoRegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function EdificacaoRegister({ data, onChange }: EdificacaoRegisterProps) {
  const { t } = useAppTranslation("edificacao");
  const validation = edificacaoRegisterSchema.safeParse(data);
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
      title={data.idedificacao ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputStringBase
          ref={firstCmpFocus}
          label={t("inputs.identificator")}
          value={data.cdedificacao}
          error={errors.cdedificacao?.[0]}
          onChange={(e) => onChange("cdedificacao", e.target.value)}
        />
        <InputStringBase
          label={t("inputs.nameLabel")}
          value={data.nmedificacao}
          error={errors.nmedificacao?.[0]}
          onChange={(e) => onChange("nmedificacao", e.target.value)}
        />
      </div>
    </CrudRegister>
  );
}
