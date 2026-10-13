import type { Translation } from "vanilla-cookieconsent";
import { CONSENT_CATEGORIES, CONSENT_COOKIE } from "../../data/cookieConsent";
import { googlePolicyUrl, siteHost, siteMeta } from "../../data/siteInfo";
import { routes } from "../routes";

// Kept free of other dictionary imports: this module is bundled into the client script.
// Strings may contain HTML: the library renders them as markup.

/** Button labels, shared with the cookie policy text. */
const labels = {
  acceptAll: "Aceptar todas",
  rejectAll: "Rechazar todas",
  configure: "Configurar",
  save: "Guardar preferencias",
  settings: "Configurar cookies",
};

const policyLink = `<a href="${routes.cookies.es}">política de cookies</a>`;
const googleLink = `<a href="${googlePolicyUrl("cookies", "es")}" target="_blank" rel="noopener noreferrer">política de cookies de Google</a>`;

const tableHeaders = {
  name: "Cookie",
  provider: "Titular",
  purpose: "Finalidad",
  duration: "Duración",
};

const translation: Translation = {
  consentModal: {
    label: "Consentimiento de cookies",
    title: "Uso de cookies",
    description: `Este sitio web no instala cookies publicitarias ni de análisis. Solo usamos una cookie técnica para recordar su elección. El mapa de la página de contacto se carga desde Google Maps, que puede instalar cookies cuando el mapa se carga. Puede aceptar o rechazar estos servicios de terceros o configurarlos. Más información en nuestra ${policyLink}.`,
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    showPreferencesBtn: labels.configure,
    revisionMessage:
      "<br><br>Hemos actualizado nuestra política de cookies. Le pedimos que revise de nuevo su elección.",
  },
  preferencesModal: {
    title: "Configuración de cookies",
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    savePreferencesBtn: labels.save,
    closeIconLabel: "Cerrar la configuración de cookies",
    sections: [
      {
        description: `Elija qué servicios de terceros permite. Puede cambiar su elección en cualquier momento con el botón «${labels.settings}» del pie de página. Más información en nuestra ${policyLink}.`,
      },
      {
        title: "Cookies técnicas necesarias (siempre activas)",
        description:
          "Imprescindibles para recordar su elección sobre las cookies. No requieren consentimiento y no se usan para seguimiento.",
        linkedCategory: CONSENT_CATEGORIES.necessary,
        cookieTable: {
          caption: "Cookies técnicas",
          headers: tableHeaders,
          body: [
            {
              name: CONSENT_COOKIE.name,
              provider: `${siteMeta.name} (${siteHost})`,
              purpose: "Guarda su elección sobre las cookies.",
              duration: `${CONSENT_COOKIE.expiresAfterDays} días`,
            },
          ],
        },
      },
      {
        title: "Servicios de terceros: Google Maps",
        description: `Al cargar el mapa de la página de contacto, Google puede instalar cookies en su propio dominio y tratar datos sobre su visita. Si no lo acepta, el mapa no se carga y puede abrir la ubicación directamente en Google Maps. Más información en la ${googleLink}.`,
        linkedCategory: CONSENT_CATEGORIES.external,
        cookieTable: {
          caption: "Cookies de Google Maps",
          headers: tableHeaders,
          body: [
            {
              name: "NID y otras similares",
              provider: "Google (dominios de Google)",
              purpose:
                "Las instala Google al cargar el mapa: funcionamiento del servicio, preferencias, seguridad y los demás fines que describe Google.",
              duration: "Según la política de Google",
            },
          ],
        },
      },
    ],
  },
};

export const cookies = { labels, translation };
