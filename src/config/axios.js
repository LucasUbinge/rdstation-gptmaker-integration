import axios from "axios";
import { env } from "./env.js";

const externalApi = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

externalApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    token: env.API_TOKEN,
  };
  return config;
});

export default externalApi;
