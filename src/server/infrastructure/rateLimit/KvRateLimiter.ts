import type {
  RateLimitDecision,
  RateLimiter,
  RateLimitPolicy,
} from "../../core/contact/RateLimiter";
import { withDeadline } from "../../core/shared/withDeadline";
import { KV_TIMEOUT_MS } from "../../config/contactLimits";

/** The subset of a Workers KV namespace this adapter needs (fakeable in tests). */
export interface KvNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface KvRateLimiterOptions {
  /** Clock in epoch milliseconds (injectable for tests). */
  now?: () => number;
  /** Each KV call rejects with DeadlineExceededError after this many ms. */
  timeoutMs?: number;
}

/** Workers KV rejects `expirationTtl` values below 60 seconds. */
const KV_MIN_TTL_SECONDS = 60;

/**
 * Fixed-window counter stored in Workers KV under `<key>:<windowStart>`.
 * KV is eventually consistent (read-then-write, no atomic increment), so
 * concurrent or cross-location attempts can exceed the limit slightly; that is
 * acceptable for a contact form. The Workers Free plan allows 1,000 KV writes
 * per day; each accepted submission costs up to 2 writes (client + global),
 * blocked attempts cost none.
 */
export class KvRateLimiter implements RateLimiter {
  private readonly windowMs: number;
  private readonly ttlSeconds: number;
  private readonly now: () => number;
  private readonly timeoutMs: number;

  constructor(
    private readonly kv: KvNamespaceLike,
    private readonly policy: RateLimitPolicy,
    { now = Date.now, timeoutMs = KV_TIMEOUT_MS }: KvRateLimiterOptions = {},
  ) {
    this.windowMs = policy.windowSeconds * 1000;
    this.ttlSeconds = Math.max(KV_MIN_TTL_SECONDS, policy.windowSeconds);
    this.now = now;
    this.timeoutMs = timeoutMs;
  }

  private bounded<T>(call: () => Promise<T>): Promise<T> {
    return withDeadline(call, this.timeoutMs);
  }

  async consume(key: string): Promise<RateLimitDecision> {
    const now = this.now();
    const windowStart = Math.floor(now / this.windowMs) * this.windowMs;
    const storageKey = `${key}:${windowStart}`;

    const stored = await this.bounded(() => this.kv.get(storageKey));
    const count = Number.parseInt(stored ?? "0", 10) || 0;
    if (count >= this.policy.limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((windowStart + this.windowMs - now) / 1000));
      return { allowed: false, retryAfterSeconds };
    }

    await this.bounded(() =>
      this.kv.put(storageKey, String(count + 1), { expirationTtl: this.ttlSeconds }),
    );
    return { allowed: true, retryAfterSeconds: 0 };
  }
}
