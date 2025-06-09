// Middleware genérico para validar requisições com Zod
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
      details: error.errors,
    });
  }
};
