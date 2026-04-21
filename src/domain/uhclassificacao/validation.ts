import { z } from "zod";

export const uhclassificacaoRegisterSchema = z.object({
  dsidentificador: z
    .string()
    .trim()
    .min(1, "validation.dsidentificador.required")
    .max(50, "validation.dsidentificador.max")
    .regex(/^[A-Za-z0-9_\-\s]+$/, "validation.dsidentificador.pattern"),
  nmclassificacao: z
    .string()
    .trim()
    .min(3, "validation.nmclassificacao.min")
    .max(255, "validation.nmclassificacao.max"),
});

export type UHClassificacaoRegisterFormData = z.infer<typeof uhclassificacaoRegisterSchema>;
