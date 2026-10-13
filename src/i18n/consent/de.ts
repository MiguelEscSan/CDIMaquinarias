import type { Translation } from "vanilla-cookieconsent";
import { CONSENT_CATEGORIES, CONSENT_COOKIE } from "../../data/cookieConsent";
import { googlePolicyUrl, siteHost, siteMeta } from "../../data/siteInfo";
import { routes } from "../routes";

// Kept free of other dictionary imports: this module is bundled into the client script.
// Strings may contain HTML: the library renders them as markup.

const labels = {
  acceptAll: "Alle akzeptieren",
  rejectAll: "Alle ablehnen",
  configure: "Einstellungen",
  save: "Präferenzen speichern",
  settings: "Cookie-Einstellungen",
};

const policyLink = `<a href="${routes.cookies.de}">Cookie-Richtlinie</a>`;
const googleLink = `<a href="${googlePolicyUrl("cookies", "de")}" target="_blank" rel="noopener noreferrer">Cookie-Richtlinie von Google</a>`;

const tableHeaders = {
  name: "Cookie",
  provider: "Anbieter",
  purpose: "Zweck",
  duration: "Dauer",
};

const translation: Translation = {
  consentModal: {
    label: "Cookie-Einwilligung",
    title: "Verwendung von Cookies",
    description: `Diese Website setzt keine Werbe- oder Analyse-Cookies. Wir verwenden nur ein technisches Cookie, um Ihre Wahl zu speichern. Die Karte auf der Kontaktseite wird von Google Maps geladen, wobei beim Laden der Karte Cookies gesetzt werden können. Sie können diese Drittanbieterdienste akzeptieren oder ablehnen oder Ihre Einstellungen anpassen. Weitere Informationen finden Sie in unserer ${policyLink}.`,
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    showPreferencesBtn: labels.configure,
    revisionMessage: "<br><br>Wir haben unsere Cookie-Richtlinie aktualisiert. Bitte überprüfen Sie Ihre Auswahl erneut.",
  },
  preferencesModal: {
    title: "Cookie-Einstellungen",
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    savePreferencesBtn: labels.save,
    closeIconLabel: "Cookie-Einstellungen schließen",
    sections: [
      {
        description: `Wählen Sie, welche Drittanbieterdienste Sie zulassen. Sie können Ihre Wahl jederzeit über die Schaltfläche „${labels.settings}“ in der Fußzeile ändern. Weitere Informationen finden Sie in unserer ${policyLink}.`,
      },
      {
        title: "Technisch notwendige Cookies (immer aktiv)",
        description:
          "Sie sind erforderlich, um Ihre Cookie-Wahl zu speichern. Sie benötigen keine Einwilligung und dienen nicht dem Tracking.",
        linkedCategory: CONSENT_CATEGORIES.necessary,
        cookieTable: {
          caption: "Technische Cookies",
          headers: tableHeaders,
          body: [
            {
              name: CONSENT_COOKIE.name,
              provider: `${siteMeta.name} (${siteHost})`,
              purpose: "Speichert Ihre Cookie-Wahl.",
              duration: `${CONSENT_COOKIE.expiresAfterDays} Tage`,
            },
          ],
        },
      },
      {
        title: "Drittanbieterdienste: Google Maps",
        description: `Wenn die Karte auf der Kontaktseite geladen wird, kann Google Cookies auf seiner eigenen Domain setzen und Daten über Ihren Besuch verarbeiten. Wenn Sie nicht zustimmen, wird die Karte nicht geladen, und Sie können den Standort direkt in Google Maps öffnen. Weitere Informationen finden Sie in der ${googleLink}.`,
        linkedCategory: CONSENT_CATEGORIES.external,
        cookieTable: {
          caption: "Google-Maps-Cookies",
          headers: tableHeaders,
          body: [
            {
              name: "NID und ähnliche",
              provider: "Google (Google-Domains)",
              purpose:
                "Wird von Google beim Laden der Karte gesetzt: Betrieb des Dienstes, Präferenzen, Sicherheit und weitere Zwecke, die Google beschreibt.",
              duration: "Gemäß der Richtlinie von Google",
            },
          ],
        },
      },
    ],
  },
};

export const cookies = { labels, translation };
