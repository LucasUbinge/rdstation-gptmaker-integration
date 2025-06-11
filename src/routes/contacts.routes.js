import { Router } from "express";
import * as contactController from "../controllers/contact.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { newContactSchema } from "../schemas/contact.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Contact Receiver
 *     description: Endpoints para receber notificações de webhooks
 */

/**
 * @swagger
 * /contacts/receiver:
 *   post:
 *     summary: Endpoint receptor para webhooks de novos contatos
 *     tags: [Contact Receiver]
 *     description: |
 *       Este endpoint NÃO deve ser chamado diretamente por um usuário.
 *       É a URL que deve ser configurada no RD Station CRM para receber notificações de eventos, como 'contact.create'.
 *     requestBody:
 *       description: Payload enviado pelo webhook do RD Station CRM.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewContact'
 *     responses:
 *       200:
 *         description: Notificação recebida e processada com sucesso.
 *       400:
 *         description: Erro de validação nos dados enviados.
 *       500:
 *         description: Erro interno ao processar a notificação.
 */
router.post(
  "/receiver",
  validate(newContactSchema),
  contactController.receiveNewContact
);

export default router;
