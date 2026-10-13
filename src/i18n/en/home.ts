import { stillBrand } from "../../data/siteInfo";
import type { Dictionary } from "../es";

export const home: Dictionary["home"] = {
  hero: {
    tagline: "Professionals in the sector",
    trustChips: [`Official ${stillBrand.name} dealer`, "Multi-brand service", "Gran Canaria"],
    keyPointsLabel: "Key points",
  },
  services: {
    eyebrow: "Our services",
    title: "Excellence in machinery services",
    subtitle:
      "We are committed to providing quality products, personal attention and excellent after-sales service.",
    moreLabel: "Learn more",
    allServicesLabel: "See all services",
  },
  brand: {
    eyebrow: `Official ${stillBrand.name} dealer`,
    title: `${stillBrand.name} dealers in Las Palmas de Gran Canaria`,
    subtitle: "Sales advice and technical service for the STILL range and industrial machinery.",
    body: "As STILL dealers in Las Palmas de Gran Canaria, we help you choose the right machinery for your business needs and support you with sales, rental, repair and maintenance.",
    categoriesTitle: "Machinery we work with",
    productsCtaLabel: "See STILL products",
  },
  contactBand: {
    eyebrow: "Contact",
    title: "Talk to our team",
    subtitle: "Call or write to us and we will help you prepare your quote.",
  },
};
