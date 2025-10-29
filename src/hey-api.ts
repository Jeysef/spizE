import { env } from "~/env";
import type { CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  auth: env.VITE_AUTH_TOKEN,
  baseUrl: env.DEV ? "/api" : env.VITE_API_BASE_URL,
});
