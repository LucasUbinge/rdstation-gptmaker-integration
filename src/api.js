import "dotenv/config"; // Carrega as variáveis de ambiente no início de tudo
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import mainRouter from "./routes/index.routes.js"; // Roteador principal
import { errorHandler } from "./middlewares/errorHandler.js"; // Nosso novo tratador de erros

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares essenciais
app.use(express.json()); // Para interpretar corpos de requisição em JSON

// Rotas da API (usando o roteador principal)
app.use("/api/v1", mainRouter); // Adicionamos um prefixo de versão, uma ótima prática!

// Rota da documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
