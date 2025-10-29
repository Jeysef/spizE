import z, { parse } from "zod";

export const envOptionsSchema = {
  VITE_AUTH_TOKEN: z.string().min(1),
  VITE_API_BASE_URL: z.url(),
};
const envSchema = z.object(envOptionsSchema);

export const validateEnv = (env: Record<string, string>) => {
  return parse(envSchema, env);
};
