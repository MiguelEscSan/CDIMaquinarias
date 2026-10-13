import type { PageId } from "../types";
import type { Locale } from "./config";

/** Single source of every page URL per locale (trailing slash, default locale unprefixed). */
export const routes: Record<PageId, Record<Locale, string>> = {
  home: { es: "/", en: "/en/" },
  about: { es: "/quienes-somos/", en: "/en/about-us/" },
  services: { es: "/servicios/", en: "/en/services/" },
  products: { es: "/productos/", en: "/en/products/" },
  renting: { es: "/renting/", en: "/en/rental/" },
  contact: { es: "/contacto/", en: "/en/contact/" },
  legalNotice: { es: "/aviso-legal/", en: "/en/legal-notice/" },
  privacy: { es: "/politica-de-datos/", en: "/en/privacy-policy/" },
  cookies: { es: "/politica-de-cookies-1/", en: "/en/cookie-policy/" },
};
