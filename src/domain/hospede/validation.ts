import { z } from "zod";

export const hospedeRegisterSchema = z.object({
  nmnome: z
    .string()
    .trim()
    .min(3, "validation.nmnome.min")
    .max(120, "validation.nmnome.max"),
  cpcpf: z
    .string()
    .trim()
    .min(11, "validation.cpcpf.min")
    .max(14, "validation.cpcpf.max"),
  dtnascimento: z
    .string()
    .trim()
    .min(1, "validation.dtnascimento.required"),
  nmtelefone: z
    .string()
    .trim()
    .max(20, "validation.nmtelefone.max"),
  nmemail: z
    .string()
    .trim()
    .email("validation.nmemail.invalid")
    .max(120, "validation.nmemail.max"),
});

export type HospedeRegisterFormData = z.infer<typeof hospedeRegisterSchema>;
