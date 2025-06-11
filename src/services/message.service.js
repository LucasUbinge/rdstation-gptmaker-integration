import gptmakerApi from "../config/gptmakerApi.js";
import { env } from "../config/env.js"; // Assumindo que você implementou o env centralizado
import ApiServiceError from "../errors/ApiServiceError.js";

export const sendGptMakerMessage = async ({ phone, message }) => {
  try {
    const bodyGPTMaker = { phone, message };
    console.log(
      "Enviando para o GPTMaker:",
      JSON.stringify(bodyGPTMaker, null, 2)
    );

    await gptmakerApi.post(
      `/channel/${env.GPTMAKER_CHANNEL_ID}/start-conversation`,
      bodyGPTMaker
    );

    console.log(`Mensagem para ${phone} enviada com sucesso!`);
    return { success: true };
  } catch (error) {
    const errMsg = error.response?.data || error.message;
    console.error("Erro ao enviar mensagem para o GPTMaker:", errMsg);
    throw new ApiServiceError(
      "Falha ao se comunicar com o serviço de mensagens.",
      502
    );
  }
};
