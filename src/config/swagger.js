import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Integração com RD Station CRM",
      version: "1.0.0",
      description: "API para criar webhooks no RD Station CRM.",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        // Schema ATUALIZADO para o corpo da requisição de criar webhook
        CreateWebhookPayload: {
          type: "object",
          properties: {
            event_type: {
              type: "string",
              description: "O tipo de evento que dispara o webhook.",
              example: "crm_contact_created",
            },
            http_method: {
              type: "string",
              description: "O método HTTP para a notificação.",
              example: "POST",
            },
            url: {
              type: "string",
              format: "uri",
              description: "A URL que receberá a notificação.",
              example:
                "https://sua-url-publica.ngrok.io/api/v1/contacts/receiver",
            },
          },
          required: ["event_type", "http_method", "url"],
        },
        // O schema de resposta pode ser simplificado ou mantido
        Webhook: {
          type: "object",
          properties: {
            id: { type: "string" },
            event_type: { type: "string" },
            url: { type: "string" },
            http_method: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
