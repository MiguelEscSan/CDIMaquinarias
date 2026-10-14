import { describe, expect, it } from "vitest";
import { defaultLocale, isLocale, locales, resolveLocale } from "../../src/content/i18n/config";
import { routes } from "../../src/content/i18n/routes";
import {
  alternatesFor,
  getLocaleFromUrl,
  hreflangAlternates,
  localizedPath,
  pageIdFromPath,
} from "../../src/content/i18n";

const pageIds = Object.keys(routes) as (keyof typeof routes)[];

describe("route map", () => {
  it("covers the nine site pages and the five service pages", () => {
    expect(pageIds.sort()).toEqual(
      [
        "about",
        "alquiler-flota",
        "asesoramiento-especializado",
        "climatizacion",
        "contact",
        "cookies",
        "home",
        "legalNotice",
        "privacy",
        "products",
        "renting",
        "reparacion-mantenimiento",
        "services",
        "venta-maquinaria",
      ].sort(),
    );
  });

  it("gives every page a path for every locale, ending with a slash", () => {
    for (const id of pageIds) {
      for (const locale of locales) {
        const path = routes[id][locale];
        expect(path, `${id}/${locale}`).toMatch(/^\/.*\/$|^\/$/);
      }
    }
  });

  it("has no duplicate paths", () => {
    const all = pageIds.flatMap((id) => locales.map((locale) => routes[id][locale]));
    expect(new Set(all).size).toBe(all.length);
  });

  it("keeps the default locale unprefixed and prefixes the others", () => {
    for (const id of pageIds) {
      expect(routes[id][defaultLocale].startsWith("/en/")).toBe(false);
      for (const locale of locales.filter((l) => l !== defaultLocale)) {
        expect(routes[id][locale].startsWith(`/${locale}/`)).toBe(true);
      }
    }
  });

  it("keeps the original Spanish URLs", () => {
    expect(routes.home.es).toBe("/");
    expect(routes.about.es).toBe("/quienes-somos/");
    expect(routes.contact.es).toBe("/contacto/");
    expect(routes.cookies.es).toBe("/politica-de-cookies-1/");
  });
});

describe("locale config", () => {
  it("recognises supported locales only", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });

  it("falls back to the default locale", () => {
    expect(resolveLocale("en")).toBe("en");
    expect(resolveLocale("fr")).toBe(defaultLocale);
    expect(resolveLocale(undefined)).toBe(defaultLocale);
  });
});

describe("getLocaleFromUrl", () => {
  it("reads the locale prefix from a URL or pathname", () => {
    expect(getLocaleFromUrl(new URL("https://example.com/en/about-us/"))).toBe("en");
    expect(getLocaleFromUrl("/en/")).toBe("en");
    expect(getLocaleFromUrl("/en")).toBe("en");
    expect(getLocaleFromUrl("/en/contact/?_action=contact")).toBe("en");
  });

  it("returns the default locale for unprefixed paths", () => {
    expect(getLocaleFromUrl("/")).toBe("es");
    expect(getLocaleFromUrl("/quienes-somos/")).toBe("es");
    expect(getLocaleFromUrl("/english/")).toBe("es");
  });

  it("reads the German prefix", () => {
    expect(getLocaleFromUrl("/de/ueber-uns/")).toBe("de");
  });
});

describe("localizedPath", () => {
  it("returns the path of a page in a locale", () => {
    expect(localizedPath("about", "es")).toBe("/quienes-somos/");
    expect(localizedPath("about", "en")).toBe("/en/about-us/");
    expect(localizedPath("home", "en")).toBe("/en/");
  });
});

describe("alternatesFor", () => {
  it("lists one alternate per locale with its hreflang", () => {
    expect(alternatesFor("renting")).toEqual([
      { locale: "es", hreflang: "es", path: "/renting/" },
      { locale: "en", hreflang: "en", path: "/en/rental/" },
      { locale: "de", hreflang: "de", path: "/de/vermietung/" },
    ]);
  });

  it("adds x-default pointing to the default locale", () => {
    expect(hreflangAlternates("contact")).toEqual([
      { hreflang: "es", path: "/contacto/" },
      { hreflang: "en", path: "/en/contact/" },
      { hreflang: "de", path: "/de/kontakt/" },
      { hreflang: "x-default", path: "/contacto/" },
    ]);
  });
});

describe("pageIdFromPath", () => {
  it("finds the page for any localized path", () => {
    expect(pageIdFromPath("/")).toBe("home");
    expect(pageIdFromPath("/en/")).toBe("home");
    expect(pageIdFromPath("/politica-de-datos/")).toBe("privacy");
    expect(pageIdFromPath("/en/privacy-policy")).toBe("privacy");
    expect(pageIdFromPath("/en/contact/?equipo=recogepedidos")).toBe("contact");
  });

  it("returns undefined for unknown paths", () => {
    expect(pageIdFromPath("/no-existe/")).toBeUndefined();
  });
});

describe("page files", () => {
  it("are served for every localized route", async () => {
    // Static pages come from the catch-all route; contact has its own files (server-rendered form).
    // Service pages are rendered by the catch-all through the isServiceId guard.
    const { existsSync, readFileSync } = await import("node:fs");
    const catchAll = readFileSync("src/pages/[...slug].astro", "utf8");
    const serviceIds = ["reparacion-mantenimiento", "venta-maquinaria", "alquiler-flota", "asesoramiento-especializado", "climatizacion"];
    for (const id of pageIds) {
      for (const locale of locales) {
        const path = routes[id][locale];
        if (path === "/") {
          expect(existsSync("src/pages/index.astro"), `${id}/${locale}`).toBe(true);
        } else if (id === "contact") {
          const file = `src/pages${path.replace(/\/$/, "")}.astro`;
          expect(existsSync(file), `${id}/${locale}: ${file}`).toBe(true);
        } else if (serviceIds.includes(id)) {
          expect(catchAll.includes("isServiceId(pageId)"), `${id}/${locale}`).toBe(true);
        } else {
          expect(catchAll.includes(`pageId === "${id}"`), `${id}/${locale}`).toBe(true);
        }
      }
    }
  });
});
