// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",          // ← important
    cors: {
      origin: ["https://www.owlbear.rodeo", "https://owlbear.rodeo", "http://localhost:8000"],
      credentials: true,
    },
    // Add this header override just in case
    headers: {
      "Access-Control-Allow-Origin": ["https://www.owlbear.rodeo", "http://localhost:8000"],
      "Access-Control-Allow-Credentials": "true",
    },
    proxy: {
      '/characters': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    sourcemap: true,
  },
});
