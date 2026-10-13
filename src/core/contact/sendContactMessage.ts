import type { ContactMessage } from "./ContactMessage";
import type { MailSender, OutgoingEmail } from "./MailSender";
import { ContactDeliveryError } from "./errors";

export type SendContactResult = { status: "sent" } | { status: "discarded" };

export interface SendContactDeps {
  sender: MailSender;
  /** Inbox that receives the inquiries. */
  to: string;
}

/** Bots fill the hidden field; humans leave it empty. */
export const isHoneypotFilled = (input: ContactMessage) =>
  Boolean(input.honeypot && input.honeypot.trim() !== "");

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
  if (isHoneypotFilled(input)) return { status: "discarded" };

  try {
    await sender.send(buildContactEmail(input, to));
  } catch (error) {
    throw new ContactDeliveryError(error);
  }
  return { status: "sent" };
}
