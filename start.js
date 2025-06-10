import "dotenv/config";
import { exec } from "child_process";
import ngrok from "ngrok";

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

/**
 * Inicia o servidor da aplicação Express.
 */
const startServer = () => {
  const serverProcess = exec("node src/api.js");

  serverProcess.stdout.on("data", (data) => console.log(data.toString()));
  serverProcess.stderr.on("data", (data) => console.error(data.toString()));
};

/**
 * Inicia o Ngrok, atualiza a URL do servidor e então inicia o servidor Express.
 */
const startDevEnvironment = async () => {
  try {
    const url = await ngrok.connect({
      addr: PORT,
      authtoken: process.env.NGROK_AUTH_TOKEN,
    });

    console.log(`✅ NGROK ativo: ${url}`);
    
    // Define a URL do servidor para que o Swagger e outras partes da app a utilizem
    process.env.SERVER_URL = url;

    console.log(`🌐 Swagger disponível em: ${url}/api-docs`);

    startServer();
  } catch (err) {
    console.error("❌ Erro ao iniciar o ngrok:", err.message);
    process.exit(1);
  }
};

// --- Ponto de Entrada ---
if (isProduction) {
  console.log("🚀 Iniciando em modo de produção...");
  startServer();
} else {
  console.log("🔧 Iniciando em modo de desenvolvimento com Ngrok...");
  startDevEnvironment();
}