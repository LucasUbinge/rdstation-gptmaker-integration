import ApiServiceError from "../errors/ApiServiceError.js";

export const errorHandler = (err, req, res, next) => {
  // Loga o erro completo para debug interno, independentemente do tipo
  console.error(err);

  if (err instanceof ApiServiceError) {
    // Se for um erro conhecido do nosso serviço, usamos o status code dele
    return res.status(err.statusCode || 500).json({
      error: err.message,
    });
  }

  // Para qualquer outro tipo de erro (inesperado), enviamos uma mensagem genérica
  return res.status(500).json({
    error: "Ocorreu um erro interno inesperado no servidor.",
  });
};
