import { describe, expect, it } from "vitest";
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildWebPageSchema } from "../../src/shared/lib/schema";
import { getServices } from "../../src/content/data/services";
import { contactInfo, siteMeta, stillBrand } from "../../src/content/data/siteInfo";
import { getDictionary } from "../../src/content/i18n";

describe("buildWebPageSchema", () => {
  it("describes the page with its language and links to the business", () => {
    expect(
      buildWebPageSchema({
        url: "https://www.cdimaquinarias.com/en/about-us/",
        name: "About us",
        description: "About",
        inLanguage: "en",
        siteUrl: "https://www.cdimaquinarias.com",
      }),
    ).toMatchObject({
      "@type": "WebPage",
      "@id": "https://www.cdimaquinarias.com/en/about-us/#webpage",
      inLanguage: "en",
      about: { "@id": "https://www.cdimaquinarias.com/#business" },
    });
  });
});

describe("buildLocalBusinessSchema", () => {
  it("uses the locale's copy for descriptions and service names", () => {
    const t = getDictionary("en");
    const schema = buildLocalBusinessSchema({
      site: siteMeta,
      description: t.seo.pages.home.description,
      areaServed: t.common.business.areaServed,
      catalogName: t.common.business.catalogName,
      contact: contactInfo,
      services: getServices("en"),
      brand: stillBrand,
    });
    expect(schema.description).toBe(t.seo.pages.home.description);
    expect(schema.hasOfferCatalog.name).toBe("Services");
    expect(schema.hasOfferCatalog.itemListElement[0]?.itemOffered.name).toBe("Repair and maintenance");
    expect(schema.openingHours).toBe("Mo-Fr 08:00-16:00");
  });
});

describe("buildBreadcrumbSchema", () => {
  it("makes absolute item URLs", () => {
    const schema = buildBreadcrumbSchema(
      [
        { label: "Home", href: "/en/" },
        { label: "Contact", href: "/en/contact/" },
      ],
      "https://www.cdimaquinarias.com",
    );
    expect(schema.itemListElement[1]).toEqual({
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://www.cdimaquinarias.com/en/contact/",
    });
  });
});
