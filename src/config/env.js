import { z } from "zod";

// 1. Define o schema para as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  SERVER_URL: z.string().url().optional(),
  API_BASE_URL: z.string().url(),
  API_TOKEN: z.string().min(1),
  GPTMAKER_API_KEY: z.string().min(1),
  GPTMAKER_CHANNEL_ID: z.string().min(1),
  NGROK_AUTH_TOKEN: z.string().optional(),
});

// 2. Valida process.env e lança um erro claro se algo estiver faltando
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Variáveis de ambiente inválidas:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Variáveis de ambiente inválidas.");
}

// 3. Exporta as variáveis validadas e tipadas
export const env = parsedEnv.data;
