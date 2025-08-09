import * as webhookService from "../services/webhook.service.js";

// Criar um webhook
export const createWebhook = async (req, res, next) => {
  try {
    const newWebhook = await webhookService.create(req.body);

    res.status(201).json(newWebhook);
  } catch (error) {
    next(error);
  }
};

// Listar webhook
export const getAllWebhooks = async (req, res, next) => {
  try {
    const allWebhooks = await webhookService.findAll();
    res.status(200).json(allWebhooks);
  } catch (error) {
    next(error);
  }
};

// Deletar um webhook
export const deleteWebhook = async (req, res, next) => {
  try {
    const { id } = req.params;
    await webhookService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const receiveWebhookNotification = async (req, res, next) => {
  try {
    const { event_type, data } = req.body;

    if (event_type === "crm_contact_created" && data) {
      const contact = data;
      const phone = contact.mobile_phone || contact.phone;
      const name = contact.name || "Novo contato";

      if (phone) {
        const welcomeMessage = `Olá ${name}! 👋 Seja bem-vindo(a)! Obrigado por se cadastrar conosco. Em breve entraremos em contato para te ajudar com o que precisar.`;

        await messageService.sendGptMakerMessage({
          phone: phone,
          message: welcomeMessage,
        });
      }
    }

    res.status(200).json({
      status: "success",
      message: "Webhook processado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};
