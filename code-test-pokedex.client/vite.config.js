import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default {
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5176",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
