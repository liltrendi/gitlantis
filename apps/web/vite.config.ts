import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@extension": path.resolve(__dirname, "../extension/src"),
    },
  },
  build: {
    outDir: "../extension/out",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
  },
});
