import type { CtaLink, SectionCopy } from "../types";
import { pages } from "./pages";
import { siteMeta, stillBrand } from "./siteInfo";

export const heroContent = {
  eyebrow: siteMeta.positioning.replace(/\.$/, ""),
  heading: pages.home.heading,
  tagline: "Profesionales en el sector",
  valueProposition: siteMeta.valueProposition,
  trustChips: [`Distribuidor oficial ${stillBrand.name}`, "Servicio multimarca", "Gran Canaria"],
};

export const servicesContent: SectionCopy & { moreLabel: string; allServices: CtaLink } = {
  eyebrow: "Nuestros servicios",
  title: "La excelencia en servicios de maquinaria",
  subtitle:
    "Nuestro compromiso es brindarle productos de calidad, atención personalizada y un excelente servicio de postventa.",
  moreLabel: "Saber más",
  allServices: { label: "Ver todos los servicios", href: pages.services.path },
};

export const brandContent: SectionCopy & {
  body: string;
  categoriesTitle: string;
  productsCta: CtaLink;
} = {
  eyebrow: `Distribuidor oficial ${stillBrand.name}`,
  title: `Distribuidores de ${stillBrand.name} en Las Palmas de Gran Canaria`,
  subtitle: "Asesoramiento comercial y servicio técnico para la gama STILL y maquinaria industrial.",
  body: "Como distribuidores de STILL en Las Palmas de Gran Canaria, le ayudamos a elegir la maquinaria adecuada a las necesidades de su negocio y le acompañamos con venta, alquiler, reparación y mantenimiento.",
  categoriesTitle: "Maquinaria con la que trabajamos",
  productsCta: { label: "Ver productos STILL", href: pages.products.path },
};

export const contactBandContent: SectionCopy = {
  eyebrow: "Contacto",
  title: "Hable con nuestro equipo",
  subtitle: "Llámenos o escríbanos y le atenderemos para preparar su presupuesto.",
};
