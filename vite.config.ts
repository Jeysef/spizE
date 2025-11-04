import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import devtools from "solid-devtools/vite";
import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import { validateEnv } from "./src/env.schema";

export default defineConfig(({ mode }) => {
  const env = validateEnv(loadEnv(mode, process.cwd()));

  return {
    plugins: [devtools(), tailwindcss(), solidPlugin()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      target: "esnext",
      rolupOptions: {
        external: ["lucide-solid"]
      }
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
