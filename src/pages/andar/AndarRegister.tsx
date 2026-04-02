import { CrudRegister } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { andarRegisterSchema } from "@/domain/andar/validation";
import type { AndarRegisterProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function AndarRegister({ data, onChange }: AndarRegisterProps) {
  const { t } = useAppTranslation("andar");
  const validation = andarRegisterSchema.safeParse(data);
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
      title={data.idandar ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputStringBase
            ref={firstCmpFocus}
            label={t("inputs.nameLabel")}
            value={data.nmandar}
            error={errors.nmandar?.[0]}
            onChange={(e) => onChange("nmandar", e.target.value)}
          />
          <InputStringBase
            label={t("inputs.identificator")}
            value={data.cdandar}
            error={errors.cdandar?.[0]}
            onChange={(e) => onChange("cdandar", e.target.value)}
          />
        </div>
    </CrudRegister>
  );
}
