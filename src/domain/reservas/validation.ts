import { z } from "zod";

export const reservaRegisterSchema = z.object({
  hospedeId: z.number({ required_error: "validation.hospedeId.required" }).int().positive("validation.hospedeId.positive"),
  quartoId: z.number({ required_error: "validation.quartoId.required" }).int().positive("validation.quartoId.positive"),
  dataEntrada: z.string().trim().min(1, "validation.dataEntrada.required"),
  dataSaida: z.string().trim().min(1, "validation.dataSaida.required"),
  status: z.enum(["PENDENTE", "CONFIRMADA", "CANCELADA"], {
    errorMap: () => ({ message: "validation.status.invalid" }),
  }),
});

export type ReservaRegisterFormData = z.infer<typeof reservaRegisterSchema>;
