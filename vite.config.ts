// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",          // ← important
    https: {
      key: fs.readFileSync('localhost+2-key.pem'),
      cert: fs.readFileSync('localhost+2.pem'),
    },
    cors: {
      origin: ["https://www.owlbear.rodeo", "https://owlbear.rodeo"],
      credentials: true,
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
