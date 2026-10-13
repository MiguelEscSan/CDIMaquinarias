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

export interface Service {
  id: string;
  slug: string;
  title: string;
  /** Short copy for cards. */
  description: string;
  /** Long copy for the services page. */
  detail: string;
  icon: IconName;
  features: string[];
  /** Optional deeper page for this service. */
  link?: CtaLink;
}

export interface PhoneContact {
  label: string;
  display: string;
  href: string;
}

export interface PostalAddress {
  street: string;
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
  /** Human-readable label, e.g. "Lunes a Viernes". */
  label: string;
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
  /** Machine categories the brand covers. */
  categories: string[];
}

export interface SiteMeta {
  name: string;
  legalName: string;
  url: string;
  title: string;
  description: string;
  locale: string;
  ogImage: string;
  areaServed: string;
  tagline: string;
  positioning: string;
  valueProposition: string;
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
  | "cookies";

export interface PageMeta {
  id: PageId;
  /** Route with trailing slash, e.g. "/servicios/". */
  path: string;
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
}

export interface ProductsContent {
  company: ContentSection;
  distributor: ContentSection;
  catalog: CtaLink;
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

export interface LegalDocument {
  pageId: Extract<PageId, "legalNotice" | "privacy" | "cookies">;
  /** ISO date (YYYY-MM-DD). */
  updated: string;
  sections: LegalSection[];
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle?: string;
}
