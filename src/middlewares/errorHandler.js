export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Loga o erro completo para debug interno

  const statusCode = err.statusCode || 500;

  // Se for um erro do servidor (não intencional), envie uma mensagem genérica
  const message =
    statusCode === 500 ? "Ocorreu um erro interno no servidor." : err.message;

  res.status(statusCode).json({
    error: message,
  });
};
