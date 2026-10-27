import { ActionError, defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { z } from "astro/zod";
import {
  CONTACT_TO,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  TURNSTILE_SECRET_KEY,
} from "astro:env/server";
import { handleContactSubmission } from "../core/contact/handleContactSubmission";
import type { HumanVerifier } from "../core/contact/HumanVerifier";
import type { MailSender } from "../core/contact/MailSender";
import {
  ContactDeliveryTimeoutError,
  ContactHumanCheckFailedError,
  ContactHumanCheckNotConfiguredError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "../core/contact/errors";
import { NodemailerMailSender } from "../infrastructure/mail/NodemailerMailSender";
import { TurnstileHumanVerifier } from "../infrastructure/turnstile/TurnstileHumanVerifier";
import { createRateLimiter } from "../infrastructure/rateLimit/createRateLimiter";
import { CONTACT_RATE_LIMITS, SEND_DEADLINE_MS } from "../config/contactLimits";
import { clientRateLimitKey, resolveClientIp } from "@shared/lib/clientKey";
import { contactFailureFor, type ContactErrorKey } from "@presentation/views/contactFeedback";
import { findRentingCategory } from "@content/data/renting";
import { defaultLocale, getLocaleFromUrl, localeMeta } from "@content/i18n";

// Messages are validation codes; the page renders them in the visitor's language.
const errors: Record<ContactErrorKey, ContactErrorKey> = {
  nameRequired: "nameRequired",
  nameLength: "nameLength",
  emailInvalid: "emailInvalid",
  messageRequired: "messageRequired",
  messageLength: "messageLength",
  privacyRequired: "privacyRequired",
};

const contactInput = z.object({
  name: z
    .string({ error: errors.nameRequired })
    .trim()
    .min(2, { error: errors.nameLength })
    .max(100, { error: errors.nameLength }),
  email: z
    .string({ error: errors.emailInvalid })
    .trim()
    .max(254, { error: errors.emailInvalid })
    .pipe(z.email({ error: errors.emailInvalid })),
  message: z
    .string({ error: errors.messageRequired })
    .trim()
    .min(10, { error: errors.messageLength })
    .max(5000, { error: errors.messageLength }),
  privacy: z.literal("on", { error: errors.privacyRequired }),
  website: z.string().max(500).optional(),
  equipo: z.string().max(100).optional(),
  // Missing when the widget did not run (no JS); the human check then rejects the submission.
  "cf-turnstile-response": z.string().max(2048).optional(),
});

// Module scope so in-memory counters survive across requests served by the same instance.
const clientLimiter = createRateLimiter(env, { policy: CONTACT_RATE_LIMITS.perClient });
const globalLimiter = createRateLimiter(env, { policy: CONTACT_RATE_LIMITS.global });

function createHumanVerifier(): HumanVerifier | undefined {
  if (!TURNSTILE_SECRET_KEY) return undefined;
  return new TurnstileHumanVerifier(TURNSTILE_SECRET_KEY);
}

function createMailSender(): MailSender | undefined {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return undefined;
  return new NodemailerMailSender({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    user: SMTP_USER,
    pass: SMTP_PASS,
  });
}

function logFailure(error: unknown): void {
  // Server-side only; visitors get a generic message.
  if (error instanceof ContactRateLimitedError) {
    console.warn(`[contact] rate limited (retry after ${error.retryAfterSeconds}s).`);
  } else if (error instanceof ContactHumanCheckFailedError) {
    console.warn("[contact] human check failed (missing or rejected Turnstile token).");
  } else if (error instanceof ContactHumanCheckNotConfiguredError) {
    console.error("[contact] Turnstile is not configured (TURNSTILE_SECRET_KEY).");
  } else if (error instanceof ContactDeliveryTimeoutError) {
    console.error(`[contact] delivery not confirmed within ${error.deadlineMs}ms; it may still arrive.`);
  } else if (error instanceof ContactMailNotConfiguredError) {
    console.error("[contact] SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).");
  } else {
    console.error("[contact] submission failed:", error instanceof Error ? error.cause ?? error : error);
  }
}

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async (input, context) => {
      // The form posts to its own page (?_action=contact), so the URL carries the locale.
      const locale = getLocaleFromUrl(context.url);
      const ip = resolveClientIp(() => context.clientAddress, context.request.headers);

      try {
        await handleContactSubmission(
          {
            name: input.name,
            email: input.email,
            message: input.message,
            // The inbox is Spanish-speaking: equipment names are always sent in Spanish.
            equipment: findRentingCategory(input.equipo, defaultLocale)?.name,
            honeypot: input.website,
            humanToken: input["cf-turnstile-response"],
            visitorLanguage: localeMeta[locale].label,
          },
          {
            clientKey: await clientRateLimitKey(ip),
            clientLimiter,
            globalLimiter,
            createHumanVerifier,
            createSender: createMailSender,
            to: CONTACT_TO,
            deadlineMs: SEND_DEADLINE_MS,
          },
        );
      } catch (error) {
        logFailure(error);
        throw new ActionError(contactFailureFor(error, locale));
      }

      return { sent: true as const };
    },
  }),
};
