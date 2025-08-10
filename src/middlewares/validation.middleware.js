export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      error: "válidos.",
      // Usar o método flatten() do Zod para uma resposta de erro mais estruturada
      details: error.flatten(),
    });
  }
};
