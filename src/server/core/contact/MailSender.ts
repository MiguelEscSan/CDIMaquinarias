export interface OutgoingEmail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export interface SendOptions {
  /** Aborted when the caller stops waiting; implementations should release resources. */
  signal?: AbortSignal;
}

/** Port: delivers an email. Implementations throw on delivery failure. */
export interface MailSender {
  send(email: OutgoingEmail, options?: SendOptions): Promise<void>;
}
