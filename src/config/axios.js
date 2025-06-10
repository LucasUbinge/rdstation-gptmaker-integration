import axios from "axios";
import "dotenv/config";

const externalApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

externalApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    token: process.env.API_TOKEN,
  };
  return config;
});

export default externalApi;
