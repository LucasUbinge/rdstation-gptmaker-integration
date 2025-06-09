import { Router } from "express";
import webhookRoutes from "./webhook.routes.js";
import contactRoutes from "./contacts.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

// Agrupa as rotas de webhook sob o endpoint /webhooks
router.use("/webhooks", webhookRoutes);

// Agrupa as rotas para RECEBER notificações de contatos
router.use("/contacts", contactRoutes);

export default router;
