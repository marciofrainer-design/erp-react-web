import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { SelectRepository } from "@/components/select/SelectRepository";
import { uhRegisterSchema } from "@/domain/uh/validation";
import type { Uh } from "@/domain/uh/types";
import type { UHTipo } from "@/domain/uhTipo/types";
import type { Edificacao } from "@/domain/edificacao/types";
import type { CrudDetailRegisterRenderProps } from "@/components/crud/tabs/types";
import { useEffect, useRef } from "react";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { UH_TIPO_MAPPER } from "@/pages/uh/consts";
import type { Repository } from "@/infra/interface/types";

type UhDetailRegisterProps = CrudDetailRegisterRenderProps<Uh> & {
  repositories: {
    uhTipoRepository: Repository<UHTipo>;
    edificacaoRepository: Repository<Edificacao>;
  };
};

/**
 * Formulário de UH utilizado como detalhe dentro de UHClassificacao.
 * Não usa CrudRegister (o CrudDetailSection já fornece o form wrapper).
 */
export function UhDetailRegister({ data, onChange, repositories }: UhDetailRegisterProps) {
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
    firstCmpFocus.current?.focus();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
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
        onChange={(v) => onChange("iduhtipo", Number(v))}
        lazy
        initialLabel={data.nmuhtipo}
      />
      <SelectRepository<Edificacao>
        repository={repositories.edificacaoRepository}
        mapper={{ valueKey: "idedificacao", labelKeys: ["cdedificacao", "nmedificacao"] }}
        label={t("inputs.buiding", { ns: "edificacao" })}
        value={String(data.idedificacao || "")}
        onChange={(v) => onChange("idedificacao", Number(v))}
        lazy
        initialLabel={data.empresa_dsabreviatura ? `${data.empresa_dsabreviatura} - ${data.nmedificacao}` : ""}
      />
    </div>
  );
}
