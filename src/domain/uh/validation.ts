import { z } from "zod";

export const uhRegisterSchema = z.object({
  dsuh: z
    .string()
    .trim()
    .min(3, "validation.dsuh.min")
    .max(80, "validation.dsuh.max"),
  cduh: z
    .string()
    .trim()
    .min(1, "validation.cduh.required")
    .max(20, "validation.cduh.max")
    .regex(/^[A-Za-z0-9_\-\s]+$/, "validation.cduh.pattern"),
});

export type UhRegisterFormData = z.infer<typeof uhRegisterSchema>;
