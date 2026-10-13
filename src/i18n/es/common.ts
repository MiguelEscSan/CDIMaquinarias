import { address, contactInfo, primaryPhone, stillBrand } from "../../data/siteInfo";

export const common = {
  skipToContent: "Saltar al contenido",
  business: {
    positioning: `Distribuidores de ${stillBrand.name} en Las Palmas de Gran Canaria.`,
    valueProposition:
      "Soluciones integrales para empresas que incluyen venta, alquiler y reparación de carretillas elevadoras, retráctiles, apiladores, transpaletas y maquinaria pesada. Además, especialistas en instalación y mantenimiento de sistemas de aire acondicionado y climatización industrial/comercial.",
    areaServed: "Gran Canaria, Islas Canarias",
    /** Name of the service catalogue in the LocalBusiness JSON-LD. */
    catalogName: "Servicios",
  },
  /** Machine categories covered by the STILL range. */
  stillCategories: [
    "Carretillas elevadoras",
    "Retráctiles",
    "Apiladores",
    "Transpaletas",
    "Maquinaria pesada",
  ],
  countryName: address.country,
  phoneLabels: { landline: "Teléfono fijo", mobile: "Teléfono móvil" },
  hours: { weekdays: "Lunes a Viernes", weekend: "Sábado y Domingo", closed: "Cerrado" },
  nav: {
    main: "Principal",
    mobile: "Menú móvil",
    toggle: "Abrir o cerrar menú",
    footer: "Pie de página",
    legal: "Legal",
    breadcrumb: "Breadcrumb",
    quickContact: "Contacto rápido",
  },
  language: {
    switcherLabel: "Cambiar idioma",
    current: "Idioma actual",
  },
  brandBadge: `Distribuidor oficial ${stillBrand.name}`,
  cta: {
    call: { label: "Llamar ahora", ariaLabel: `Llamar ahora al ${primaryPhone.display}` },
    quote: {
      label: "Solicitar presupuesto",
      ariaLabel: "Solicitar presupuesto mediante el formulario de contacto",
    },
  },
  floatingContact: {
    phoneLabel: `Llamar al ${primaryPhone.display}`,
    emailLabel: `Enviar un correo a ${contactInfo.email}`,
  },
  footer: {
    contactHeading: "Contacto",
    hoursHeading: "Horario",
    navHeading: "Navegación",
    copyright: (year: number, legalName: string) =>
      `© ${year} ${legalName}. Todos los derechos reservados.`,
  },
};
