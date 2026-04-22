import { z } from "zod";

export const checkinRegisterSchema = z.object({
  reservaId: z.number({ required_error: "validation.reservaId.required" }).int().positive("validation.reservaId.positive"),
  dataCheckIn: z.string().trim().optional(),
  dataCheckOut: z.string().trim().optional(),
  status: z.enum(["PENDENTE", "CHECKED_IN", "CHECKED_OUT"], {
    errorMap: () => ({ message: "validation.status.invalid" }),
  }),
});

export type CheckinRegisterFormData = z.infer<typeof checkinRegisterSchema>;
