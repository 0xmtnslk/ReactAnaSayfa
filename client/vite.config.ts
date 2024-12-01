import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    cors: true,
    hmr: {
      clientPort: 443,
    },
  },
  envPrefix: "VITE_",
  define: {
    'process.env': process.env
  }
});