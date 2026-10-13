import { createTransport, type Transporter } from "nodemailer";
import type { MailSender, OutgoingEmail } from "../../core/contact/MailSender";

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
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    this.from = config.from ?? config.user;
  }

  async send(email: OutgoingEmail): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
    });
  }
}
