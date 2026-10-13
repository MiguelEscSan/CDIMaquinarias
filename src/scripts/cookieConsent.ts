import {
  acceptCategory,
  acceptedCategory,
  getUserPreferences,
  hide,
  hidePreferences,
  run,
} from "vanilla-cookieconsent";
import { CONSENT_CATEGORIES, cookieConsentBaseConfig } from "../data/cookieConsent";
import { defaultLocale } from "../i18n/config";
import { cookies as deCookies } from "../i18n/consent/de";
import { cookies as enCookies } from "../i18n/consent/en";
import { cookies as esCookies } from "../i18n/consent/es";

// Banner language follows <html lang>; the consent cookie is shared by every language.
const cookieConsentConfig = {
  ...cookieConsentBaseConfig,
  language: {
    default: defaultLocale,
    autoDetect: "document" as const,
    translations: { es: esCookies.translation, en: enCookies.translation, de: deCookies.translation },
  },
};

// Single client-side source of truth for consent. Every module on the page shares this instance.

type ExternalConsentListener = (accepted: boolean) => void;

const listeners = new Set<ExternalConsentListener>();
let started: Promise<void> | undefined;

const externalAccepted = (): boolean => acceptedCategory(CONSENT_CATEGORIES.external);

function notify(): void {
  const accepted = externalAccepted();
  for (const listener of listeners) listener(accepted);
}

/** Runs the consent manager once per page (banner on first visit, `data-cc` hooks). */
export function startCookieConsent(): Promise<void> {
  started ??= run({ ...cookieConsentConfig, onConsent: notify, onChange: notify });
  return started;
}

/**
 * Calls `listener` with the current "external services" consent and on every change.
 * Listeners must be idempotent: they can be called more than once with the same value.
 */
export function onExternalConsent(listener: ExternalConsentListener): void {
  listeners.add(listener);
  void startCookieConsent().then(() => listener(externalAccepted()));
}

/** Records consent for external services (e.g. the visitor asked to load the map). */
export function acceptExternalServices(): void {
  const { acceptedCategories } = getUserPreferences();
  acceptCategory([...acceptedCategories, CONSENT_CATEGORIES.external]);
  hide();
  hidePreferences();
}
