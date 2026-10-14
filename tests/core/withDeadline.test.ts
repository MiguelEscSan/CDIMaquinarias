import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DeadlineExceededError, withDeadline } from "../../src/server/core/shared/withDeadline";

describe("withDeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves with the task result and clears its timer", async () => {
    await expect(withDeadline(async () => "ok", 1000)).resolves.toBe("ok");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("rejects with DeadlineExceededError and aborts the task signal when time runs out", async () => {
    let signal: AbortSignal | undefined;
    const attempt = withDeadline((s) => {
      signal = s;
      return new Promise<never>(() => {});
    }, 1000);
    const outcome = expect(attempt).rejects.toBeInstanceOf(DeadlineExceededError);

    await vi.advanceTimersByTimeAsync(999);
    expect(signal?.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);

    await outcome;
    expect(signal?.aborted).toBe(true);
  });

  it("propagates task failures unchanged", async () => {
    const failure = new Error("boom");
    await expect(withDeadline(async () => Promise.reject(failure), 1000)).rejects.toBe(failure);
    expect(vi.getTimerCount()).toBe(0);
  });
});
