import type { BreadcrumbItem, PageId, PageMeta } from "@shared/types";
import { getDictionary, localizedPath, type Locale } from "../i18n";
import { isServiceId } from "./services";

export function getPage(id: PageId, locale: Locale): PageMeta {
  return { id, path: localizedPath(id, locale), ...getDictionary(locale).seo.pages[id] };
}

/** Breadcrumb trail for an inner page: home > page. */
export function breadcrumbsFor(id: PageId, locale: Locale): BreadcrumbItem[] {
  if (id === "home") return [];
  const home = getPage("home", locale);
  const page = getPage(id, locale);
  if (isServiceId(id)) {
    const services = getPage("services", locale);
    return [
      { label: home.label, href: home.path },
      { label: services.label, href: services.path },
      { label: page.label, href: page.path },
    ];
  }
  return [
    { label: home.label, href: home.path },
    { label: page.label, href: page.path },
  ];
}
