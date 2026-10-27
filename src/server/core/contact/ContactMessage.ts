/** A visitor's inquiry submitted through the contact form. */
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Equipment the visitor asked about (resolved display name). */
  equipment?: string;
  /** Language the visitor used on the site (display name), for the internal inbox. */
  visitorLanguage?: string;
  /** Anti-spam field that humans leave empty. */
  honeypot?: string;
  /** Turnstile response token from the visitor's browser. */
  humanToken?: string;
}
