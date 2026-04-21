import { z } from "zod";

export const caracteristicaRegisterSchema = z.object({
  dscaracteristica: z
    .string()
    .trim()
    .min(1, "validation.dscaracteristica.required")
    .max(255, "validation.dscaracteristica.max"),
  dsabreviatura: z
    .string()
    .trim()
    .min(1, "validation.dsabreviatura.required")
    .max(50, "validation.dsabreviatura.max")
    .regex(/^[A-Za-z0-9_\-\s]+$/, "validation.dsabreviatura.pattern"),
  fltipo: z.number().int().min(1, "validation.fltipo.required"),
  idcaracteristica_emp: z.number().int().nonnegative(),
  flsituacao: z.number().int().min(0).max(1),
});

export type CaracteristicaRegisterFormData = z.infer<typeof caracteristicaRegisterSchema>;
