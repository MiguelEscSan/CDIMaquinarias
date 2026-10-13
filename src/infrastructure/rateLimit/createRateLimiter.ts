import type { RateLimiter, RateLimitPolicy } from "../../core/contact/RateLimiter";
import { KV_TIMEOUT_MS } from "../../config/contactLimits";
import { FailOpenRateLimiter } from "./FailOpenRateLimiter";
import { InMemoryRateLimiter } from "./InMemoryRateLimiter";
import { KvRateLimiter, type KvNamespaceLike } from "./KvRateLimiter";

/** Worker bindings the rate limiter may use (all optional). */
export interface RateLimitEnv {
  CONTACT_RATE_LIMIT?: KvNamespaceLike;
}

export interface RateLimiterDeps {
  policy: RateLimitPolicy;
  logError?: (message: string, error: unknown) => void;
  kvTimeoutMs?: number;
}

/**
 * Workers KV when bound (shared across instances), else per-instance memory.
 * KV errors and slow KV calls fail open to the in-memory limiter.
 */
export function createRateLimiter(
  env: RateLimitEnv,
  { policy, logError = console.error, kvTimeoutMs = KV_TIMEOUT_MS }: RateLimiterDeps,
): RateLimiter {
  const memory = new InMemoryRateLimiter(policy);
  const kv = env.CONTACT_RATE_LIMIT;
  if (!kv) return memory;
  return new FailOpenRateLimiter(new KvRateLimiter(kv, policy, { timeoutMs: kvTimeoutMs }), memory, (error) => {
    logError("[contact] KV rate limiter failed; using in-memory limits:", error);
  });
}
