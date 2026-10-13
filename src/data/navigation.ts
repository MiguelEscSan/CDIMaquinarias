import type { CtaLink, NavLink } from "../types";
import { primaryPhone, quoteMailto } from "./siteInfo";

export const sectionIds = {
  home: "inicio",
  services: "servicios",
  brand: "still",
  contact: "contacto",
  location: "ubicacion",
} as const;

export const mainNav: NavLink[] = [
  { label: "Inicio", href: `#${sectionIds.home}` },
  { label: "Servicios", href: `#${sectionIds.services}` },
  { label: "STILL", href: `#${sectionIds.brand}` },
  { label: "Contacto", href: `#${sectionIds.contact}` },
  { label: "Ubicación", href: `#${sectionIds.location}` },
];

export const callCta: CtaLink = {
  label: "Llamar ahora",
  href: primaryPhone.href,
  ariaLabel: `Llamar ahora al ${primaryPhone.display}`,
};

export const quoteCta: CtaLink = {
  label: "Solicitar presupuesto",
  href: quoteMailto,
  ariaLabel: "Solicitar presupuesto por correo electrónico",
};

export const primaryCta = callCta;
