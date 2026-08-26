import react from "@vitejs/plugin-react";
import { PluginOption } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react()];

  if (command === "serve") {
    const { default: mkcert } = await import("vite-plugin-mkcert");
    plugins.push(mkcert());
  }

  return {
    plugins,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts"],
    },
  };
});
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
