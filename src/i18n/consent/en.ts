import type { Translation } from "vanilla-cookieconsent";
import { CONSENT_CATEGORIES, CONSENT_COOKIE } from "../../data/cookieConsent";
import { googlePolicyUrl, siteHost, siteMeta } from "../../data/siteInfo";
import { routes } from "../routes";

// Kept free of other dictionary imports: this module is bundled into the client script.
// Strings may contain HTML: the library renders them as markup.

const labels = {
  acceptAll: "Accept all",
  rejectAll: "Reject all",
  configure: "Settings",
  save: "Save preferences",
  settings: "Cookie settings",
};

const policyLink = `<a href="${routes.cookies.en}">cookie policy</a>`;
const googleLink = `<a href="${googlePolicyUrl("cookies", "en")}" target="_blank" rel="noopener noreferrer">Google's cookie policy</a>`;

const tableHeaders = {
  name: "Cookie",
  provider: "Owner",
  purpose: "Purpose",
  duration: "Duration",
};

const translation: Translation = {
  consentModal: {
    label: "Cookie consent",
    title: "Use of cookies",
    description: `This website does not set advertising or analytics cookies. We only use one technical cookie to remember your choice. The map on the contact page is loaded from Google Maps, which may set cookies when the map loads. You can accept or reject these third-party services or adjust your settings. Find out more in our ${policyLink}.`,
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    showPreferencesBtn: labels.configure,
    revisionMessage: "<br><br>We have updated our cookie policy. Please review your choice again.",
  },
  preferencesModal: {
    title: "Cookie settings",
    acceptAllBtn: labels.acceptAll,
    acceptNecessaryBtn: labels.rejectAll,
    savePreferencesBtn: labels.save,
    closeIconLabel: "Close cookie settings",
    sections: [
      {
        description: `Choose which third-party services you allow. You can change your choice at any time with the “${labels.settings}” button in the footer. Find out more in our ${policyLink}.`,
      },
      {
        title: "Strictly necessary technical cookies (always active)",
        description:
          "Essential to remember your cookie choice. They do not require consent and are not used for tracking.",
        linkedCategory: CONSENT_CATEGORIES.necessary,
        cookieTable: {
          caption: "Technical cookies",
          headers: tableHeaders,
          body: [
            {
              name: CONSENT_COOKIE.name,
              provider: `${siteMeta.name} (${siteHost})`,
              purpose: "Stores your cookie choice.",
              duration: `${CONSENT_COOKIE.expiresAfterDays} days`,
            },
          ],
        },
      },
      {
        title: "Third-party services: Google Maps",
        description: `When the map on the contact page loads, Google may set cookies on its own domain and process data about your visit. If you do not accept, the map is not loaded and you can open the location directly in Google Maps. Find out more in ${googleLink}.`,
        linkedCategory: CONSENT_CATEGORIES.external,
        cookieTable: {
          caption: "Google Maps cookies",
          headers: tableHeaders,
          body: [
            {
              name: "NID and similar",
              provider: "Google (Google domains)",
              purpose:
                "Set by Google when the map loads: service operation, preferences, security and the other purposes Google describes.",
              duration: "As set out in Google's policy",
            },
          ],
        },
      },
    ],
  },
};

export const cookies = { labels, translation };
