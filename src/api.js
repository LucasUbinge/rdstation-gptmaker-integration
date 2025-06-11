import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import mainRouter from "./routes/index.routes.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = env.PORT || 3000;
const SERVER_URL = env.SERVER_URL || `http://localhost:${PORT}`;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API com prefixo /api/v1
app.use("/api/v1", mainRouter);

// Rota do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em ${SERVER_URL}`);
  console.log(`📚 Documentação Swagger: ${SERVER_URL}/api-docs`);
});
