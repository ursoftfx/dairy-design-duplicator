// Netlify-only Vite config. Used when self-hosting on Netlify.
// Nitro auto-detects Netlify (via the NETLIFY env var) and emits the
// correct serverless functions + publish dir.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    react(),
  ],
});
