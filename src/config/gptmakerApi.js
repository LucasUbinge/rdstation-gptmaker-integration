import axios from "axios";

const gptmakerApi = axios.create({
  baseURL: "https://api.gptmaker.ai/v2",
  headers: {
    Authorization: `Bearer ${process.env.GPTMAKER_API_KEY}`,
    "Content-Type": "application/json",
  },
  timeout: 15000, // Timeout de 15 segundos
});

export default gptmakerApi;
