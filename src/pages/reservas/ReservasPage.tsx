import { ReservaColumns } from "@/domain/reservas/types";
import type { Reserva, ReservaAll } from "@/domain/reservas/types";
import { CrudPageBase, CrudRegister, HelpPanel } from "@/components/crud";
import type { HelpField } from "@/components/crud";
import type { CrudMode } from "@/components/crud/types";
import ReservasFactory from "@/domain/reservas/ReservasFactory";
import { reservaRegisterSchema } from "@/domain/reservas/validation";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { useState } from "react";

type ReservasPageProps = {
  onModeChange?: (mode: CrudMode) => void;
};

function ReservaRegister({
  data,
  onChange,
}: {
  mode: "view" | "new" | "clone";
  data: Reserva;
  onChange: <K extends keyof Reserva>(field: K, value: Reserva[K]) => void;
}) {
  const { t } = useAppTranslation("reservas");
  const [activeField, setActiveField] = useState<string | undefined>();

  const validation = reservaRegisterSchema.safeParse(data);
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
    { fieldName: "hospedeId", title: t("help.hospedeId.title"), description: t("help.hospedeId.description"), example: t("help.hospedeId.example") },
    { fieldName: "quartoId", title: t("help.quartoId.title"), description: t("help.quartoId.description"), example: t("help.quartoId.example") },
    { fieldName: "dataEntrada", title: t("help.dataEntrada.title"), description: t("help.dataEntrada.description"), example: t("help.dataEntrada.example") },
    { fieldName: "dataSaida", title: t("help.dataSaida.title"), description: t("help.dataSaida.description"), example: t("help.dataSaida.example") },
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
          label={t("inputs.hospedeId")}
          value={String(data.hospedeId || "")}
          error={errors.hospedeId?.[0]}
          onChange={(e) => onChange("hospedeId", Number(e.target.value) as Reserva["hospedeId"])}
          onFocus={() => setActiveField("hospedeId")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.quartoId")}
          value={String(data.quartoId || "")}
          error={errors.quartoId?.[0]}
          onChange={(e) => onChange("quartoId", Number(e.target.value) as Reserva["quartoId"])}
          onFocus={() => setActiveField("quartoId")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.dataEntrada")}
          value={data.dataEntrada}
          error={errors.dataEntrada?.[0]}
          onChange={(e) => onChange("dataEntrada", e.target.value)}
          onFocus={() => setActiveField("dataEntrada")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.dataSaida")}
          value={data.dataSaida}
          error={errors.dataSaida?.[0]}
          onChange={(e) => onChange("dataSaida", e.target.value)}
          onFocus={() => setActiveField("dataSaida")}
          onBlur={() => setActiveField(undefined)}
        />
        <InputStringBase
          label={t("inputs.status")}
          value={data.status}
          error={errors.status?.[0]}
          onChange={(e) => onChange("status", e.target.value as Reserva["status"])}
          onFocus={() => setActiveField("status")}
          onBlur={() => setActiveField(undefined)}
        />
      </div>
    </CrudRegister>
  );
}

export function ReservasPage({ onModeChange }: ReservasPageProps) {
  const dependencies = ReservasFactory.dependencies();

  return (
    <CrudPageBase<Reserva, ReservaAll>
      namespace="reservas"
      columns={ReservaColumns}
      createNewItem={() => ReservasFactory.createBlankReserva()}
      dependencies={dependencies}
      validate={(data) => reservaRegisterSchema.safeParse(data).success}
      onModeChange={onModeChange}
      register={({ mode, data, onChange }) => (
        <ReservaRegister mode={mode} data={data} onChange={onChange} />
      )}
    />
  );
}
