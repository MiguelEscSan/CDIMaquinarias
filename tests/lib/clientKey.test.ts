import { describe, expect, it } from "vitest";
import { clientRateLimitKey, resolveClientIp } from "../../src/lib/clientKey";

describe("resolveClientIp", () => {
  it("uses the address reported by the server adapter", () => {
    expect(resolveClientIp(() => "203.0.113.7", new Headers())).toBe("203.0.113.7");
  });

  it("falls back to the first x-forwarded-for entry when the address is unavailable", () => {
    const headers = new Headers({ "x-forwarded-for": " 198.51.100.4 , 10.0.0.1" });
    const unavailable = () => {
      throw new Error("clientAddress is not available");
    };

    expect(resolveClientIp(unavailable, headers)).toBe("198.51.100.4");
  });

  it("returns 'unknown' when no address can be determined", () => {
    expect(resolveClientIp(() => "", new Headers())).toBe("unknown");
  });
});

describe("clientRateLimitKey", () => {
  it("derives a stable, prefixed SHA-256 key that does not contain the raw IP", async () => {
    const key = await clientRateLimitKey("203.0.113.7");

    expect(key).toMatch(/^contact:[0-9a-f]{64}$/);
    expect(key).not.toContain("203.0.113.7");
    expect(await clientRateLimitKey("203.0.113.7")).toBe(key);
    expect(await clientRateLimitKey("203.0.113.8")).not.toBe(key);
  });
});
