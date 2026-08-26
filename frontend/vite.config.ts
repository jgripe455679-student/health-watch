import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { defineConfig } from "vitest/config";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === "serve" ? [mkcert()] : [])],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
}));
