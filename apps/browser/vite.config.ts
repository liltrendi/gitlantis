import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@/packages/components": path.resolve(
        __dirname,
        "node_modules/@gitlantis/components/src"
      ),
      "@/packages/shared/global.css": path.resolve(
        __dirname,
        "../../packages/shared/src/global.css"
      ),
      "@/packages/shared": "@gitlantis/shared",
      "@/browser": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../extension/out",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
  },
});
