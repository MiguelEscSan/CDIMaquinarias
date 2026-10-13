// @ts-check
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.cdimaquinarias.com",
  output: "static",
  // No astro:assets images yet; avoids the Cloudflare Images (IMAGES) binding.
  adapter: cloudflare({ imageService: "passthrough" }),
  // No Astro sessions are used; skips the adapter's default SESSION KV binding.
  session: false,
  trailingSlash: "always",
  // Spanish is unprefixed (original URLs); other locales live under /<locale>/ with translated slugs.
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
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
