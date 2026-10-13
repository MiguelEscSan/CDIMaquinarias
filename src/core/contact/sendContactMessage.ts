import type { ContactMessage } from "./ContactMessage";
import type { MailSender, OutgoingEmail } from "./MailSender";

/** Delivery failed; the original transport error is kept in `cause` and never shown to visitors. */
export class ContactDeliveryError extends Error {
  constructor(cause: unknown) {
    super("Contact message could not be delivered", { cause });
    this.name = "ContactDeliveryError";
  }
}

export type SendContactResult = { status: "sent" } | { status: "discarded" };

export interface SendContactDeps {
  sender: MailSender;
  /** Inbox that receives the inquiries. */
  to: string;
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function buildContactEmail(input: ContactMessage, to: string): OutgoingEmail {
  const name = singleLine(input.name);
  const equipment = input.equipment ? singleLine(input.equipment) : undefined;
  const subject = `Nueva consulta web: ${name}${equipment ? ` (${equipment})` : ""}`;
  const text = [
    `Nombre: ${name}`,
    `Correo electrónico: ${input.email}`,
    ...(equipment ? [`Equipo: ${equipment}`] : []),
    "",
    "Mensaje:",
    input.message,
  ].join("\n");

  return { to, replyTo: input.email, subject, text };
}

export async function sendContactMessage(
  input: ContactMessage,
  { sender, to }: SendContactDeps,
): Promise<SendContactResult> {
  // Bots fill the hidden field; pretend success so they get no signal.
  if (input.honeypot && input.honeypot.trim() !== "") return { status: "discarded" };

  try {
    await sender.send(buildContactEmail(input, to));
  } catch (error) {
    throw new ContactDeliveryError(error);
  }
  return { status: "sent" };
}
