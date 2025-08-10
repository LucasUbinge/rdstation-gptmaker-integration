import { templates } from "../config/templates.js";
import { sendGptMakerMessage } from "./message.service.js"; // Importe a nova função

export const processNewContact = async (contactData) => {
  const contact = contactData;

  if (!contact.phone) {
    console.warn("Webhook recebido sem telefone. Ação cancelada.");
    return;
  }

  const name = contact.name || "novo contato";
  const phone = contact.phone;
  const message = templates.welcome(name);

  // Delega o envio para o serviço de mensagem
  await sendGptMakerMessage({ phone, message });
};
