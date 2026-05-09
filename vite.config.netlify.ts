// Netlify-only Vite config. Used when self-hosting on Netlify.
// Run with: npx vite build --config vite.config.netlify.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ target: "netlify" }),
    react(),
  ],
});
