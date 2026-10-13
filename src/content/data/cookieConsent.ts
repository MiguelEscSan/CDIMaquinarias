import type { CookieConsentConfig } from "vanilla-cookieconsent";

// Language-neutral cookie consent settings (vanilla-cookieconsent). Texts live in src/content/i18n/<locale>/cookies.ts.

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

export const cookieConsentBaseConfig: Omit<CookieConsentConfig, "language"> = {
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
};
