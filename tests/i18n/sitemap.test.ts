import { describe, expect, it } from "vitest";
import { sitemapLinks } from "../../src/i18n/sitemap";

const SITE = "https://www.cdimaquinarias.com";

describe("sitemapLinks", () => {
  it("lists both locales and x-default for a Spanish URL", () => {
    expect(sitemapLinks(`${SITE}/quienes-somos/`, SITE)).toEqual([
      { lang: "es", url: `${SITE}/quienes-somos/` },
      { lang: "en", url: `${SITE}/en/about-us/` },
      { lang: "x-default", url: `${SITE}/quienes-somos/` },
    ]);
  });

  it("returns the same alternates for the English counterpart", () => {
    expect(sitemapLinks(`${SITE}/en/about-us/`, SITE)).toEqual(sitemapLinks(`${SITE}/quienes-somos/`, SITE));
  });

  it("handles the home pages", () => {
    expect(sitemapLinks(`${SITE}/en/`, SITE).map((l) => l.url)).toEqual([`${SITE}/`, `${SITE}/en/`, `${SITE}/`]);
  });

  it("returns no alternates for unknown URLs", () => {
    expect(sitemapLinks(`${SITE}/otra/`, SITE)).toEqual([]);
  });
});
