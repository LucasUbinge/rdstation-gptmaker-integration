import ngrok from "ngrok";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

try {
  const url = await ngrok.connect({
    addr: PORT,
    authtoken: process.env.NGROK_AUTH_TOKEN,
  });

  console.log(`✅ NGROK ativo: ${url}`);

  const envFile = fs.readFileSync(".env", "utf-8");
  const updatedEnv = envFile.replace(
    /SWAGGER_SERVER_URL=.*/g,
    `SWAGGER_SERVER_URL=${url}`
  );
  fs.writeFileSync(".env", updatedEnv);
  console.log("✅ .env atualizado com a URL do NGROK.");

  console.log(`🌐 Swagger disponível em: ${url}/api-docs`);
} catch (err) {
  console.error("Erro ao iniciar o ngrok:", err.message);
  process.exit(1);
}
