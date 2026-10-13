import { siteMeta, stillBrand } from "./siteInfo";

export interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const heroContent = {
  eyebrow: siteMeta.positioning.replace(/\.$/, ""),
  heading: "Venta, Alquiler y Reparación de Maquinaria Industrial en Las Palmas",
  tagline: "Profesionales en el sector",
  valueProposition: siteMeta.valueProposition,
  trustChips: [`Distribuidor ${stillBrand.name}`, "Servicio multimarca", "Gran Canaria"],
};

export const servicesContent: SectionCopy = {
  eyebrow: "Servicios",
  title: "Soluciones integrales para su empresa",
  subtitle:
    "Venta, alquiler, reparación y asesoramiento en maquinaria industrial, además de climatización para oficinas, naves y locales comerciales.",
};

export const brandContent: SectionCopy & { body: string; categoriesTitle: string } = {
  eyebrow: `Distribuidor ${stillBrand.name}`,
  title: `Distribuidores de ${stillBrand.name} en Las Palmas de Gran Canaria`,
  subtitle: "Asesoramiento comercial y servicio técnico para la gama STILL y maquinaria industrial.",
  body: "Como distribuidores de STILL en Las Palmas de Gran Canaria, le ayudamos a elegir la maquinaria adecuada a las necesidades de su negocio y le acompañamos con venta, alquiler, reparación y mantenimiento.",
  categoriesTitle: "Maquinaria con la que trabajamos",
};

export const contactContent: SectionCopy = {
  eyebrow: "Contacto",
  title: "Hable con nuestro equipo",
  subtitle: "Llámenos o escríbanos y le atenderemos para preparar su presupuesto.",
};

export const locationContent: SectionCopy & { directionsLabel: string; mapTitle: string } = {
  eyebrow: "Ubicación",
  title: "Dónde encontrarnos",
  subtitle: `Atendemos a empresas de ${siteMeta.areaServed}.`,
  directionsLabel: "Cómo llegar",
  mapTitle: `Mapa de la ubicación de ${siteMeta.name}`,
};
