import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MailSender, OutgoingEmail } from "../../src/server/core/contact/MailSender";
import type { ContactMessage } from "../../src/server/core/contact/ContactMessage";
import {
  ContactDeliveryError,
  ContactDeliveryTimeoutError,
} from "../../src/server/core/contact/errors";
import { buildContactEmail, sendContactMessage } from "../../src/server/core/contact/sendContactMessage";

class FakeMailSender implements MailSender {
  sent: OutgoingEmail[] = [];
  constructor(private readonly failWith?: Error) {}
  async send(email: OutgoingEmail): Promise<void> {
    if (this.failWith) throw this.failWith;
    this.sent.push(email);
  }
}

const TO = "buzon@example.com";

const baseMessage: ContactMessage = {
  name: "Ana Pérez",
  email: "ana@example.com",
  message: "Necesito una carretilla para mi almacén.",
};

describe("buildContactEmail", () => {
  it("states the visitor's language in the body when known", () => {
    const email = buildContactEmail({ ...baseMessage, visitorLanguage: "English" }, TO);
    expect(email.text).toContain("Idioma del visitante: English");
    expect(email.subject).toBe("Nueva consulta web: Ana Pérez");
  });

  it("omits the language line when unknown", () => {
    expect(buildContactEmail(baseMessage, TO).text).not.toContain("Idioma del visitante");
  });
});

describe("sendContactMessage", () => {
  it("sends one email to the configured inbox with the visitor as reply-to", async () => {
    const sender = new FakeMailSender();

    const result = await sendContactMessage(baseMessage, { sender, to: TO });

    expect(result).toEqual({ status: "sent" });
    expect(sender.sent).toHaveLength(1);
    const email = sender.sent[0]!;
    expect(email.to).toBe(TO);
    expect(email.replyTo).toBe("ana@example.com");
    expect(email.subject).toBe("Nueva consulta web: Ana Pérez");
  });

  it("builds a plain-text body with the visitor details and message", async () => {
    const sender = new FakeMailSender();

    await sendContactMessage(baseMessage, { sender, to: TO });

    const { text } = sender.sent[0]!;
    expect(text).toContain("Nombre: Ana Pérez");
    expect(text).toContain("Correo electrónico: ana@example.com");
    expect(text).toContain("Necesito una carretilla para mi almacén.");
    expect(text).not.toContain("Equipo:");
  });

  it("adds the requested equipment to subject and body", async () => {
    const sender = new FakeMailSender();

    await sendContactMessage(
      { ...baseMessage, equipment: "Carretillas retráctiles" },
      { sender, to: TO },
    );

    const email = sender.sent[0]!;
    expect(email.subject).toBe("Nueva consulta web: Ana Pérez (Carretillas retráctiles)");
    expect(email.text).toContain("Equipo: Carretillas retráctiles");
  });

  it("strips line breaks from the subject to prevent header injection", async () => {
    const sender = new FakeMailSender();

    await sendContactMessage(
      { ...baseMessage, name: "Ana\r\nBcc: x@example.com" },
      { sender, to: TO },
    );

    expect(sender.sent[0]!.subject).toBe("Nueva consulta web: Ana Bcc: x@example.com");
  });

  it("silently discards submissions with the honeypot filled", async () => {
    const sender = new FakeMailSender();

    const result = await sendContactMessage(
      { ...baseMessage, honeypot: "https://spam.example" },
      { sender, to: TO },
    );

    expect(result).toEqual({ status: "discarded" });
    expect(sender.sent).toHaveLength(0);
  });

  it("wraps sender failures in a typed ContactDeliveryError", async () => {
    const smtpError = new Error("535 Authentication failed");
    const sender = new FakeMailSender(smtpError);

    const attempt = sendContactMessage(baseMessage, { sender, to: TO });

    await expect(attempt).rejects.toBeInstanceOf(ContactDeliveryError);
    await expect(attempt).rejects.toMatchObject({ cause: smtpError });
  });
});

describe("sendContactMessage deadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const hangingSender = () => {
    const signals: AbortSignal[] = [];
    const sender: MailSender = {
      send: (_email, options) => {
        if (options?.signal) signals.push(options.signal);
        return new Promise<void>(() => {});
      },
    };
    return { sender, signals };
  };

  it("fails with ContactDeliveryTimeoutError when the sender does not finish within 8000ms", async () => {
    const { sender, signals } = hangingSender();
    const attempt = sendContactMessage(baseMessage, { sender, to: TO, deadlineMs: 8000 });
    const outcome = expect(attempt).rejects.toBeInstanceOf(ContactDeliveryTimeoutError);

    await vi.advanceTimersByTimeAsync(7999);
    expect(signals[0]?.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);

    await outcome;
    expect(signals[0]?.aborted).toBe(true);
  });

  it("reports success when the sender finishes before the deadline", async () => {
    const sender = new FakeMailSender();

    await expect(
      sendContactMessage(baseMessage, { sender, to: TO, deadlineMs: 8000 }),
    ).resolves.toEqual({ status: "sent" });
    expect(sender.sent).toHaveLength(1);
  });

  it("keeps rejections as ContactDeliveryError, not a timeout", async () => {
    const sender = new FakeMailSender(new Error("550 Mailbox unavailable"));

    const attempt = sendContactMessage(baseMessage, { sender, to: TO, deadlineMs: 8000 });

    await expect(attempt).rejects.toBeInstanceOf(ContactDeliveryError);
    await expect(attempt).rejects.not.toBeInstanceOf(ContactDeliveryTimeoutError);
  });
});
