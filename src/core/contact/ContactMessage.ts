/** A visitor's inquiry submitted through the contact form. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Equipment the visitor asked about (resolved display name). */
  equipment?: string;
  /** Anti-spam field that humans leave empty. */
  honeypot?: string;
}
