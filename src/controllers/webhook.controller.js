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
