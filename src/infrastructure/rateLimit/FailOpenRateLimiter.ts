import type { RateLimitDecision, RateLimiter } from "../../core/contact/RateLimiter";

/**
 * Uses `primary`; if it throws (e.g. KV outage), reports the error and answers
 * with `fallback` instead, so a storage failure never blocks the contact form.
 */
export class FailOpenRateLimiter implements RateLimiter {
  constructor(
    private readonly primary: RateLimiter,
    private readonly fallback: RateLimiter,
    private readonly onError: (error: unknown) => void = () => {},
  ) {}

  async consume(key: string): Promise<RateLimitDecision> {
    try {
      return await this.primary.consume(key);
    } catch (error) {
      this.onError(error);
      return this.fallback.consume(key);
    }
  }
}
