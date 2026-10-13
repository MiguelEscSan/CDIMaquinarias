import { afterEach, describe, expect, it, vi } from "vitest";
import { DeadlineExceededError } from "../../src/core/shared/withDeadline";
import { createRateLimiter } from "../../src/infrastructure/rateLimit/createRateLimiter";
import { InMemoryRateLimiter } from "../../src/infrastructure/rateLimit/InMemoryRateLimiter";
import type { KvNamespaceLike } from "../../src/infrastructure/rateLimit/KvRateLimiter";

const policy = { limit: 2, windowSeconds: 600 };

function recordingKv() {
  const store = new Map<string, string>();
  const kv: KvNamespaceLike = {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    put: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
  };
  return { kv, store };
}

async function consumeTimes(limiter: { consume(key: string): Promise<{ allowed: boolean }> }, n: number) {
  const results: boolean[] = [];
  for (let i = 0; i < n; i++) results.push((await limiter.consume("client")).allowed);
  return results;
}

describe("createRateLimiter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses the in-memory limiter when no KV namespace is bound", async () => {
    const logError = vi.fn();
    const limiter = createRateLimiter({}, { policy, logError });

    expect(limiter).toBeInstanceOf(InMemoryRateLimiter);
    expect(await consumeTimes(limiter, 3)).toEqual([true, true, false]);
    expect(logError).not.toHaveBeenCalled();
  });

  it("counts in KV when the namespace is bound", async () => {
    const { kv, store } = recordingKv();
    const logError = vi.fn();
    const limiter = createRateLimiter({ CONTACT_RATE_LIMIT: kv }, { policy, logError });

    expect(await consumeTimes(limiter, 3)).toEqual([true, true, false]);
    expect(kv.put).toHaveBeenCalledTimes(2);
    expect([...store.values()]).toEqual(["2"]);
    expect(logError).not.toHaveBeenCalled();
  });

  it("falls back to memory and logs when KV throws", async () => {
    const failure = new Error("KV unavailable");
    const kv: KvNamespaceLike = {
      get: async () => {
        throw failure;
      },
      put: async () => {},
    };
    const logError = vi.fn();
    const limiter = createRateLimiter({ CONTACT_RATE_LIMIT: kv }, { policy, logError });

    expect(await consumeTimes(limiter, 3)).toEqual([true, true, false]);
    expect(logError).toHaveBeenCalledTimes(3);
    expect(logError).toHaveBeenCalledWith(expect.stringContaining("[contact]"), failure);
  });

  it("falls back to memory after the KV timeout when KV hangs", async () => {
    vi.useFakeTimers();
    const kv: KvNamespaceLike = {
      get: () => new Promise<never>(() => {}),
      put: async () => {},
    };
    const logError = vi.fn();
    const limiter = createRateLimiter({ CONTACT_RATE_LIMIT: kv }, { policy, logError, kvTimeoutMs: 1500 });

    const decision = limiter.consume("client");
    await vi.advanceTimersByTimeAsync(1499);
    expect(logError).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);

    expect(await decision).toEqual({ allowed: true, retryAfterSeconds: 0 });
    expect(logError).toHaveBeenCalledWith(expect.any(String), expect.any(DeadlineExceededError));
  });
});
