import gptmakerApi from "../config/gptmakerApi.js";
import { templates } from "../config/templates.js";

/**
 * Processa os dados de um novo contato recebido pelo webhook.
 * @param {object} contactData - Os dados do contato enviados pelo RD Station.
 * @returns {Promise<object>} Um objeto indicando o sucesso do processamento.
 */
export const processNewContact = async (contactData) => {
  console.log("SERVICE: Processando os dados do novo contato...");

  // 2. Extrai o primeiro contato do payload do webhook
  const contact = contactData?.contacts?.[0];

  if (!contact || !contact.name || !contact.phones?.[0]?.phone) {
    console.warn("Webhook recebido sem nome ou telefone. Ação cancelada.");
    return;
  }

  // 3. Extrai o nome e o telefone
  const name = contact.name;
  const phone = contact.phones?.[0]?.phone;

  const mensagemPronta = templates.welcome(name);

  const bodyGPTMaker = {
    phone: phone,
    message: mensagemPronta,
  };

  // 4. Agora, enviamos esse body pronto para o GPTMaker
  try {
    const channelId = process.env.GPTMAKER_CHANNEL_ID;

    console.log(
      "Enviando para o GPTMaker o seguinte 'body':",
      JSON.stringify(bodyGPTMaker, null, 2)
    );

    await gptmakerApi.post(
      `/channels/${channelId}/start-conversation`,
      bodyGPTMaker
    );

    console.log(
      `Mensagem enviada para ${contact.name} (${phone}) com sucesso!`
    );
  } catch (error) {
    console.error(
      "Ocorreu um erro ao enviar a mensagem para o GPTMaker:",
      error.response?.data || error.message
    );
  }
};
