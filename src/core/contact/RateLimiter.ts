/** At most `limit` attempts per key within `windowSeconds`. */
export interface RateLimitPolicy {
  limit: number;
  windowSeconds: number;
}

export interface RateLimitDecision {
  allowed: boolean;
  /** Seconds until another attempt may succeed; 0 when allowed. */
  retryAfterSeconds: number;
}

/** Port: records one attempt for `key` and decides whether it may proceed. */
export interface RateLimiter {
  consume(key: string): Promise<RateLimitDecision>;
}
