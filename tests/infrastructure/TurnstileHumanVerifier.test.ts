import { describe, expect, it, vi } from "vitest";
import { TurnstileHumanVerifier } from "../../src/server/infrastructure/turnstile/TurnstileHumanVerifier";

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), { status: 200, ...init });
}

describe("TurnstileHumanVerifier", () => {
  it("accepts a token that Siteverify reports as successful", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ success: true }));
    const verifier = new TurnstileHumanVerifier("secret-key", fetchImpl as unknown as typeof fetch);

    await expect(verifier.verify("token-123")).resolves.toBe(true);

    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    const body = init.body as FormData;
    expect(body.get("secret")).toBe("secret-key");
    expect(body.get("response")).toBe("token-123");
  });

  it("rejects when Siteverify reports failure", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ success: false, "error-codes": ["invalid-input-response"] }));
    const verifier = new TurnstileHumanVerifier("secret-key", fetchImpl as unknown as typeof fetch);

    await expect(verifier.verify("bad-token")).resolves.toBe(false);
  });

  it("rejects without calling Siteverify when the token is missing", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ success: true }));
    const verifier = new TurnstileHumanVerifier("secret-key", fetchImpl as unknown as typeof fetch);

    await expect(verifier.verify(undefined)).resolves.toBe(false);
    await expect(verifier.verify("")).resolves.toBe(false);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("fails closed on HTTP errors and network failures", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const serverError = new TurnstileHumanVerifier(
        "secret-key",
        vi.fn(async () => new Response("", { status: 500 })) as unknown as typeof fetch,
      );
      await expect(serverError.verify("token-123")).resolves.toBe(false);

      const offline = new TurnstileHumanVerifier(
        "secret-key",
        vi.fn(async () => {
          throw new TypeError("fetch failed");
        }) as unknown as typeof fetch,
      );
      await expect(offline.verify("token-123")).resolves.toBe(false);
    } finally {
      vi.restoreAllMocks();
    }
  });
});
