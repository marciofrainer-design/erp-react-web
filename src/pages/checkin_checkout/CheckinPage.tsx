import { CheckinColumns } from "@/domain/checkin_checkout/types";
import type { Checkin, CheckinAll } from "@/domain/checkin_checkout/types";
import { CrudPageBase, CrudRegister, HelpPanel } from "@/components/crud";
import type { HelpField } from "@/components/crud";
import type { CrudMode } from "@/components/crud/types";
import CheckinFactory from "@/domain/checkin_checkout/CheckinFactory";
import { checkinRegisterSchema } from "@/domain/checkin_checkout/validation";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useState } from "react";

type CheckinPageProps = {
  onModeChange?: (mode: CrudMode) => void;
};

function CheckinRegister({
  data,
  onChange,
}: {
  mode: "view" | "new" | "clone";
  data: Checkin;
  onChange: <K extends keyof Checkin>(field: K, value: Checkin[K]) => void;
}) {
  const { t } = useAppTranslation("checkin");
  const [activeField, setActiveField] = useState<string | undefined>();

  const validation = checkinRegisterSchema.safeParse(data);
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
    { fieldName: "reservaId", title: t("help.reservaId.title"), description: t("help.reservaId.description"), example: t("help.reservaId.example") },
    { fieldName: "dataCheckIn", title: t("help.dataCheckIn.title"), description: t("help.dataCheckIn.description"), example: t("help.dataCheckIn.example") },
    { fieldName: "dataCheckOut", title: t("help.dataCheckOut.title"), description: t("help.dataCheckOut.description"), example: t("help.dataCheckOut.example") },
    { fieldName: "status", title: t("help.status.title"), description: t("help.status.description"), example: t("help.status.example") },
  ];

  return (
    <CrudRegister
      title={data.id ? t("crud.editLabel") : t("crud.createLabel")}
      description={t("crud.subtitle")}
      helpPanel={<HelpPanel fields={helpFields} activeField={activeField} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <InputStringBase
          label={t("inputs.reservaId")}
          value={String(data.reservaId || "")}
          error={errors.reservaId?.[0]}
          onChange={(e) => onChange("reservaId", Number(e.target.value) as Checkin["reservaId"])}
          onFocus={() => setActiveField("reservaId")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.status")}
          value={data.status}
          error={errors.status?.[0]}
          onChange={(e) => onChange("status", e.target.value as Checkin["status"])}
          onFocus={() => setActiveField("status")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.dataCheckIn")}
          value={data.dataCheckIn}
          error={errors.dataCheckIn?.[0]}
          onChange={(e) => onChange("dataCheckIn", e.target.value)}
          onFocus={() => setActiveField("dataCheckIn")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.dataCheckOut")}
          value={data.dataCheckOut ?? ""}
          error={errors.dataCheckOut?.[0]}
          onChange={(e) => onChange("dataCheckOut", e.target.value)}
          onFocus={() => setActiveField("dataCheckOut")}
          onBlur={() => setActiveField(undefined)}
        />
      </div>
    </CrudRegister>
  );
}

export function CheckinPage({ onModeChange }: CheckinPageProps) {
  const dependencies = CheckinFactory.dependencies();

  return (
    <CrudPageBase<Checkin, CheckinAll>
      namespace="checkin"
      columns={CheckinColumns}
      createNewItem={() => CheckinFactory.createBlankCheckin()}
      dependencies={dependencies}
      validate={(data) => checkinRegisterSchema.safeParse(data).success}
      onModeChange={onModeChange}
      register={({ mode, data, onChange }) => (
        <CheckinRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
