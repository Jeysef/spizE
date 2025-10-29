import { defineConfig } from "@hey-api/openapi-ts";
import { loadEnv } from "vite";
import { validateEnv } from "./src/env.schema";

export default defineConfig(() => {
  const env = validateEnv(loadEnv("production", process.cwd()));

  return {
    input: `${env.VITE_API_BASE_URL}/openapi.json`,
    output: "src/client",
    plugins: [
      {
        name: "@hey-api/client-fetch",
        runtimeConfigPath: "~/hey-api",
      },
      "zod",
      {
        name: "@hey-api/sdk",
        validator: true,
      },
      "@tanstack/solid-query",
    ],
  };
});
