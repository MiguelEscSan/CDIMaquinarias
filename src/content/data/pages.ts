import type { BreadcrumbItem, PageId, PageMeta } from "@shared/types";
import { getDictionary, localizedPath, type Locale } from "../i18n";

export function getPage(id: PageId, locale: Locale): PageMeta {
  return { id, path: localizedPath(id, locale), ...getDictionary(locale).seo.pages[id] };
}

/** Breadcrumb trail for an inner page: home > page. */
export function breadcrumbsFor(id: PageId, locale: Locale): BreadcrumbItem[] {
  if (id === "home") return [];
  const home = getPage("home", locale);
  const page = getPage(id, locale);
  return [
    { label: home.label, href: home.path },
    { label: page.label, href: page.path },
  ];
}
