import { stillBrand } from "../../data/siteInfo";
import type { Dictionary } from "../es";

export const home: Dictionary["home"] = {
  hero: {
    tagline: "Fachleute der Branche",
    trustChips: [`Offizieller ${stillBrand.name}-Händler`, "Markenübergreifender Service", "Gran Canaria"],
    keyPointsLabel: "Wichtigste Punkte",
  },
  services: {
    eyebrow: "Unsere Dienstleistungen",
    title: "Exzellenz im Maschinenservice",
    subtitle:
      "Wir verpflichten uns zu hochwertigen Produkten, persönlicher Betreuung und exzellentem Kundendienst.",
    moreLabel: "Mehr erfahren",
    allServicesLabel: "Alle Dienstleistungen ansehen",
  },
  brand: {
    eyebrow: `Offizieller ${stillBrand.name}-Händler`,
    title: `${stillBrand.name}-Händler in Las Palmas de Gran Canaria`,
    subtitle: "Verkaufsberatung und technischer Service für das STILL-Sortiment und Industriemaschinen.",
    body: "Als STILL-Händler in Las Palmas de Gran Canaria helfen wir Ihnen, die richtige Maschine für die Anforderungen Ihres Unternehmens zu finden, und unterstützen Sie bei Verkauf, Vermietung, Reparatur und Wartung.",
    categoriesTitle: "Maschinen, mit denen wir arbeiten",
    productsCtaLabel: "STILL-Produkte ansehen",
  },
  contactBand: {
    eyebrow: "Kontakt",
    title: "Sprechen Sie mit unserem Team",
    subtitle: "Rufen Sie uns an oder schreiben Sie uns, und wir helfen Ihnen bei Ihrem Angebot.",
  },
};
