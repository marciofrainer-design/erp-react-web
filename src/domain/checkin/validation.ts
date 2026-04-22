import { z } from "zod";

export const checkinRegisterSchema = z.object({
  idreserva: z
    .number({ required_error: "validation.idreserva.required" })
    .min(1, "validation.idreserva.required"),
  dtcheckin: z
    .string()
    .trim()
    .min(1, "validation.dtcheckin.required"),
  dtcheckout: z
    .string()
    .trim()
    .nullable()
    .optional(),
});

export type CheckinRegisterFormData = z.infer<typeof checkinRegisterSchema>;
