import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist-server",
    rollupOptions: {
      input: {
        "entry-server": resolve(__dirname, "src/entry-server.tsx"),
      },
      output: {
        format: "esm",
        entryFileNames: "[name].js",
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
