import type { RentingCategory } from "@shared/types";
import { getDictionary, localizedPath, type Locale } from "../i18n";

/** Equipment slugs: identical in every locale (used as `?equipo=` keys). */
export const rentingSlugs = [
  "carretillas-retractiles",
  "carretillas-contrapesadas-electricas",
  "carretillas-contrapesadas-diesel-gas",
  "recogepedidos",
  "tractores-con-plataforma",
  "apiladoras-electricas",
  "transpaleta-electrica",
] as const;

export type RentingSlug = (typeof rentingSlugs)[number];

export function getRentingCategories(locale: Locale): RentingCategory[] {
  const names = getDictionary(locale).rental.categories;
  return rentingSlugs.map((slug) => ({ slug, name: names[slug] }));
}

export function rentingInquiryHref(category: RentingCategory, locale: Locale): string {
  return `${localizedPath("contact", locale)}?equipo=${encodeURIComponent(category.slug)}`;
}

export function findRentingCategory(
  slug: string | null | undefined,
  locale: Locale,
): RentingCategory | undefined {
  if (!slug) return undefined;
  return getRentingCategories(locale).find((c) => c.slug === slug);
}
