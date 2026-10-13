import type {
  RateLimitDecision,
  RateLimiter,
  RateLimitPolicy,
} from "../../core/contact/RateLimiter";

interface Window {
  count: number;
  resetAt: number;
}

export interface InMemoryRateLimiterOptions {
  /** Clock in epoch milliseconds (injectable for tests). */
  now?: () => number;
  /** Upper bound of tracked keys; the oldest are evicted beyond it. */
  maxKeys?: number;
}

/**
 * Fixed-window limiter kept in process memory.
 * On serverless/edge runtimes each instance has its own counters, so limits are
 * best-effort per instance (they reset on cold starts and are not shared).
 */
export class InMemoryRateLimiter implements RateLimiter {
  private readonly windows = new Map<string, Window>();
  private readonly windowMs: number;
  private readonly now: () => number;
  private readonly maxKeys: number;
  private nextSweepAt = 0;

  constructor(
    private readonly policy: RateLimitPolicy,
    { now = Date.now, maxKeys = 10_000 }: InMemoryRateLimiterOptions = {},
  ) {
    this.windowMs = policy.windowSeconds * 1000;
    this.now = now;
    this.maxKeys = maxKeys;
  }

  /** Number of keys currently tracked. */
  get size(): number {
    return this.windows.size;
  }

  async consume(key: string): Promise<RateLimitDecision> {
    const now = this.now();
    this.sweep(now);

    let window = this.windows.get(key);
    if (!window || window.resetAt <= now) {
      window = { count: 0, resetAt: now + this.windowMs };
      // Re-insert so Map order stays oldest-first for eviction.
      this.windows.delete(key);
      this.windows.set(key, window);
      this.evictOverflow();
    }

    if (window.count >= this.policy.limit) {
      return { allowed: false, retryAfterSeconds: Math.ceil((window.resetAt - now) / 1000) };
    }
    window.count++;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  private sweep(now: number): void {
    if (now < this.nextSweepAt) return;
    for (const [key, window] of this.windows) {
      if (window.resetAt <= now) this.windows.delete(key);
    }
    this.nextSweepAt = now + this.windowMs;
  }

  private evictOverflow(): void {
    for (const key of this.windows.keys()) {
      if (this.windows.size <= this.maxKeys) return;
      this.windows.delete(key);
    }
  }
}
