import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { sendMessageSchema } from "../schemas/message.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: Endpoints para envio direto de mensagens
 */

/**
 * @swagger
 * /api/v1/messages/send:
 *   post:
 *     summary: Envia uma mensagem de texto diretamente para um número de telefone
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Número de telefone no formato internacional
 *               message:
 *                 type: string
 *                 description: Conteúdo da mensagem a ser enviada
 *             required:
 *               - phone
 *               - message
 *             example:
 *               phone: "5511999998888"
 *               message: "Esta é uma mensagem de teste direto."
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso.
 *       400:
 *         description: Dados inválidos (telefone ou mensagem faltando).
 */
router.post("/send", validate(sendMessageSchema), sendMessage);

export default router;
