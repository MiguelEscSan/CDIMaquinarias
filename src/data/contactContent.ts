import type { CtaLink, SectionCopy } from "../types";
import { pages } from "./pages";
import { primaryPhone, siteMeta } from "./siteInfo";

export const contactDetailsContent: SectionCopy & {
  labels: { phone: string; email: string; address: string; hours: string };
} = {
  eyebrow: "Contáctanos",
  title: "Hable con nuestro equipo",
  subtitle: "Llámenos, escríbanos o rellene el formulario y le atenderemos para preparar su presupuesto.",
  labels: {
    phone: "Teléfono",
    email: "Correo electrónico",
    address: "Dirección",
    hours: "Horario",
  },
};

export const locationContent: SectionCopy & {
  directionsLabel: string;
  directionsAriaLabel: string;
  mapTitle: string;
  consent: {
    title: string;
    body: string;
    loadLabel: string;
    cookiesLink: CtaLink;
  };
} = {
  eyebrow: "Ubicación",
  title: "Dónde encontrarnos",
  subtitle: `Atendemos a empresas de ${siteMeta.areaServed}.`,
  directionsLabel: "Abrir en Google Maps",
  directionsAriaLabel: "Abrir la ubicación en Google Maps (se abre en una pestaña nueva)",
  mapTitle: `Mapa de la ubicación de ${siteMeta.name}`,
  consent: {
    title: "Mapa de Google",
    body: "El mapa se carga desde Google Maps, un servicio de terceros que puede instalar cookies y recopilar datos sobre su actividad. Al pulsar «Cargar mapa» acepta este servicio; puede cambiar su elección en cualquier momento con «Configurar cookies», en el pie de página.",
    loadLabel: "Cargar mapa",
    cookiesLink: { label: "Más información en la política de cookies", href: pages.cookies.path },
  },
};

export const contactFormCopy = {
  title: "Envíenos un mensaje",
  intro: "Le responderemos lo antes posible.",
  requiredNote: "Los campos marcados con * son obligatorios.",
  fields: {
    name: { label: "Nombre", autocomplete: "name" },
    email: { label: "Correo electrónico", autocomplete: "email" },
    message: { label: "Mensaje", autocomplete: "off" },
  },
  privacy: {
    before: "He leído y acepto la",
    link: { label: "política de privacidad", href: pages.privacy.path },
  },
  honeypotLabel: "Deje este campo vacío",
  submitLabel: "Enviar",
  success: "¡Gracias! Nos pondremos en contacto con usted lo antes posible.",
  failure: "Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo o llámenos.",
  deliveryUnconfirmed: `No hemos podido confirmar el envío. Es posible que su mensaje haya llegado; si no recibe respuesta en 24 horas, llámenos al ${primaryPhone.display}.`,
  rateLimited: `Ha enviado varios mensajes en poco tiempo. Inténtelo de nuevo en unos minutos o llámenos al ${primaryPhone.display}.`,
  equipmentPrefill: (name: string) => `Me interesa recibir más información sobre: ${name}.`,
  errors: {
    nameRequired: "Indique su nombre.",
    nameLength: "El nombre debe tener entre 2 y 100 caracteres.",
    emailInvalid: "La dirección de correo electrónico no es válida.",
    messageRequired: "Escriba su mensaje.",
    messageLength: "El mensaje debe tener entre 10 y 5000 caracteres.",
    privacyRequired: "Debe aceptar la política de privacidad.",
  },
};
