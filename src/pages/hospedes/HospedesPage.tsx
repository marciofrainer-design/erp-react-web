import { HospedeColumns } from "@/domain/hospedes/types";
import type { Hospede, HospedeAll } from "@/domain/hospedes/types";
import { CrudPageBase, CrudRegister, HelpPanel } from "@/components/crud";
import type { HelpField } from "@/components/crud";
import type { CrudMode } from "@/components/crud/types";
import HospedesFactory from "@/domain/hospedes/HospedesFactory";
import { hospedeRegisterSchema } from "@/domain/hospedes/validation";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useState } from "react";

type HospedesPageProps = {
  onModeChange?: (mode: CrudMode) => void;
};

function HospedesRegister({
  data,
  onChange,
}: {
  mode: "view" | "new" | "clone";
  data: Hospede;
  onChange: <K extends keyof Hospede>(field: K, value: Hospede[K]) => void;
}) {
  const { t } = useAppTranslation("hospedes");
  const [activeField, setActiveField] = useState<string | undefined>();

  const validation = hospedeRegisterSchema.safeParse(data);
  const errors = validation.success
    ? {}
    : validation.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          const msg = t(issue.message, issue.message) as string;
          (acc[field] ??= []).push(msg);
        }
        return acc;
      }, {});

  const helpFields: HelpField[] = [
    { fieldName: "nome", title: t("help.nome.title"), description: t("help.nome.description"), example: t("help.nome.example") },
    { fieldName: "documento", title: t("help.documento.title"), description: t("help.documento.description"), example: t("help.documento.example") },
    { fieldName: "telefone", title: t("help.telefone.title"), description: t("help.telefone.description"), example: t("help.telefone.example") },
    { fieldName: "email", title: t("help.email.title"), description: t("help.email.description"), example: t("help.email.example") },
  ];

  return (
    <CrudRegister
      title={data.id ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
      helpPanel={<HelpPanel fields={helpFields} activeField={activeField} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <InputStringBase
          label={t("inputs.nome")}
          value={data.nome}
          error={errors.nome?.[0]}
          onChange={(e) => onChange("nome", e.target.value)}
          onFocus={() => setActiveField("nome")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.documento")}
          value={data.documento}
          error={errors.documento?.[0]}
          onChange={(e) => onChange("documento", e.target.value)}
          onFocus={() => setActiveField("documento")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.telefone")}
          value={data.telefone}
          error={errors.telefone?.[0]}
          onChange={(e) => onChange("telefone", e.target.value)}
          onFocus={() => setActiveField("telefone")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.email")}
          value={data.email}
          error={errors.email?.[0]}
          onChange={(e) => onChange("email", e.target.value)}
          onFocus={() => setActiveField("email")}
          onBlur={() => setActiveField(undefined)}
        />
      </div>
    </CrudRegister>
  );
}

export function HospedesPage({ onModeChange }: HospedesPageProps) {
  const dependencies = HospedesFactory.dependencies();

  return (
    <CrudPageBase<Hospede, HospedeAll>
      namespace="hospedes"
      columns={HospedeColumns}
      createNewItem={() => HospedesFactory.createBlankHospede()}
      dependencies={dependencies}
      validate={(data) => hospedeRegisterSchema.safeParse(data).success}
      onModeChange={onModeChange}
      register={({ mode, data, onChange }) => (
        <HospedesRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
