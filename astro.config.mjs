// @ts-check
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.cdimaquinarias.com",
  output: "static",
  adapter: vercel(),
  trailingSlash: "always",
  integrations: [sitemap()],
  env: {
    schema: {
      SMTP_HOST: envField.string({ context: "server", access: "secret", optional: true }),
      SMTP_PORT: envField.number({ context: "server", access: "secret", default: 465 }),
      SMTP_SECURE: envField.boolean({ context: "server", access: "secret", default: true }),
      SMTP_USER: envField.string({ context: "server", access: "secret", optional: true }),
      SMTP_PASS: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_TO: envField.string({
        context: "server",
        access: "secret",
        default: "cdi@cdimaquinarias.com",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
