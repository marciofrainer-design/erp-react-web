import { z } from "zod";

export const andarRegisterSchema = z.object({
  nmandar: z
    .string()
    .trim()
    .min(3, "Nome deve ter no minimo 3 caracteres")
    .max(80, "Nome deve ter no maximo 80 caracteres"),
  cdandar: z
    .string()
    .trim()
    .min(1, "Identificador e obrigatorio")
    .max(20, "Identificador deve ter no maximo 20 caracteres")
    .regex(/^[A-Za-z0-9_-]+$/, "Use apenas letras, numeros, _ ou -"),
});

export type AndarRegisterFormData = z.infer<typeof andarRegisterSchema>;