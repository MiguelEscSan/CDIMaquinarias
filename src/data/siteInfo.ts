import type { Brand, ContactInfo, OpeningHours, PostalAddress, SiteMeta } from "../types";

export const siteMeta: SiteMeta = {
  name: "CDI Maquinarias",
  legalName: "CDI Maquinarias S.L.",
  url: "https://www.cdimaquinarias.com",
  title: "CDI Maquinarias | Carretillas STILL en Las Palmas",
  description:
    "Venta, alquiler y reparación de carretillas STILL y maquinaria industrial en Las Palmas de Gran Canaria. Solicite su presupuesto.",
  locale: "es_ES",
  ogImage: "/og-image.jpg",
  areaServed: "Gran Canaria, Islas Canarias",
  tagline: "VENTA, ALQUILER Y REPARACIÓN DE MAQUINARIA INDUSTRIAL. Profesionales en el sector.",
  positioning: "Distribuidores de STILL en Las Palmas de Gran Canaria.",
  valueProposition:
    "Soluciones integrales para empresas que incluyen venta, alquiler y reparación de carretillas elevadoras, retráctiles, apiladores, transpaletas y maquinaria pesada. Además, especialistas en instalación y mantenimiento de sistemas de aire acondicionado y climatización industrial/comercial.",
};

export const stillBrand: Brand = {
  name: "STILL",
  categories: [
    "Carretillas elevadoras",
    "Retráctiles",
    "Apiladores",
    "Transpaletas",
    "Maquinaria pesada",
  ],
};

const address: PostalAddress = {
  street: "Calle Simón Bolívar 13b",
  postalCode: "35214",
  locality: "Playa del Hombre",
  region: "Las Palmas",
  country: "España",
  countryCode: "ES",
};

const hours: OpeningHours[] = [
  {
    label: "Lunes a Viernes",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:00",
    closed: false,
  },
  {
    label: "Sábado y Domingo",
    days: ["Saturday", "Sunday"],
    closed: true,
  },
];

export const contactInfo: ContactInfo = {
  phones: [
    { label: "Teléfono fijo", display: "928 13 38 51", href: "tel:+34928133851" },
    { label: "Teléfono móvil", display: "625 444 646", href: "tel:+34625444646" },
  ],
  email: "cdi@cdimaquinarias.com",
  address,
  hours,
};

export const primaryPhone = contactInfo.phones[0]!;

export function formatAddress(a: PostalAddress = contactInfo.address): string {
  return `${a.street}, ${a.postalCode} ${a.locality} (${a.region}), ${a.country}`;
}

export function formatHours(entry: OpeningHours): string {
  if (entry.closed || !entry.opens || !entry.closes) return "Cerrado";
  return `${entry.opens.replace(/^0/, "")}–${entry.closes.replace(/^0/, "")}`;
}

const mapsQuery = encodeURIComponent(`${siteMeta.name}, ${formatAddress()}`);

export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export const quoteMailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
  "Solicitud de presupuesto",
)}`;
export const emailHref = `mailto:${contactInfo.email}`;

export function absoluteUrl(path: string): string {
  return new URL(path, siteMeta.url).toString();
}
