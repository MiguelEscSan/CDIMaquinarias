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
import { sendContactMessage } from "../core/contact/sendContactMessage";
import type { MailSender } from "../core/contact/MailSender";
import { NodemailerMailSender } from "../infrastructure/mail/NodemailerMailSender";
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

const deliveryFailed = () =>
  new ActionError({ code: "INTERNAL_SERVER_ERROR", message: contactFormCopy.failure });

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactInput,
    handler: async (input) => {
      const sender = createMailSender();
      if (!sender) {
        console.error("[contact] SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).");
        throw deliveryFailed();
      }

      try {
        await sendContactMessage(
          {
            name: input.name,
            email: input.email,
            message: input.message,
            equipment: findRentingCategory(input.equipo)?.name,
            honeypot: input.website,
          },
          { sender, to: CONTACT_TO },
        );
      } catch (error) {
        // Log server-side only; visitors get a generic message.
        console.error("[contact] delivery failed:", error instanceof Error ? error.cause ?? error : error);
        throw deliveryFailed();
      }

      return { sent: true as const };
    },
  }),
};
