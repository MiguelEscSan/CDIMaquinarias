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
  description: string;
  icon: IconName;
  features: string[];
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
