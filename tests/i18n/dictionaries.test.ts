import { describe, expect, it } from "vitest";
import { getDictionary, locales } from "../../src/content/i18n";
import { contactInfo, primaryPhone } from "../../src/content/data/siteInfo";

type Tree = unknown;

/** Every leaf path with its kind ("string", "function", "null", "number", "array:<n>"). */
function shape(value: Tree, path = ""): Record<string, string> {
  if (Array.isArray(value)) {
    return value.reduce<Record<string, string>>(
      (acc, item, index) => ({ ...acc, ...shape(item, `${path}[${index}]`) }),
      { [path]: `array:${value.length}` },
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).reduce<Record<string, string>>(
      (acc, [key, child]) => ({ ...acc, ...shape(child, path ? `${path}.${key}` : key) }),
      {},
    );
  }
  return { [path]: value === null ? "null" : typeof value };
}

function strings(value: Tree, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, index) => strings(item, `${path}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => strings(child, path ? `${path}.${key}` : key));
  }
  return [];
}

const es = getDictionary("es");
const en = getDictionary("en");

describe("dictionaries", () => {
  it("are distinct objects per locale", () => {
    expect(en).not.toBe(es);
  });

  it("have exactly the same keys, array lengths and value kinds in every locale", () => {
    // Optional texts (e.g. the legal courtesy notice) are null in some locales.
    const kinds = (s: Record<string, string>) =>
      Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v === "null" ? "string" : v]));
    const reference = kinds(shape(es));
    for (const locale of locales) {
      expect(kinds(shape(getDictionary(locale))), locale).toEqual(reference);
    }
  });

  it("have no empty strings", () => {
    for (const locale of locales) {
      const empty = strings(getDictionary(locale)).filter(([, value]) => value.trim() === "");
      expect(empty, locale).toEqual([]);
    }
  });

  it("interpolate business data instead of duplicating it", () => {
    for (const locale of locales) {
      const t = getDictionary(locale);
      expect(t.contact.form.rateLimited).toContain(primaryPhone.display);
      expect(t.contact.form.deliveryUnconfirmed).toContain(primaryPhone.display);
      expect(t.common.floatingContact.emailLabel).toContain(contactInfo.email);
      expect(t.rental.moreInfoAriaLabel("X")).toContain("X");
      expect(t.contact.form.equipmentPrefill("Y")).toContain("Y");
    }
  });

  it("translate the English copy (no Spanish leftovers in key UI strings)", () => {
    expect(en.common.cta.call.label).not.toBe(es.common.cta.call.label);
    expect(en.seo.pages.about.title).not.toBe(es.seo.pages.about.title);
    expect(en.contact.form.errors.nameRequired).not.toBe(es.contact.form.errors.nameRequired);
    expect(en.cookies.labels.acceptAll).not.toBe(es.cookies.labels.acceptAll);
  });

  it("mark only the translated legal texts with the courtesy notice", () => {
    expect(es.legal.courtesyNotice).toBeNull();
    expect(en.legal.courtesyNotice).toBe(
      "This is a courtesy translation. In case of discrepancy, the Spanish version prevails.",
    );
    expect(getDictionary("de").legal.courtesyNotice).toContain("spanische Fassung maßgeblich");
  });

  it("link the cookie banner to the locale's cookie policy", () => {
    expect(es.cookies.translation.consentModal.description).toContain('href="/politica-de-cookies-1/"');
    expect(en.cookies.translation.consentModal.description).toContain('href="/en/cookie-policy/"');
    expect(getDictionary("de").cookies.translation.consentModal.description).toContain(
      'href="/de/cookie-richtlinie/"',
    );
  });
});

describe("SEO copy", () => {
  const pages = locales.flatMap((locale) =>
    Object.entries(getDictionary(locale).seo.pages).map(([id, page]) => ({ locale, id, ...page })),
  );

  it("keeps titles under 60 and descriptions under 155 characters", () => {
    for (const page of pages) {
      expect(page.title.length, `${page.locale}/${page.id} title`).toBeLessThan(60);
      expect(page.description.length, `${page.locale}/${page.id} description`).toBeLessThan(155);
    }
  });

  it("keeps titles and descriptions unique across all pages and locales", () => {
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
  });
});
