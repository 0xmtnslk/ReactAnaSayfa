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
  },
  define: {
    'VITE_MAINNET_JSON_URL': JSON.stringify(process.env.VITE_MAINNET_JSON_URL),
    'VITE_TESTNET_JSON_URL': JSON.stringify(process.env.VITE_TESTNET_JSON_URL)
  }
});
