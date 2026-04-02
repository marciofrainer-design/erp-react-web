import { z } from "zod";

export const andarRegisterSchema = z.object({
  nmandar: z
    .string()
    .trim()
    .min(3, "validation.nmandar.min")
    .max(80, "validation.nmandar.max"),
  cdandar: z
    .string()
    .trim()
    .min(1, "validation.cdandar.required")
    .max(20, "validation.cdandar.max")
    .regex(/^[A-Za-z0-9_-\s]+$/, "validation.cdandar.pattern"),
});

export type AndarRegisterFormData = z.infer<typeof andarRegisterSchema>;