export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Dados inválidos.",
      // Usar o método flatten() do Zod para uma resposta de erro mais estruturada
      details: error.flatten(),
    });
  }
};
