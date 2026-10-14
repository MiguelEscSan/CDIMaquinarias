// @ts-check
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { sitemapLinks } from "./src/content/i18n/sitemap.ts";

const site = "https://www.cdimaquinarias.com";

export default defineConfig({
  site,
  output: "static",
  // No astro:assets images yet; avoids the Cloudflare Images (IMAGES) binding.
  adapter: cloudflare({ imageService: "passthrough" }),
  // No Astro sessions are used; skips the adapter's default SESSION KV binding.
  session: false,
  trailingSlash: "always",
  // Rental has no service page of its own: its old service URLs go to the renting page.
  redirects: {
    "/servicios/alquiler/": "/renting/",
    "/en/services/rental/": "/en/rental/",
    "/de/dienstleistungen/vermietung/": "/de/vermietung/",
    "/servicios/ventas/": "/productos/",
    "/en/services/sales/": "/en/products/",
    "/de/dienstleistungen/verkauf/": "/de/produkte/",
  },
  // Spanish is unprefixed (original URLs); other locales live under /<locale>/ with translated slugs.
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "de"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // Translated slugs differ per locale, so alternates come from the route map (not sitemap's own i18n option).
    sitemap({
      serialize(item) {
        const links = sitemapLinks(item.url, site);
        return links.length > 0 ? { ...item, links } : item;
      },
    }),
  ],
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
