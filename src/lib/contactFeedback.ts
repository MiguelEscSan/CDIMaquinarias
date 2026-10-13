import { ContactDeliveryTimeoutError, ContactRateLimitedError } from "../core/contact/errors";
import { getDictionary, type Dictionary, type Locale } from "../i18n";

export type ContactFailureCode = "TOO_MANY_REQUESTS" | "GATEWAY_TIMEOUT" | "INTERNAL_SERVER_ERROR";

/** Validation codes the action schema emits; each has a message in every dictionary. */
export type ContactErrorKey = keyof Dictionary["contact"]["form"]["errors"];

const formCopy = (locale: Locale) => getDictionary(locale).contact.form;

/** Maps a use-case failure to the action error code and visitor-safe message. */
export function contactFailureFor(
  error: unknown,
  locale: Locale,
): { code: ContactFailureCode; message: string } {
  const copy = formCopy(locale);
  if (error instanceof ContactRateLimitedError) {
    return { code: "TOO_MANY_REQUESTS", message: copy.rateLimited };
  }
  if (error instanceof ContactDeliveryTimeoutError) {
    return { code: "GATEWAY_TIMEOUT", message: copy.deliveryUnconfirmed };
  }
  return { code: "INTERNAL_SERVER_ERROR", message: copy.failure };
}

/** HTTP status and message the contact page shows for a non-input action error. */
export function contactErrorFeedback(
  code: string | undefined,
  locale: Locale,
): { status: number; message: string } {
  const copy = formCopy(locale);
  if (code === "TOO_MANY_REQUESTS") return { status: 429, message: copy.rateLimited };
  if (code === "GATEWAY_TIMEOUT") return { status: 504, message: copy.deliveryUnconfirmed };
  return { status: 500, message: copy.failure };
}

/** Replaces validation codes with the locale's messages; unknown entries pass through unchanged. */
export function localizeFieldErrors<F extends string>(
  fields: Partial<Record<F, string[] | undefined>>,
  locale: Locale,
): Partial<Record<F, string[]>> {
  const messages = formCopy(locale).errors as Record<string, string>;
  const result: Partial<Record<F, string[]>> = {};
  for (const [field, codes] of Object.entries(fields) as [F, string[] | undefined][]) {
    const localized = (codes ?? []).map((code) => (Object.hasOwn(messages, code) ? messages[code]! : code));
    if (localized.length > 0) result[field] = localized;
  }
  return result;
}
