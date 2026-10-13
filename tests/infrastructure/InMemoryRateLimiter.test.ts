import { describe, expect, it } from "vitest";
import { InMemoryRateLimiter } from "../../src/server/infrastructure/rateLimit/InMemoryRateLimiter";

function fakeClock(start = 1_000_000) {
  let now = start;
  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
    },
  };
}

const policy = { limit: 3, windowSeconds: 600 };

describe("InMemoryRateLimiter", () => {
  it("allows up to the limit and blocks the next attempt", async () => {
    const clock = fakeClock();
    const limiter = new InMemoryRateLimiter(policy, { now: clock.now });

    for (let i = 0; i < 3; i++) {
      expect(await limiter.consume("a")).toEqual({ allowed: true, retryAfterSeconds: 0 });
    }
    const blocked = await limiter.consume("a");

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(600);
  });

  it("reports the remaining wait until the window resets", async () => {
    const clock = fakeClock();
    const limiter = new InMemoryRateLimiter(policy, { now: clock.now });
    for (let i = 0; i < 3; i++) await limiter.consume("a");

    clock.advance(450_500);

    expect(await limiter.consume("a")).toEqual({ allowed: false, retryAfterSeconds: 150 });
  });

  it("allows again once the window has elapsed", async () => {
    const clock = fakeClock();
    const limiter = new InMemoryRateLimiter(policy, { now: clock.now });
    for (let i = 0; i < 4; i++) await limiter.consume("a");

    clock.advance(600_000);

    expect((await limiter.consume("a")).allowed).toBe(true);
  });

  it("tracks keys independently", async () => {
    const limiter = new InMemoryRateLimiter(policy, { now: fakeClock().now });
    for (let i = 0; i < 3; i++) await limiter.consume("a");

    expect((await limiter.consume("a")).allowed).toBe(false);
    expect((await limiter.consume("b")).allowed).toBe(true);
  });

  it("removes expired entries so memory does not grow unbounded", async () => {
    const clock = fakeClock();
    const limiter = new InMemoryRateLimiter(policy, { now: clock.now });
    for (let i = 0; i < 50; i++) await limiter.consume(`ip-${i}`);
    expect(limiter.size).toBe(50);

    clock.advance(600_000);
    await limiter.consume("fresh");

    expect(limiter.size).toBe(1);
  });

  it("evicts the oldest keys beyond the configured capacity", async () => {
    const limiter = new InMemoryRateLimiter(policy, { now: fakeClock().now, maxKeys: 10 });

    for (let i = 0; i < 25; i++) await limiter.consume(`ip-${i}`);

    expect(limiter.size).toBe(10);
  });
});
