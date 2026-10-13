import type { NavLink, PageId } from "../types";
import type { Locale } from "../i18n";
import { getPage } from "./pages";

export const mainNavIds: PageId[] = ["home", "about", "services", "products", "contact"];
export const footerNavIds: PageId[] = [...mainNavIds, "renting"];
export const legalNavIds: PageId[] = ["legalNotice", "privacy", "cookies"];

export function navLinks(ids: PageId[], locale: Locale): NavLink[] {
  return ids.map((id) => {
    const page = getPage(id, locale);
    return { label: page.label, href: page.path };
  });
}
