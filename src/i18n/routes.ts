import type { PageId } from "../types";
import type { Locale } from "./config";

/** Single source of every page URL per locale (trailing slash, default locale unprefixed). */
export const routes: Record<PageId, Record<Locale, string>> = {
  home: { es: "/", en: "/en/", de: "/de/" },
  about: { es: "/quienes-somos/", en: "/en/about-us/", de: "/de/ueber-uns/" },
  services: { es: "/servicios/", en: "/en/services/", de: "/de/dienstleistungen/" },
  products: { es: "/productos/", en: "/en/products/", de: "/de/produkte/" },
  renting: { es: "/renting/", en: "/en/rental/", de: "/de/vermietung/" },
  contact: { es: "/contacto/", en: "/en/contact/", de: "/de/kontakt/" },
  legalNotice: { es: "/aviso-legal/", en: "/en/legal-notice/", de: "/de/impressum/" },
  privacy: { es: "/politica-de-datos/", en: "/en/privacy-policy/", de: "/de/datenschutz/" },
  cookies: { es: "/politica-de-cookies-1/", en: "/en/cookie-policy/", de: "/de/cookie-richtlinie/" },
};
