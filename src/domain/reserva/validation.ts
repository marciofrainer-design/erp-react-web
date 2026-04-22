import { z } from "zod";

export const reservaRegisterSchema = z.object({
  idhospede: z
    .number({ required_error: "validation.idhospede.required" })
    .min(1, "validation.idhospede.required"),
  iduh: z
    .number({ required_error: "validation.iduh.required" })
    .min(1, "validation.iduh.required"),
  dtentrada: z
    .string()
    .trim()
    .min(1, "validation.dtentrada.required"),
  dtsaida: z
    .string()
    .trim()
    .min(1, "validation.dtsaida.required"),
  nmobservacao: z
    .string()
    .trim()
    .max(500, "validation.nmobservacao.max")
    .optional()
    .default(""),
});

export type ReservaRegisterFormData = z.infer<typeof reservaRegisterSchema>;
