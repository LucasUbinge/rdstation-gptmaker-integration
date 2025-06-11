import swaggerJSDoc from "swagger-jsdoc";
import { property } from "zod/v4";

// A URL é obtida da variável de ambiente, que será definida pelo start.js ou pelo Render.
const serverUrl = process.env.SERVER_URL || "http://localhost:3000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Integração com RD Station CRM",
      version: "1.0.0",
      description:
        "API para criar e gerenciar webhooks no RD Station CRM e receber notificações de contatos.",
    },
    servers: [
      {
        url: serverUrl,
        description: "Servidor Atual",
      },
    ],
    components: {
      schemas: {
        CreateWebhook: {
          type: "object",
          properties: {
            event_type: {
              type: "string",
              example: "crm_contact_created",
            },
            http_method: {
              type: "string",
              example: "POST",
            },
            url: {
              type: "string",
              format: "uri",
              example: `${serverUrl}/api/v1/contacts/receiver`,
            },
          },
          required: ["event_type", "http_method", "url"],
        },
        Webhook: {
          type: "object",
          properties: {
            id: { type: "string" },
            event_type: { type: "string" },
            url: { type: "string" },
            http_method: { type: "string" },
          },
        },
        CreateContact: {
          type: "object",
          properties: {
            phone: {
              type: "string",
              example: "44999999999",
            },
            message: {
              type: "string",
              example: "Mensagem de boas-vindas.",
            },
          },
          required: ["message", "phone"],
        },
        Contact: {
          type: "object",
          properties: {
            phone: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
