import { CrudRegister, HelpPanel } from "@/components/crud";
import type { HelpField } from "@/components/crud";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { andarRegisterSchema } from "@/domain/andar/validation";
import type { AndarRegisterProps } from "./types";
import { useEffect, useRef, useState } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";

export function AndarRegister({ data, onChange }: AndarRegisterProps) {
  const { t } = useAppTranslation("andar");
  const [activeField, setActiveField] = useState<string | undefined>();
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

  const helpFields: HelpField[] = [
    {
      fieldName: "nmandar",
      title: "Nome do Andar",
      description: "Nome completo do andar como será exibido em relatórios e listagens. Ex: Primeiro Andar, Térreo.",
      example: "Ex: Segundo Andar",
    },
    {
      fieldName: "cdandar",
      title: "Identificação",
      description: "Código curto e único para identificar o andar internamente. Aceita letras, números, _ e -.",
      example: "Ex: 2A, TERREO, PISO-1",
    },
  ];

  return (
    <CrudRegister
      title={data.idandar ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
      helpPanel={<HelpPanel fields={helpFields} activeField={activeField} />}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <InputStringBase
            ref={firstCmpFocus}
            label={t("inputs.nameLabel")}
            value={data.nmandar}
            error={errors.nmandar?.[0]}
            onChange={(e) => onChange("nmandar", e.target.value)}
            onFocus={() => setActiveField("nmandar")}
            onBlur={() => setActiveField(undefined)}
          />
          <InputStringBase
            label={t("inputs.identificator")}
            value={data.cdandar}
            error={errors.cdandar?.[0]}
            onChange={(e) => onChange("cdandar", e.target.value)}
            onFocus={() => setActiveField("cdandar")}
            onBlur={() => setActiveField(undefined)}
          />
        </div>
    </CrudRegister>
  );
}
