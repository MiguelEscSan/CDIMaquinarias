import type { ContactMessage } from "./ContactMessage";
import type { HumanVerifier } from "./HumanVerifier";
import type { MailSender } from "./MailSender";
import type { RateLimiter } from "./RateLimiter";
import {
  ContactHumanCheckFailedError,
  ContactHumanCheckNotConfiguredError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "./errors";
import { isHoneypotFilled, sendContactMessage, type SendContactResult } from "./sendContactMessage";

/** Key shared by every submission for the site-wide cap. */
export const GLOBAL_RATE_LIMIT_KEY = "contact:global";

export interface ContactSubmissionDeps {
  /** Opaque, non-reversible identifier of the submitting client. */
  clientKey: string;
  clientLimiter: RateLimiter;
  globalLimiter: RateLimiter;
  /** Returns undefined when the human check is not configured. */
  createHumanVerifier: () => HumanVerifier | undefined;
  /** Returns undefined when mail delivery is not configured. */
  createSender: () => MailSender | undefined;
  /** Inbox that receives the inquiries. */
  to: string;
  /** Overall time budget for the SMTP send. */
  deadlineMs: number;
}

/**
 * Use case: honeypot → human check → per-client limit → global limit → mail config → send.
 * Bots never consume quota; unverified and limited visitors never reach SMTP.
 */
export async function handleContactSubmission(
  input: ContactMessage,
  deps: ContactSubmissionDeps,
): Promise<SendContactResult> {
  if (isHoneypotFilled(input)) return { status: "discarded" };

  const verifier = deps.createHumanVerifier();
  if (!verifier) throw new ContactHumanCheckNotConfiguredError();
  if (!(await verifier.verify(input.humanToken))) throw new ContactHumanCheckFailedError();

  const client = await deps.clientLimiter.consume(deps.clientKey);
  if (!client.allowed) throw new ContactRateLimitedError(client.retryAfterSeconds);

  const global = await deps.globalLimiter.consume(GLOBAL_RATE_LIMIT_KEY);
  if (!global.allowed) throw new ContactRateLimitedError(global.retryAfterSeconds);

  const sender = deps.createSender();
  if (!sender) throw new ContactMailNotConfiguredError();

  return sendContactMessage(input, { sender, to: deps.to, deadlineMs: deps.deadlineMs });
}
