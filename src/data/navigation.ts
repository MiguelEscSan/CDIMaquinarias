import type { CtaLink, NavLink, PageId } from "../types";
import { pages } from "./pages";
import { contactInfo, emailHref, primaryPhone } from "./siteInfo";

/** @deprecated Anchor ids of the former single-page layout; removed once pages are split. */
export const sectionIds = {
  home: "inicio",
  services: "servicios",
  brand: "still",
  contact: "contacto",
  location: "ubicacion",
} as const;

const toLink = (id: PageId): NavLink => ({ label: pages[id].label, href: pages[id].path });

export const mainNav: NavLink[] = (["home", "about", "services", "products", "contact"] as const).map(
  toLink,
);

export const footerNav: NavLink[] = [...mainNav, toLink("renting")];

export const legalNav: NavLink[] = (["legalNotice", "privacy", "cookies"] as const).map(toLink);

export const callCta: CtaLink = {
  label: "Llamar ahora",
  href: primaryPhone.href,
  ariaLabel: `Llamar ahora al ${primaryPhone.display}`,
};

export const quoteCta: CtaLink = {
  label: "Solicitar presupuesto",
  href: pages.contact.path,
  ariaLabel: "Solicitar presupuesto mediante el formulario de contacto",
};

export const primaryCta = callCta;

export const floatingContact = {
  phoneHref: primaryPhone.href,
  phoneLabel: `Llamar al ${primaryPhone.display}`,
  emailHref,
  emailLabel: `Enviar un correo a ${contactInfo.email}`,
};
