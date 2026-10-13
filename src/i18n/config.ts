export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export interface LocaleMeta {
  /** `<html lang>` value. */
  htmlLang: string;
  /** Open Graph locale, e.g. "es_ES". */
  ogLocale: string;
  /** hreflang value for alternate links. */
  hreflang: string;
  /** Language name in its own language (shown in the switcher). */
  label: string;
  /** BCP 47 tag for date formatting. */
  dateLocale: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  es: { htmlLang: "es", ogLocale: "es_ES", hreflang: "es", label: "Español", dateLocale: "es-ES" },
  en: { htmlLang: "en", ogLocale: "en_GB", hreflang: "en", label: "English", dateLocale: "en-GB" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Supported locale or the default one. */
export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}
