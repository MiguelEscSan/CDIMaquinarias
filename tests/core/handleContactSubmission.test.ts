import { describe, expect, it, vi } from "vitest";
import type { ContactMessage } from "../../src/server/core/contact/ContactMessage";
import type { MailSender, OutgoingEmail } from "../../src/server/core/contact/MailSender";
import type { RateLimitDecision, RateLimiter } from "../../src/server/core/contact/RateLimiter";
import {
  ContactDeliveryTimeoutError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "../../src/server/core/contact/errors";
import {
  GLOBAL_RATE_LIMIT_KEY,
  handleContactSubmission,
  type ContactSubmissionDeps,
} from "../../src/server/core/contact/handleContactSubmission";

class FakeLimiter implements RateLimiter {
  keys: string[] = [];
  constructor(private readonly decision: RateLimitDecision = { allowed: true, retryAfterSeconds: 0 }) {}
  async consume(key: string) {
    this.keys.push(key);
    return this.decision;
  }
}

class FakeMailSender implements MailSender {
  sent: OutgoingEmail[] = [];
  async send(email: OutgoingEmail) {
    this.sent.push(email);
  }
}

const message: ContactMessage = {
  name: "Ana Pérez",
  email: "ana@example.com",
  message: "Necesito una carretilla para mi almacén.",
};

function setup(overrides: Partial<ContactSubmissionDeps> = {}) {
  const sender = new FakeMailSender();
  const clientLimiter = new FakeLimiter();
  const globalLimiter = new FakeLimiter();
  let senderRequests = 0;
  const deps: ContactSubmissionDeps = {
    clientKey: "contact:client-hash",
    clientLimiter,
    globalLimiter,
    createSender: () => {
      senderRequests++;
      return sender;
    },
    to: "buzon@example.com",
    deadlineMs: 8000,
    ...overrides,
  };
  return { deps, sender, clientLimiter, globalLimiter, senderRequests: () => senderRequests };
}

describe("handleContactSubmission", () => {
  it("sends the message when both rate limits allow it", async () => {
    const { deps, sender, clientLimiter, globalLimiter } = setup();

    const result = await handleContactSubmission(message, deps);

    expect(result).toEqual({ status: "sent" });
    expect(sender.sent).toHaveLength(1);
    expect(clientLimiter.keys).toEqual(["contact:client-hash"]);
    expect(globalLimiter.keys).toEqual([GLOBAL_RATE_LIMIT_KEY]);
  });

  it("discards honeypot submissions without consuming quota or touching mail config", async () => {
    const { deps, sender, clientLimiter, globalLimiter, senderRequests } = setup();

    const result = await handleContactSubmission({ ...message, honeypot: "https://spam.example" }, deps);

    expect(result).toEqual({ status: "discarded" });
    expect(clientLimiter.keys).toHaveLength(0);
    expect(globalLimiter.keys).toHaveLength(0);
    expect(senderRequests()).toBe(0);
    expect(sender.sent).toHaveLength(0);
  });

  it("rejects with a typed error and sends nothing when the client limit is reached", async () => {
    const clientLimiter = new FakeLimiter({ allowed: false, retryAfterSeconds: 120 });
    const { deps, sender, globalLimiter } = setup({ clientLimiter });

    const attempt = handleContactSubmission(message, deps);

    await expect(attempt).rejects.toBeInstanceOf(ContactRateLimitedError);
    await expect(attempt).rejects.toMatchObject({ retryAfterSeconds: 120 });
    expect(globalLimiter.keys).toHaveLength(0);
    expect(sender.sent).toHaveLength(0);
  });

  it("rejects when the global limit is reached even if the client is under its limit", async () => {
    const globalLimiter = new FakeLimiter({ allowed: false, retryAfterSeconds: 1800 });
    const { deps, sender, senderRequests } = setup({ globalLimiter });

    await expect(handleContactSubmission(message, deps)).rejects.toBeInstanceOf(
      ContactRateLimitedError,
    );
    expect(senderRequests()).toBe(0);
    expect(sender.sent).toHaveLength(0);
  });

  it("fails with a typed error when mail delivery is not configured", async () => {
    const { deps } = setup({ createSender: () => undefined });

    await expect(handleContactSubmission(message, deps)).rejects.toBeInstanceOf(
      ContactMailNotConfiguredError,
    );
  });

  it("applies the send deadline from its dependencies", async () => {
    vi.useFakeTimers();
    try {
      const hanging: MailSender = { send: () => new Promise<void>(() => {}) };
      const { deps } = setup({ createSender: () => hanging, deadlineMs: 5000 });
      const outcome = expect(handleContactSubmission(message, deps)).rejects.toBeInstanceOf(
        ContactDeliveryTimeoutError,
      );

      await vi.advanceTimersByTimeAsync(5000);

      await outcome;
    } finally {
      vi.useRealTimers();
    }
  });
});
