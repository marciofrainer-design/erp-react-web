import { z } from "zod";

export const edificacaoRegisterSchema = z.object({
  cdedificacao: z
    .string()
    .trim()
    .min(1, "validation.cdedificacao.required")
    .max(50, "validation.cdedificacao.max")
    .regex(/^[A-Za-z0-9_\-\s]+$/, "validation.cdedificacao.pattern"),
  nmedificacao: z
    .string()
    .trim()
    .min(3, "validation.nmedificacao.min")
    .max(255, "validation.nmedificacao.max"),
});

export type EdificacaoRegisterFormData = z.infer<typeof edificacaoRegisterSchema>;
