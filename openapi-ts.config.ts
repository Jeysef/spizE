import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://spize.wranglers-software.sk/openapi.json",
  output: "src/client",
  plugins: [
    {
      name: "@hey-api/client-fetch",
      runtimeConfigPath: "~/hey-api.ts",
    },
    "zod",
    {
      name: "@hey-api/sdk",
      validator: true,
    },
    "@tanstack/solid-query",
  ],
});
