import { createTransport, type Transporter } from "nodemailer";
import type { MailSender, OutgoingEmail, SendOptions } from "../../core/contact/MailSender";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** Envelope sender; defaults to the SMTP user (most providers require it). */
  from?: string;
}

/** SMTP adapter for the MailSender port. */
export class NodemailerMailSender implements MailSender {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(config: SmtpConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
      // Per-phase limits; the use case also enforces an overall deadline.
      connectionTimeout: 5_000,
      greetingTimeout: 5_000,
      socketTimeout: 8_000,
    });
    this.from = config.from ?? config.user;
  }

  /**
   * Closing on abort releases the transport; an SMTP session already past DATA
   * may still complete, so a timed-out message can be delivered anyway.
   */
  async send(email: OutgoingEmail, { signal }: SendOptions = {}): Promise<void> {
    const close = () => this.transporter.close();
    signal?.addEventListener("abort", close, { once: true });
    try {
      await this.transporter.sendMail({
        from: this.from,
        to: email.to,
        replyTo: email.replyTo,
        subject: email.subject,
        text: email.text,
      });
    } finally {
      signal?.removeEventListener("abort", close);
      close();
    }
  }
}
