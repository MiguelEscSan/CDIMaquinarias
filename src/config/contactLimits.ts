import type { RateLimitPolicy } from "../core/contact/RateLimiter";

/** Contact form anti-abuse limits; a submission must pass both. */
export const CONTACT_RATE_LIMITS = {
  /** Per client (hashed IP). */
  perClient: { limit: 3, windowSeconds: 10 * 60 },
  /** Site-wide, protects the SMTP account's sending quota. */
  global: { limit: 30, windowSeconds: 60 * 60 },
} as const satisfies Record<string, RateLimitPolicy>;
