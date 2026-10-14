import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { KV_TIMEOUT_MS } from "../../src/server/config/contactLimits";
import { DeadlineExceededError } from "../../src/server/core/shared/withDeadline";
import {
  KvRateLimiter,
  type KvNamespaceLike,
} from "../../src/server/infrastructure/rateLimit/KvRateLimiter";

interface PutCall {
  key: string;
  value: string;
  expirationTtl?: number;
}

function fakeKv() {
  const store = new Map<string, string>();
  const puts: PutCall[] = [];
  const kv: KvNamespaceLike = {
    async get(key) {
      return store.get(key) ?? null;
    },
    async put(key, value, options) {
      puts.push({ key, value, expirationTtl: options?.expirationTtl });
      store.set(key, value);
    },
  };
  return { kv, store, puts };
}

function fakeClock(start = 6_000_000) {
  let now = start;
  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
    },
  };
}

const policy = { limit: 3, windowSeconds: 600 };

describe("KvRateLimiter", () => {
  it("allows up to the limit and blocks the next attempt", async () => {
    const { kv } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: fakeClock().now });

    for (let i = 0; i < 3; i++) {
      expect(await limiter.consume("a")).toEqual({ allowed: true, retryAfterSeconds: 0 });
    }
    const blocked = await limiter.consume("a");

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("reports the seconds left until the current fixed window ends", async () => {
    const clock = fakeClock(6_000_000); // exactly a window start (600 s windows)
    const { kv } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: clock.now });
    for (let i = 0; i < 3; i++) await limiter.consume("a");

    clock.advance(250_500);

    expect(await limiter.consume("a")).toEqual({ allowed: false, retryAfterSeconds: 350 });
  });

  it("starts a fresh counter when the next window begins", async () => {
    const clock = fakeClock(6_000_000);
    const { kv } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: clock.now });
    for (let i = 0; i < 4; i++) await limiter.consume("a");

    clock.advance(600_000);

    expect((await limiter.consume("a")).allowed).toBe(true);
  });

  it("keeps separate keys independent", async () => {
    const { kv } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: fakeClock().now });
    for (let i = 0; i < 4; i++) await limiter.consume("a");

    expect((await limiter.consume("b")).allowed).toBe(true);
  });

  it("stores one counter per key and window, expiring with the window", async () => {
    const { kv, puts } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: fakeClock(6_000_000).now });

    await limiter.consume("contact:abc");

    expect(puts).toEqual([{ key: "contact:abc:6000000", value: "1", expirationTtl: 600 }]);
  });

  it("never asks KV for a TTL below its 60 second minimum", async () => {
    const { kv, puts } = fakeKv();
    const limiter = new KvRateLimiter(kv, { limit: 5, windowSeconds: 10 }, { now: fakeClock().now });

    await limiter.consume("a");

    expect(puts[0]?.expirationTtl).toBe(60);
  });

  it("does not write to KV when the attempt is blocked", async () => {
    const { kv, puts } = fakeKv();
    const limiter = new KvRateLimiter(kv, policy, { now: fakeClock().now });
    for (let i = 0; i < 3; i++) await limiter.consume("a");

    await limiter.consume("a");

    expect(puts).toHaveLength(3);
  });

  it("propagates KV failures so the caller can fall back", async () => {
    const kv: KvNamespaceLike = {
      get: async () => {
        throw new Error("KV unavailable");
      },
      put: async () => {},
    };
    const limiter = new KvRateLimiter(kv, policy);

    await expect(limiter.consume("a")).rejects.toThrow("KV unavailable");
  });

  describe("bounded KV calls", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    const never = () => new Promise<never>(() => {});

    it("rejects when a KV read does not answer within the timeout", async () => {
      const kv: KvNamespaceLike = { get: never, put: async () => {} };
      const limiter = new KvRateLimiter(kv, policy, { timeoutMs: 1500 });

      const result = limiter.consume("a");
      const assertion = expect(result).rejects.toBeInstanceOf(DeadlineExceededError);
      await vi.advanceTimersByTimeAsync(1500);

      await assertion;
    });

    it("rejects when a KV write does not answer within the timeout", async () => {
      const kv: KvNamespaceLike = { get: async () => null, put: never };
      const limiter = new KvRateLimiter(kv, policy, { timeoutMs: 1500 });

      const result = limiter.consume("a");
      const assertion = expect(result).rejects.toBeInstanceOf(DeadlineExceededError);
      await vi.advanceTimersByTimeAsync(1500);

      await assertion;
    });

    it("defaults to the configured KV timeout", async () => {
      const kv: KvNamespaceLike = { get: never, put: async () => {} };
      const limiter = new KvRateLimiter(kv, policy);
      let settled = false;
      const result = limiter.consume("a").catch((error: unknown) => {
        settled = true;
        throw error;
      });
      const assertion = expect(result).rejects.toBeInstanceOf(DeadlineExceededError);

      await vi.advanceTimersByTimeAsync(KV_TIMEOUT_MS - 1);
      expect(settled).toBe(false);
      await vi.advanceTimersByTimeAsync(1);

      await assertion;
    });
  });
});
