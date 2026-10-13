import type { BreadcrumbItem, PageId, PageMeta } from "../types";

export const pages: Record<PageId, PageMeta> = {
  home: {
    id: "home",
    path: "/",
    title: "CDI Maquinarias | Carretillas STILL en Las Palmas",
    description:
      "Venta, alquiler y reparación de carretillas STILL y maquinaria industrial en Las Palmas de Gran Canaria. Solicite su presupuesto.",
    label: "Inicio",
    heading: "Venta, Alquiler y Reparación de Maquinaria Industrial en Las Palmas",
  },
  about: {
    id: "about",
    path: "/quienes-somos/",
    title: "Quiénes somos | CDI Maquinarias en Gran Canaria",
    description:
      "Más de una década de experiencia en reparación, alquiler y venta de maquinaria industrial y aire acondicionado en Las Palmas de Gran Canaria.",
    label: "Quiénes somos",
    heading: "Quiénes somos",
  },
  services: {
    id: "services",
    path: "/servicios/",
    title: "Servicios de maquinaria industrial en Las Palmas | CDI",
    description:
      "Reparación y mantenimiento, venta, alquiler, renting y asesoramiento en carretillas y maquinaria industrial, y climatización en Gran Canaria.",
    label: "Servicios",
    heading: "Servicios",
  },
  products: {
    id: "products",
    path: "/productos/",
    title: "Productos STILL | Distribuidor oficial en Las Palmas",
    description:
      "Distribuidores oficiales de STILL en Las Palmas: carretillas, transpaletas, apiladores, recogepedidos y tractores. Consulte el catálogo.",
    label: "Productos",
    heading: "Distribuidores oficiales de STILL",
  },
  renting: {
    id: "renting",
    path: "/renting/",
    title: "Renting de carretillas en Gran Canaria | CDI Maquinarias",
    description:
      "Renting y alquiler de carretillas retráctiles, contrapesadas, recogepedidos, apiladoras y transpaletas eléctricas en Gran Canaria.",
    label: "Renting",
    heading: "Renting",
    intro: "Elija el tipo de equipo que necesita y le informaremos sobre disponibilidad y condiciones.",
  },
  contact: {
    id: "contact",
    path: "/contacto/",
    title: "Contacto | CDI Maquinarias en Las Palmas de Gran Canaria",
    description:
      "Contacte con CDI Maquinarias en Playa del Hombre, Las Palmas: teléfono, correo, horario, ubicación y formulario para solicitar presupuesto.",
    label: "Contacto",
    heading: "Contacto",
  },
  legalNotice: {
    id: "legalNotice",
    path: "/aviso-legal/",
    title: "Aviso legal | CDI Maquinarias",
    description:
      "Aviso legal del sitio web de CDI Maquinarias S.L.: titularidad, condiciones de acceso y uso, propiedad intelectual y responsabilidad.",
    label: "Aviso legal",
    heading: "Aviso legal",
  },
  privacy: {
    id: "privacy",
    path: "/politica-de-datos/",
    title: "Política de privacidad | CDI Maquinarias",
    description:
      "Información sobre protección de datos de CDI Maquinarias S.L.: responsable, finalidades, conservación, legitimación, destinatarios y derechos.",
    label: "Política de privacidad",
    heading: "Política de privacidad",
    intro: "Información sobre protección de datos.",
  },
  cookies: {
    id: "cookies",
    path: "/politica-de-cookies-1/",
    title: "Política de cookies | CDI Maquinarias",
    description:
      "Política de cookies del sitio web de CDI Maquinarias: qué almacenamiento local se utiliza, el mapa de Google y cómo gestionar las cookies.",
    label: "Política de cookies",
    heading: "Política de cookies",
  },
};

/** Breadcrumb trail for an inner page: Inicio > page. */
export function breadcrumbsFor(id: PageId): BreadcrumbItem[] {
  const page = pages[id];
  if (id === "home") return [];
  return [
    { label: pages.home.label, href: pages.home.path },
    { label: page.label, href: page.path },
  ];
}
