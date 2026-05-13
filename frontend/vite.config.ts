import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import mkcert from "vite-plugin-mkcert";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
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
});
