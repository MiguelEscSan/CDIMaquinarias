import type {
  Brand,
  BreadcrumbItem,
  ContactInfo,
  OpeningHours,
  Service,
  SiteMeta,
} from "../types";

interface SchemaInput {
  meta: SiteMeta;
  contact: ContactInfo;
  services: Service[];
  brand: Brand;
}

const dayCodes: Record<string, string> = {
  Monday: "Mo",
  Tuesday: "Tu",
  Wednesday: "We",
  Thursday: "Th",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "Su",
};

function toOpeningHoursString(entry: OpeningHours): string {
  const first = dayCodes[entry.days[0]!];
  const last = dayCodes[entry.days[entry.days.length - 1]!];
  const range = entry.days.length > 1 ? `${first}-${last}` : first;
  return `${range} ${entry.opens}-${entry.closes}`;
}

function telephoneValue(href: string): string {
  return href.replace(/^tel:/, "");
}

export function buildLocalBusinessSchema({ meta, contact, services, brand }: SchemaInput) {
  const openEntries = contact.hours.filter((h) => !h.closed && h.opens && h.closes);
  const pageUrl = new URL("/", meta.url).toString();
  const openingHours = openEntries.map(toOpeningHoursString);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#business`,
    name: meta.name,
    legalName: meta.legalName,
    description: meta.description,
    url: pageUrl,
    image: new URL(meta.ogImage, meta.url).toString(),
    telephone: contact.phones.map((p) => telephoneValue(p.href)),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode,
    },
    areaServed: meta.areaServed,
    openingHours: openingHours.length === 1 ? openingHours[0] : openingHours,
    openingHoursSpecification: openEntries.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    brand: { "@type": "Brand", name: brand.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: meta.areaServed,
        },
      })),
    },
  };
}

/** BreadcrumbList for an inner page; `items` hold site-relative hrefs. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };
}
