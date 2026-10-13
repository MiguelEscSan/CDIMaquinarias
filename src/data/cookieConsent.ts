import type { CookieConsentConfig } from "vanilla-cookieconsent";
import { pages } from "./pages";
import { siteMeta } from "./siteInfo";

// Cookie consent (vanilla-cookieconsent). Strings may contain HTML: the library renders them as markup.

export const CONSENT_CATEGORIES = {
  necessary: "necessary",
  external: "external",
} as const;

export const CONSENT_COOKIE = {
  name: "cc_cookie",
  expiresAfterDays: 182,
} as const;

/** Bump when the cookie policy changes in a way that needs fresh consent. */
export const CONSENT_REVISION = 1;

/** Button labels, shared with the cookie policy text. */
export const consentLabels = {
  acceptAll: "Aceptar todas",
  rejectAll: "Rechazar todas",
  configure: "Configurar",
  save: "Guardar preferencias",
  settings: "Configurar cookies",
} as const;

export const cookieSettingsLabel = consentLabels.settings;

export const GOOGLE_COOKIES_POLICY_URL = "https://policies.google.com/technologies/cookies?hl=es";

const siteHost = new URL(siteMeta.url).hostname;
const policyLink = `<a href="${pages.cookies.path}">política de cookies</a>`;
const googleLink = `<a href="${GOOGLE_COOKIES_POLICY_URL}" target="_blank" rel="noopener noreferrer">política de cookies de Google</a>`;

const tableHeaders = {
  name: "Cookie",
  provider: "Titular",
  purpose: "Finalidad",
  duration: "Duración",
};

export const cookieConsentConfig: CookieConsentConfig = {
  mode: "opt-in",
  revision: CONSENT_REVISION,
  autoShow: true,
  // The map is not managed through script tags; consent is read in code.
  manageScriptTags: false,
  disablePageInteraction: false,
  cookie: {
    name: CONSENT_COOKIE.name,
    expiresAfterDays: CONSENT_COOKIE.expiresAfterDays,
    sameSite: "Lax",
  },
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    [CONSENT_CATEGORIES.necessary]: { enabled: true, readOnly: true },
    [CONSENT_CATEGORIES.external]: { enabled: false },
  },
  language: {
    default: "es",
    translations: {
      es: {
        consentModal: {
          label: "Consentimiento de cookies",
          title: "Uso de cookies",
          description: `Este sitio web no instala cookies publicitarias ni de análisis. Solo usamos una cookie técnica para recordar su elección. El mapa de la página de contacto se carga desde Google Maps, que puede instalar cookies cuando el mapa se carga. Puede aceptar o rechazar estos servicios de terceros o configurarlos. Más información en nuestra ${policyLink}.`,
          acceptAllBtn: consentLabels.acceptAll,
          acceptNecessaryBtn: consentLabels.rejectAll,
          showPreferencesBtn: consentLabels.configure,
          revisionMessage:
            "<br><br>Hemos actualizado nuestra política de cookies. Le pedimos que revise de nuevo su elección.",
        },
        preferencesModal: {
          title: "Configuración de cookies",
          acceptAllBtn: consentLabels.acceptAll,
          acceptNecessaryBtn: consentLabels.rejectAll,
          savePreferencesBtn: consentLabels.save,
          closeIconLabel: "Cerrar la configuración de cookies",
          sections: [
            {
              description: `Elija qué servicios de terceros permite. Puede cambiar su elección en cualquier momento con el botón «${consentLabels.settings}» del pie de página. Más información en nuestra ${policyLink}.`,
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
      },
    },
  },
};
