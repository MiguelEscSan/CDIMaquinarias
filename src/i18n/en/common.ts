import { contactInfo, primaryPhone, stillBrand } from "../../data/siteInfo";
import type { Dictionary } from "../es";

export const common: Dictionary["common"] = {
  skipToContent: "Skip to content",
  business: {
    positioning: `${stillBrand.name} dealers in Las Palmas de Gran Canaria.`,
    valueProposition:
      "Complete solutions for businesses, including the sale, rental and repair of forklift trucks, reach trucks, stackers, pallet trucks and heavy machinery. We also specialise in installing and maintaining industrial and commercial air conditioning and climate control systems.",
    areaServed: "Gran Canaria, Canary Islands",
    catalogName: "Services",
  },
  stillCategories: ["Forklift trucks", "Reach trucks", "Stackers", "Pallet trucks", "Heavy machinery"],
  countryName: "Spain",
  phoneLabels: { landline: "Landline", mobile: "Mobile" },
  hours: { weekdays: "Monday to Friday", weekend: "Saturday and Sunday", closed: "Closed" },
  nav: {
    main: "Main",
    mobile: "Mobile menu",
    toggle: "Open or close menu",
    footer: "Footer",
    legal: "Legal",
    breadcrumb: "Breadcrumb",
    quickContact: "Quick contact",
  },
  language: {
    switcherLabel: "Change language",
    current: "Current language",
  },
  brandBadge: `Official ${stillBrand.name} dealer`,
  cta: {
    call: { label: "Call now", ariaLabel: `Call us now on ${primaryPhone.display}` },
    quote: {
      label: "Request a quote",
      ariaLabel: "Request a quote using the contact form",
    },
  },
  floatingContact: {
    phoneLabel: `Call ${primaryPhone.display}`,
    emailLabel: `Send an email to ${contactInfo.email}`,
  },
  footer: {
    contactHeading: "Contact",
    hoursHeading: "Opening hours",
    navHeading: "Navigation",
    copyright: (year: number, legalName: string) => `© ${year} ${legalName}. All rights reserved.`,
  },
};
