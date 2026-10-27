import type {
  Brand,
  ContactInfo,
  LegalInfo,
  OpeningHours,
  PostalAddress,
  SiteMeta,
} from "@shared/types";

// Language-neutral business data. Translatable copy lives in src/content/i18n/<locale>/.

export const siteMeta: SiteMeta = {
  name: "CDI Maquinarias",
  legalName: "CDI Maquinarias S.L.",
  url: "https://www.cdimaquinarias.com",
  ogImage: "/og-image.jpg",
};

export const stillBrand: Brand = {
  name: "STILL",
  catalogUrl: "https://www.still.shop/es-es",
};

/** Official postal address; `country` is the name used in the Google Maps query. */
export const address: PostalAddress = {
  street: "Calle Simón Bolívar 13b",
  landmark: "Parque Empresarial Melenara",
  postalCode: "35214",
  locality: "Playa del Hombre",
  region: "Las Palmas",
  country: "España",
  countryCode: "ES",
};

const hours: OpeningHours[] = [
  {
    id: "weekdays",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
    closed: false,
  },
  {
    id: "weekend",
    days: ["Saturday", "Sunday"],
    closed: true,
  },
];

export const contactInfo: ContactInfo = {
  phones: [
    { kind: "landline", display: "928 13 38 51", href: "tel:+34928133851" },
    { kind: "mobile", display: "625 444 646", href: "tel:+34625444646" },
  ],
  email: "cdi@cdimaquinarias.com",
  address,
  hours,
};

/** Social profiles shown in the footer. The section stays hidden while this list is empty. */
export const socialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/cdi_maquinarias/" },
  { label: "Facebook", href: "https://www.facebook.com/cdimaquinarias/" },
];

/** Company identification as stated in the original legal notice and privacy policy. */
export const legalInfo: LegalInfo = {
  legalName: "CDI MAQUINARIAS S.L.",
  taxId: "B76075506",
  registeredAddress: "Calle Simón Bolívar 13, 35214 Playa de las Clavellinas",
  privacyEmail: "administracion2@cdimaquinarias.com",
  controllerName: "Carlos Daniel Igualador Sosa",
  controllerPhone: "625 444 646",
};

export const primaryPhone = contactInfo.phones[0]!;

/** One-line address; `countryName` is the localized country name. */
export function formatAddress(countryName: string, a: PostalAddress = address): string {
  const parts = [a.street, a.landmark, `${a.postalCode} ${a.locality} (${a.region})`, countryName];
  return parts.filter(Boolean).join(", ");
}

/** "8:00–16:00", or `closedLabel` when closed. */
export function formatHours(entry: OpeningHours, closedLabel: string): string {
  if (entry.closed || !entry.opens || !entry.closes) return closedLabel;
  return `${entry.opens.replace(/^0/, "")}–${entry.closes.replace(/^0/, "")}`;
}

const mapsQuery = encodeURIComponent(`${siteMeta.name}, ${formatAddress(address.country)}`);

export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export const emailHref = `mailto:${contactInfo.email}`;

export const siteHost = new URL(siteMeta.url).hostname;

export function absoluteUrl(path: string): string {
  return new URL(path, siteMeta.url).toString();
}

/** Google policy pages in the visitor's language. */
export function googlePolicyUrl(kind: "cookies" | "privacy", lang: string): string {
  const path = kind === "cookies" ? "technologies/cookies" : "privacy";
  return `https://policies.google.com/${path}?hl=${lang}`;
}
