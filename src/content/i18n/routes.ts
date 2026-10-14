import type { PageId } from "@shared/types";
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
  "reparacion-mantenimiento": {
    es: "/servicios/reparacion-y-mantenimiento/",
    en: "/en/services/repair-and-maintenance/",
    de: "/de/dienstleistungen/reparatur-und-wartung/",
  },
  "venta-maquinaria": { es: "/servicios/ventas/", en: "/en/services/sales/", de: "/de/dienstleistungen/verkauf/" },
  "alquiler-flota": { es: "/servicios/alquiler/", en: "/en/services/rental/", de: "/de/dienstleistungen/vermietung/" },
  "asesoramiento-especializado": {
    es: "/servicios/asesoramiento/",
    en: "/en/services/advice/",
    de: "/de/dienstleistungen/beratung/",
  },
  climatizacion: {
    es: "/servicios/climatizacion-y-aire-acondicionado/",
    en: "/en/services/air-conditioning/",
    de: "/de/dienstleistungen/klimatisierung/",
  },
};
