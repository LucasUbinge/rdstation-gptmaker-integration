import { z } from "zod";

// Esquema de validação para o novo formato de webhook
export const createWebhookSchema = z.object({
  body: z.object({
    // Valida o tipo de evento. Ex: "crm_contact_created"
    event_type: z.string({
      required_error: "O campo 'event_type' é obrigatório.",
    }),

    // Valida o método HTTP, geralmente POST para webhooks
    http_method: z.enum(["POST", "PUT"], {
      errorMap: () => ({ message: "O método HTTP deve ser POST ou PUT." }),
    }),

    // Valida a URL de notificação
    url: z
      .string({ required_error: "A URL é obrigatória." })
      .url({ message: "A URL fornecida é inválida." }),
  }),
});
