import react from "@vitejs/plugin-react";
import { PluginOption } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [react()];

  if (command === "serve" && !process.env.VITEST) {
    const { default: mkcert } = await import("vite-plugin-mkcert");
    plugins.push(mkcert());
  }

  const isContainer: boolean = process.env.IS_DOCKER === "true";

  return {
    plugins,
    envDir: isContainer ? "./" : "../",
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
