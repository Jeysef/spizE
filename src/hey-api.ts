import { env } from "~/env";
import type { CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  auth: env.VITE_AUTH_TOKEN,
});
