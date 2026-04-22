import { z } from "zod";

export const hospedeRegisterSchema = z.object({
  nome: z.string().trim().min(3, "validation.nome.min").max(120, "validation.nome.max"),
  documento: z.string().trim().min(5, "validation.documento.min").max(30, "validation.documento.max"),
  telefone: z.string().trim().min(8, "validation.telefone.min").max(20, "validation.telefone.max"),
  email: z.string().trim().email("validation.email.invalid"),
});

export type HospedeRegisterFormData = z.infer<typeof hospedeRegisterSchema>;
