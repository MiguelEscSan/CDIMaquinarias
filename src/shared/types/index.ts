export type IconName =
  | "wrench"
  | "forklift"
  | "key"
  | "clipboard"
  | "snowflake"
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "check"
  | "arrow"
  | "menu"
  | "close"
  | "shield";

export type ServiceId =
  | "reparacion-mantenimiento"
  | "venta-maquinaria"
  | "alquiler-flota"
  | "asesoramiento-especializado"
  | "climatizacion";

/** Services with their own detail page. Rental has none: it lives on the renting page. */
export type ServiceDetailId = Exclude<ServiceId, "alquiler-flota" | "venta-maquinaria">;

/** Language-neutral service data; copy comes from the dictionary. */
export interface ServiceDefinition {
  id: ServiceId;
  /** Anchor on the services page (shared by every locale). */
  slug: string;
  icon: IconName;
  /** Page that the service card opens: its own detail page, or another page. */
  detailPage: PageId;
}

/** Translatable copy of one service. */
export interface ServiceCopy {
  title: string;
  /** Short copy for cards. */
  description: string;
  /** Long copy for the services page. */
  detail: string;
  features: string[];
}

export interface Service {
  id: ServiceId;
  slug: string;
  /** Localized URL of the page that the service card opens. */
  href: string;
  title: string;
  /** Short copy for cards. */
  description: string;
  /** Long copy for the services page. */
  detail: string;
  icon: IconName;
  features: string[];
}

export interface PhoneContact {
  kind: "landline" | "mobile";
  display: string;
  href: string;
}

export interface PostalAddress {
  street: string;
  /** Optional landmark shown after the street, e.g. a business park. */
  landmark?: string;
  postalCode: string;
  locality: string;
  region: string;
  country: string;
  countryCode: string;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  /** Key of the localized label. */
  id: "weekdays" | "weekend";
  days: DayOfWeek[];
  /** 24h "HH:MM"; omitted when closed. */
  opens?: string;
  closes?: string;
  closed: boolean;
}

export interface ContactInfo {
  phones: PhoneContact[];
  email: string;
  address: PostalAddress;
  hours: OpeningHours[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink extends NavLink {
  ariaLabel?: string;
}

export interface Brand {
  name: string;
  /** Official online catalogue. */
  catalogUrl: string;
}

export interface SiteMeta {
  name: string;
  legalName: string;
  url: string;
  ogImage: string;
}

export type PageId =
  | "home"
  | "about"
  | "services"
  | "products"
  | "renting"
  | "contact"
  | "legalNotice"
  | "privacy"
  | "cookies"
  | ServiceDetailId;

export interface FaqItem {
  question: string;
  answer: string;
}

/** Translatable copy of one service detail page (process and FAQ). */
export interface ServicePageCopy {
  processTitle: string;
  process: { title: string; text: string }[];
  faqTitle: string;
  faq: FaqItem[];
  ctaLabel: string;
}

/** Translatable copy of one page. */
export interface PageCopy {
  /** Document title, < 60 chars. */
  title: string;
  /** Meta description, < 155 chars. */
  description: string;
  /** Short label for navigation and breadcrumbs. */
  label: string;
  /** Visible page heading (the page's single h1). */
  heading: string;
  intro?: string;
}

export interface PageMeta extends PageCopy {
  id: PageId;
  /** Route with trailing slash, e.g. "/servicios/". */
  path: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
}

export interface AboutContent {
  sections: ContentSection[];
  highlight: string;
  /** Alt text of the showroom photo. */
  imageAlt: string;
}

export interface ProductsContent {
  /** Alt text of the STILL logo shown on the products page. */
  logoAlt: string;
  company: ContentSection;
  distributor: ContentSection;
  catalog: { label: string; ariaLabel: string };
  catalogNote: string;
}

export interface RentingCategory {
  slug: string;
  name: string;
}

export interface LegalInfo {
  legalName: string;
  taxId: string;
  registeredAddress: string;
  privacyEmail: string;
  controllerName: string;
  controllerPhone: string;
}

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] };

export interface LegalSection {
  heading: string;
  level?: 2 | 3;
  blocks: LegalBlock[];
}

export type LegalPageId = Extract<PageId, "legalNotice" | "privacy" | "cookies">;

export interface LegalDocument {
  pageId: LegalPageId;
  /** ISO date (YYYY-MM-DD). */
  updated: string;
  sections: LegalSection[];
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle?: string;
}
