import { z } from "zod";

export const sendMessageSchema = z.object({
  body: z.object({
    phone: z.string().min(10, "O telefone deve ter no mínimo 10 dígitos."),
    message: z.string().min(1, "A mensagem não pode ser vazia."),
  }),
});
