import type { PageId } from "@shared/types";
import { normalizePath } from "@shared/lib/paths";
import { defaultLocale, localeMeta, locales, type Locale } from "./config";
import { routes } from "./routes";
import { de } from "./de";
import { en } from "./en";
import { es, type Dictionary } from "./es";

export { defaultLocale, isLocale, localeMeta, locales, resolveLocale, type Locale } from "./config";
export { routes } from "./routes";
export type { Dictionary } from "./es";

const dictionaries: Record<Locale, Dictionary> = { es, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const useTranslations = getDictionary;

/** Locale from the first path segment; unprefixed paths use the default locale. */
export function getLocaleFromUrl(url: URL | string): Locale {
  const pathname = typeof url === "string" ? url : url.pathname;
  const segment = pathname.split(/[?#]/)[0]!.split("/")[1];
  const match = locales.find((locale) => locale !== defaultLocale && locale === segment);
  return match ?? defaultLocale;
}

export function localizedPath(pageId: PageId, locale: Locale): string {
  return routes[pageId][locale];
}

export interface LocaleAlternate {
  locale: Locale;
  hreflang: string;
  path: string;
}

/** The page in every locale (language switcher, hreflang). */
export function alternatesFor(pageId: PageId): LocaleAlternate[] {
  return locales.map((locale) => ({
    locale,
    hreflang: localeMeta[locale].hreflang,
    path: routes[pageId][locale],
  }));
}

/** hreflang links for a page, including x-default (default locale). */
export function hreflangAlternates(pageId: PageId): { hreflang: string; path: string }[] {
  return [
    ...alternatesFor(pageId).map(({ hreflang, path }) => ({ hreflang, path })),
    { hreflang: "x-default", path: routes[pageId][defaultLocale] },
  ];
}

export function pageIdFromPath(path: string): PageId | undefined {
  const target = normalizePath(path);
  const ids = Object.keys(routes) as PageId[];
  return ids.find((id) => locales.some((locale) => routes[id][locale] === target));
}
