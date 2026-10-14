/** Delivery failed; the original transport error is kept in `cause` and never shown to visitors. */
export class ContactDeliveryError extends Error {
  constructor(cause: unknown) {
    super("Contact message could not be delivered", { cause });
    this.name = "ContactDeliveryError";
  }
}

/**
 * The send did not finish within the deadline. Delivery is unknown: the SMTP
 * session may still complete after we stop waiting, so the message may arrive.
 */
export class ContactDeliveryTimeoutError extends Error {
  constructor(readonly deadlineMs: number) {
    super(`Contact delivery not confirmed within ${deadlineMs}ms`);
    this.name = "ContactDeliveryTimeoutError";
  }
}

/** Too many submissions from this client or overall; nothing was sent. */
export class ContactRateLimitedError extends Error {
  constructor(readonly retryAfterSeconds: number) {
    super("Contact submissions are rate limited");
    this.name = "ContactRateLimitedError";
  }
}

/** No mail transport is configured for this deployment. */
export class ContactMailNotConfiguredError extends Error {
  constructor() {
    super("Contact mail delivery is not configured");
    this.name = "ContactMailNotConfiguredError";
  }
}
