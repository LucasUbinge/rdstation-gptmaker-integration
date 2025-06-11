import { Router } from "express";
import * as webhookController from "../controllers/webhook.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createWebhookSchema } from "../schemas/webhook.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Webhooks
 *     description: Gerenciamento de Webhooks no RD Station CRM
 */

/**
 * @swagger
 * /api/v1/webhooks:
 *   post:
 *     summary: Cria um webhook para novos contatos
 *     tags: [Webhooks]
 *     description: Este endpoint registra uma URL para ser notificada sempre que um novo contato for criado no CRM.
 *     requestBody:
 *       required: true
 *       description: Dados do webhook a ser criado com os campos event_type, http_method e url.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWebhook'
 *     responses:
 *       201:
 *         description: Webhook criado com sucesso. Retorna o objeto do webhook criado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Webhook'
 *       400:
 *         description: Erro de validação nos dados enviados.
 *       422:
 *         description: Entidade ou evento inválido.
 */
router.post(
  "/",
  validate(createWebhookSchema),
  webhookController.createWebhook
);

/**
 * @swagger
 * /api/v1/webhooks:
 *   get:
 *     summary: Lista todos os webhooks do RD Station CRM
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: Lista de webhooks obtida com sucesso.
 */
router.get("/", webhookController.getAllWebhooks);

/**
 * @swagger
 * /api/v1/webhooks/{id}:
 *   delete:
 *     summary: Deleta um webhook
 *     tags:
 *       - Webhooks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do webhook a ser deletado
 *     responses:
 *       204:
 *         description: Webhook deletado com sucesso.
 *       404:
 *         description: Webhook não encontrado.
 */
router.delete("/:id", webhookController.deleteWebhook);

export default router;
