import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/popup": path.resolve(__dirname, "./popup"),
      "@/db": path.resolve(__dirname, "./db"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: new URL("./popup/index.html", import.meta.url).pathname,
        config: new URL("./config/index.html", import.meta.url).pathname,
        blocked: new URL("./blocked/index.html", import.meta.url).pathname,
        background: new URL("./backgroundService/index.js", import.meta.url)
          .pathname,

      },
      output: {
        entryFileNames: "[name]/[name].js",
      },
    },
  },
});
