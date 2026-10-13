import { contactInfo, primaryPhone, stillBrand } from "../../data/siteInfo";
import type { Dictionary } from "../es";

export const common: Dictionary["common"] = {
  skipToContent: "Zum Inhalt springen",
  business: {
    positioning: `${stillBrand.name}-Händler in Las Palmas de Gran Canaria.`,
    valueProposition:
      "Komplettlösungen für Unternehmen: Verkauf, Vermietung und Reparatur von Gabelstaplern, Schubmaststaplern, Staplern, Hubwagen und Schwerlastmaschinen. Außerdem sind wir Spezialisten für Installation und Wartung von industriellen und gewerblichen Klimaanlagen und Klimatisierungssystemen.",
    areaServed: "Gran Canaria, Kanarische Inseln",
    catalogName: "Dienstleistungen",
  },
  stillCategories: ["Gabelstapler", "Schubmaststapler", "Stapler", "Hubwagen", "Schwerlastmaschinen"],
  countryName: "Spanien",
  phoneLabels: { landline: "Festnetz", mobile: "Mobil" },
  hours: { weekdays: "Montag bis Freitag", weekend: "Samstag und Sonntag", closed: "Geschlossen" },
  nav: {
    main: "Hauptnavigation",
    mobile: "Mobiles Menü",
    toggle: "Menü öffnen oder schließen",
    footer: "Fußzeile",
    legal: "Rechtliches",
    breadcrumb: "Navigationspfad",
    quickContact: "Schnellkontakt",
  },
  language: {
    switcherLabel: "Sprache ändern",
    current: "Aktuelle Sprache",
  },
  brandBadge: `Offizieller ${stillBrand.name}-Händler`,
  cta: {
    call: { label: "Jetzt anrufen", ariaLabel: `Jetzt anrufen: ${primaryPhone.display}` },
    quote: {
      label: "Angebot anfordern",
      ariaLabel: "Angebot über das Kontaktformular anfordern",
    },
  },
  floatingContact: {
    phoneLabel: `Anrufen: ${primaryPhone.display}`,
    emailLabel: `E-Mail senden an ${contactInfo.email}`,
  },
  footer: {
    contactHeading: "Kontakt",
    hoursHeading: "Öffnungszeiten",
    navHeading: "Navigation",
    copyright: (year: number, legalName: string) => `© ${year} ${legalName}. Alle Rechte vorbehalten.`,
  },
};
