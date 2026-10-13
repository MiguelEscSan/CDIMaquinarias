export interface OutgoingEmail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

/** Port: delivers an email. Implementations throw on delivery failure. */
export interface MailSender {
  send(email: OutgoingEmail): Promise<void>;
}
