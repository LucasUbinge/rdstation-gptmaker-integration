import { z } from "zod";

export const newContactSchema = z.object({
  body: z.object({
    contacts: z
      .array(
        z
          .object({
            // Garante a existência de um array 'phones' com pelo menos um objeto,
            // e que este objeto tenha uma propriedade 'phone' do tipo string.
            phones: z
              .array(
                z.object({
                  phone: z.string({
                    required_error: 'A propriedade "phone" é obrigatória.',
                  }),
                })
              )
              .min(1, "A lista de telefones não pode ser vazia."),
          })
          .catchall(z.any()) // Permite qualquer outro campo no objeto (como name, id, etc.)
      )
      .min(1, "O payload deve conter pelo menos um contato."),
  }),
});
