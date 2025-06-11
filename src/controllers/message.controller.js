import * as messageService from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { phone, message } = req.body;
    await messageService.sendGptMakerMessage({ phone, message });
    res
      .status(200)
      .json({
        success: true,
        message: "Mensagem enviada para a fila de processamento.",
      });
  } catch (error) {
    next(error);
  }
};
