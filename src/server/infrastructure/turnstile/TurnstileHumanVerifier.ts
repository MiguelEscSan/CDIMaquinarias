import type { HumanVerifier } from "../../core/contact/HumanVerifier";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5000;

/** Validates Turnstile tokens server-side. Any transport or parsing failure counts as not verified. */
export class TurnstileHumanVerifier implements HumanVerifier {
  constructor(
    private readonly secretKey: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async verify(token: string | undefined): Promise<boolean> {
    if (!token) return false;

    try {
      const body = new FormData();
      body.append("secret", this.secretKey);
      body.append("response", token);

      const response = await this.fetchImpl(SITEVERIFY_URL, {
        method: "POST",
        body,
        signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
      });
      if (!response.ok) return false;

      const result = (await response.json()) as { success?: boolean };
      return result.success === true;
    } catch (error) {
      console.error("[contact] Turnstile verification failed:", error);
      return false;
    }
  }
}
