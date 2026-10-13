import { ContactRateLimitedError } from "../core/contact/errors";
import { contactFormCopy } from "../data/contactContent";

export type ContactFailureCode = "TOO_MANY_REQUESTS" | "INTERNAL_SERVER_ERROR";

/** Maps a use-case failure to the action error code and visitor-safe message. */
export function contactFailureFor(error: unknown): { code: ContactFailureCode; message: string } {
  if (error instanceof ContactRateLimitedError) {
    return { code: "TOO_MANY_REQUESTS", message: contactFormCopy.rateLimited };
  }
  return { code: "INTERNAL_SERVER_ERROR", message: contactFormCopy.failure };
}

/** HTTP status and message the contact page shows for a non-input action error. */
export function contactErrorFeedback(code: string | undefined): { status: number; message: string } {
  if (code === "TOO_MANY_REQUESTS") return { status: 429, message: contactFormCopy.rateLimited };
  return { status: 500, message: contactFormCopy.failure };
}
