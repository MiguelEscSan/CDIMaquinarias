import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Mirrors compilerOptions.paths in tsconfig.json: Vitest does not read tsconfig aliases.
const src = (folder: string) => fileURLToPath(new URL(`./src/${folder}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@presentation": src("presentation"),
      "@server": src("server"),
      "@content": src("content"),
      "@shared": src("shared"),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
