/**
 * Best-effort client IP: the adapter-provided address, else the first
 * `x-forwarded-for` entry, else "unknown" (all unknown clients share one bucket).
 */
export function resolveClientIp(getClientAddress: () => string | undefined, headers: Headers): string {
  try {
    const address = getClientAddress()?.trim();
    if (address) return address;
  } catch {
    // Some adapters throw when the address is unavailable.
  }
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "unknown";
}

/** Rate-limit key for a client (SHA-256 via Web Crypto); the raw IP is never stored. */
export async function clientRateLimitKey(ip: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `contact:${hex}`;
}
