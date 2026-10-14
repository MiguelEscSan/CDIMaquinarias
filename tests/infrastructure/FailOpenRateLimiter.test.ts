import { describe, expect, it, vi } from "vitest";
import type { RateLimitDecision, RateLimiter } from "../../src/server/core/contact/RateLimiter";
import { FailOpenRateLimiter } from "../../src/server/infrastructure/rateLimit/FailOpenRateLimiter";

function limiterReturning(decision: RateLimitDecision): RateLimiter & { consume: ReturnType<typeof vi.fn> } {
  return { consume: vi.fn(async () => decision) };
}

const blocked: RateLimitDecision = { allowed: false, retryAfterSeconds: 42 };
const allowed: RateLimitDecision = { allowed: true, retryAfterSeconds: 0 };

describe("FailOpenRateLimiter", () => {
  it("uses the primary decision when the primary works", async () => {
    const primary = limiterReturning(blocked);
    const fallback = limiterReturning(allowed);
    const limiter = new FailOpenRateLimiter(primary, fallback);

    expect(await limiter.consume("a")).toEqual(blocked);
    expect(fallback.consume).not.toHaveBeenCalled();
  });

  it("falls back and reports the error when the primary throws", async () => {
    const failure = new Error("KV unavailable");
    const primary: RateLimiter = {
      consume: async () => {
        throw failure;
      },
    };
    const fallback = limiterReturning(blocked);
    const onError = vi.fn();
    const limiter = new FailOpenRateLimiter(primary, fallback, onError);

    expect(await limiter.consume("a")).toEqual(blocked);
    expect(fallback.consume).toHaveBeenCalledWith("a");
    expect(onError).toHaveBeenCalledWith(failure);
  });
});
