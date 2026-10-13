import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import {
  CONTACT_TO,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "astro:env/server";
import { handleContactSubmission } from "../core/contact/handleContactSubmission";
import type { MailSender } from "../core/contact/MailSender";
import { ContactMailNotConfiguredError, ContactRateLimitedError } from "../core/contact/errors";
import { NodemailerMailSender } from "../infrastructure/mail/NodemailerMailSender";
import { InMemoryRateLimiter } from "../infrastructure/rateLimit/InMemoryRateLimiter";
import { CONTACT_RATE_LIMITS } from "../config/contactLimits";
import { clientRateLimitKey, resolveClientIp } from "../lib/clientKey";
import { contactFailureFor } from "../lib/contactFeedback";
import { contactFormCopy } from "../data/contactContent";
import { findRentingCategory } from "../data/renting";

const { errors } = contactFormCopy;

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
});

// Module scope so counters survive across requests served by the same instance.
const clientLimiter = new InMemoryRateLimiter(CONTACT_RATE_LIMITS.perClient);
const globalLimiter = new InMemoryRateLimiter(CONTACT_RATE_LIMITS.global);

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
      const ip = resolveClientIp(() => context.clientAddress, context.request.headers);

      try {
        await handleContactSubmission(
          {
            name: input.name,
            email: input.email,
            message: input.message,
            equipment: findRentingCategory(input.equipo)?.name,
            honeypot: input.website,
          },
          {
            clientKey: await clientRateLimitKey(ip),
            clientLimiter,
            globalLimiter,
            createSender: createMailSender,
            to: CONTACT_TO,
          },
        );
      } catch (error) {
        logFailure(error);
        throw new ActionError(contactFailureFor(error));
      }

      return { sent: true as const };
    },
  }),
};
