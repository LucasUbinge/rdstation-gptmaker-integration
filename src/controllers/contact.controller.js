import * as contactService from "../services/contact.service.js";

/**
 * Controlador para receber a notificação de novo contato do webhook.
 */
export const receiveNewContact = async (req, res, next) => {
  try {
    console.log("CONTROLLER: Requisição de novo contato recebida.");
    const contactData = req.body;

    // Passa os dados para o serviço processar
    console.log("DADOS RECEBIDOS:", JSON.stringify(contactData, null, 2));

    await contactService.processNewContact(contactData);

    res.status(200).json({ message: "Webhook recebido com sucesso." });
  } catch (error) {
    console.error("CONTROLLER: Erro ao processar webhook de contato.", error);
    next(error);
  }
};
